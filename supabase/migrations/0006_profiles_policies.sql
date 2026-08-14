alter table profiles enable row level security;

create policy "Users can view their own profile"
on profiles
for select
to authenticated
using (id = (select auth.uid()));

create policy "Users can update their own profile"
on profiles
for update
to authenticated
using (id = (select auth.uid()))
with check (id = (select auth.uid()));