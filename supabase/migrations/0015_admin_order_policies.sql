create policy "Admins can view all orders"
on public.orders
for select
to authenticated
using (
  exists (
    select 1 from profiles
    where profiles.id = (select auth.uid())
    and profiles.role = 'admin'
  )
);

create policy "Admins can update orders"
on public.orders
for update
to authenticated
using (
  exists (
    select 1 from profiles
    where profiles.id = (select auth.uid())
    and profiles.role = 'admin'
  )
)
with check (
  exists (
    select 1 from profiles
    where profiles.id = (select auth.uid())
    and profiles.role = 'admin'
  )
);

create policy "Admins can view all order items"
on public.order_items
for select
to authenticated
using (
  exists (
    select 1 from profiles
    where profiles.id = (select auth.uid())
    and profiles.role = 'admin'
  )
);