alter table addresses enable row level security;

create policy "Users can view their own addresses"
on addresses
for select
to authenticated
using (user_id = (select auth.uid()));

create policy "Users can insert their own addresses"
on addresses
for insert
to authenticated
with check (user_id = (select auth.uid()));

create policy "Users can update their own addresses"
on addresses
for update
to authenticated
using (user_id = (select auth.uid()))
with check (user_id = (select auth.uid()));

create policy "Users can delete their own addresses"
on addresses
for delete
to authenticated
using (user_id = (select auth.uid()));