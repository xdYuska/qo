create table favorites (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  product_id uuid not null references products(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (user_id, product_id)
);

create index favorites_user_id_idx on favorites(user_id);

alter table favorites enable row level security;

create policy "Users can view their own favorites"
on favorites
for select
to authenticated
using (user_id = (select auth.uid()));

create policy "Users can add their own favorites"
on favorites
for insert
to authenticated
with check (user_id = (select auth.uid()));

create policy "Users can remove their own favorites"
on favorites
for delete
to authenticated
using (user_id = (select auth.uid()));