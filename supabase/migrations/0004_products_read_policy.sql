alter table products enable row level security;

create policy "Anyone can view active products"
on products
for select
to anon, authenticated
using (is_active = true);