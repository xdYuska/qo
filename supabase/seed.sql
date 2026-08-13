insert into categories (name, slug) values
  ('Dairy', 'dairy'),
  ('Bakery', 'bakery'),
  ('Beverages', 'beverages');

insert into categories (name, slug, parent_id)
select 'Milk', 'milk', id from categories where slug = 'dairy';

insert into products (category_id, name, slug, description, price, stock_quantity, sku)
select id, 'Whole Milk 1L', 'whole-milk-1l', 'Fresh whole milk, 1 litre.', 2.49, 50, 'MILK-1L'
from categories where slug = 'milk';

insert into products (category_id, name, slug, description, price, stock_quantity, sku)
select id, 'Sourdough Bread', 'sourdough-bread', 'Freshly baked sourdough loaf.', 3.99, 20, 'BREAD-SOUR'
from categories where slug = 'bakery';