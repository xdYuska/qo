alter table orders
  add column email text not null default '';

alter table orders
  alter column email drop default;