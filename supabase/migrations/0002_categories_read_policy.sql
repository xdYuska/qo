alter table categories enable row level security;

create policy "Anyone can view categories"
on categories
for select
to anon, authenticated
using (true);