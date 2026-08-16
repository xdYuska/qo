create function public.restore_stock_on_cancel()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  -- Only act when status is actually changing TO cancelled,
  -- and it wasn't already cancelled before (prevents double-restoring).
  if new.status = 'cancelled' and old.status is distinct from 'cancelled' then
    update products p
    set stock_quantity = p.stock_quantity + oi.quantity
    from order_items oi
    where oi.order_id = new.id
      and oi.product_id = p.id;
  end if;

  return new;
end;
$$;

create trigger on_order_cancelled
  after update on public.orders
  for each row
  execute function public.restore_stock_on_cancel();