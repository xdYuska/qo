alter table public.orders enable row level security;

alter table public.order_items enable row level security;


create policy "Users can view their own orders"
on public.orders
for select
to authenticated
using (
  user_id = (select auth.uid())
);


create policy "Users can view their own order items"
on public.order_items
for select
to authenticated
using (
  order_id in (
    select id
    from public.orders
    where user_id = (select auth.uid())
  )
);