alter table carts enable row level security;

create policy "Users can view their own cart"
on carts
for select
to authenticated
using (user_id = (select auth.uid()));

create policy "Users can create their own cart"
on carts
for insert
to authenticated
with check (user_id = (select auth.uid()));

alter table cart_items enable row level security;

create policy "Users can view their own cart items"
on cart_items
for select
to authenticated
using (
  cart_id in (
    select id from carts where user_id = (select auth.uid())
  )
);

create policy "Users can insert items into their own cart"
on cart_items
for insert
to authenticated
with check (
  cart_id in (
    select id from carts where user_id = (select auth.uid())
  )
);

create policy "Users can update their own cart items"
on cart_items
for update
to authenticated
using (
  cart_id in (
    select id from carts where user_id = (select auth.uid())
  )
)
with check (
  cart_id in (
    select id from carts where user_id = (select auth.uid())
  )
);

create policy "Users can delete their own cart items"
on cart_items
for delete
to authenticated
using (
  cart_id in (
    select id from carts where user_id = (select auth.uid())
  )
);