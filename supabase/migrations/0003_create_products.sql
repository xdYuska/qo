create table products (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references categories(id) on delete restrict,
  name text not null,
  slug text not null unique,
  description text,
  price numeric(10,2) not null check (price >= 0),
  stock_quantity integer not null default 0 check (stock_quantity >= 0),
  sku text unique,
  image_path text,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create index products_category_id_idx on products(category_id);
create index products_is_active_idx on products(is_active);