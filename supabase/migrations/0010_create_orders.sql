create table orders (
  id uuid primary key default gen_random_uuid(),

  user_id uuid not null
    references auth.users(id) on delete restrict,

  status text not null default 'pending'
    check (status in (
      'pending',
      'confirmed',
      'completed',
      'cancelled'
    )),

  payment_method text not null
    check (payment_method in (
      'cash_on_delivery',
      'online'
    )),

  payment_status text not null default 'unpaid'
    check (payment_status in (
      'unpaid',
      'paid',
      'failed'
    )),

  full_name text not null,
  phone text not null,
  delivery_address text not null,

  total numeric(10,2) not null
    check (total >= 0),

  created_at timestamptz not null default now()
);


create table order_items (
  id uuid primary key default gen_random_uuid(),

  order_id uuid not null
    references orders(id) on delete cascade,

  product_id uuid not null
    references products(id) on delete restrict,

  product_name text not null,

  unit_price numeric(10,2) not null
    check (unit_price >= 0),

  quantity integer not null
    check (quantity > 0),

  created_at timestamptz not null default now()
);


create index orders_user_id_idx
on orders(user_id);

create index order_items_order_id_idx
on order_items(order_id);