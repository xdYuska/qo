create table categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  parent_id uuid references categories(id) on delete cascade,
  created_at timestamptz not null default now()
);

create index categories_parent_id_idx on categories(parent_id);