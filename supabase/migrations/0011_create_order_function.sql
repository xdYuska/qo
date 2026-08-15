create or replace function public.create_order(
  p_full_name text,
  p_phone text,
  p_delivery_address text,
  p_payment_method text
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user_id uuid;
  v_cart_id uuid;
  v_order_id uuid;
  v_total numeric(10,2);
  v_error_message text;
begin
  -- Get the authenticated user.
  v_user_id := auth.uid();

  if v_user_id is null then
    raise exception 'You must be logged in.';
  end if;

  -- Validate customer information.
  if p_full_name is null or trim(p_full_name) = '' then
    raise exception 'Full name is required.';
  end if;

  if p_phone is null or trim(p_phone) = '' then
    raise exception 'Phone number is required.';
  end if;

  if p_delivery_address is null or trim(p_delivery_address) = '' then
    raise exception 'Delivery address is required.';
  end if;

  -- Validate payment method.
  if p_payment_method is null
     or p_payment_method not in ('cash_on_delivery', 'online') then
    raise exception 'Invalid payment method.';
  end if;

  -- Lock the user's cart.
  select id
  into v_cart_id
  from carts
  where user_id = v_user_id
  for update;

  if v_cart_id is null then
    raise exception 'Cart not found.';
  end if;

  -- Create a temporary snapshot of the cart.
  create temporary table order_cart_items (
    product_id uuid,
    quantity integer,
    product_name text,
    unit_price numeric(10,2)
  ) on commit drop;

  -- Lock the products and capture their current price/name.
  insert into order_cart_items (
    product_id,
    quantity,
    product_name,
    unit_price
  )
  select
    p.id,
    ci.quantity,
    p.name,
    p.price
  from cart_items ci
  join products p
    on p.id = ci.product_id
  where ci.cart_id = v_cart_id
  for update of p;

  -- Make sure the cart isn't empty.
  if not exists (
    select 1
    from order_cart_items
  ) then
    raise exception 'Your cart is empty.';
  end if;

  -- Check current stock.
  select format(
    'Only %s of %s are currently available.',
    p.stock_quantity,
    oci.product_name
  )
  into v_error_message
  from order_cart_items oci
  join products p
    on p.id = oci.product_id
  where oci.quantity > p.stock_quantity
  limit 1;

  if v_error_message is not null then
    raise exception '%', v_error_message;
  end if;

  -- Calculate the authoritative total.
  select coalesce(
    sum(unit_price * quantity),
    0
  )::numeric(10,2)
  into v_total
  from order_cart_items;

  -- Create the order.
  insert into orders (
    user_id,
    status,
    payment_method,
    payment_status,
    full_name,
    phone,
    delivery_address,
    total
  )
  values (
    v_user_id,
    'pending',
    p_payment_method,
    'unpaid',
    trim(p_full_name),
    trim(p_phone),
    trim(p_delivery_address),
    v_total
  )
  returning id into v_order_id;

  -- Create historical order-item snapshots.
  insert into order_items (
    order_id,
    product_id,
    product_name,
    unit_price,
    quantity
  )
  select
    v_order_id,
    product_id,
    product_name,
    unit_price,
    quantity
  from order_cart_items;

  -- Decrease stock.
  update products p
  set stock_quantity = p.stock_quantity - oci.quantity
  from order_cart_items oci
  where p.id = oci.product_id;

  -- Clear the cart.
  delete from cart_items
  where cart_id = v_cart_id;

  return v_order_id;
end;
$$;


revoke all on function public.create_order(
  text,
  text,
  text,
  text
) from public;

grant execute on function public.create_order(
  text,
  text,
  text,
  text
) to authenticated;