-- 0014 added a p_email parameter via `create or replace function`, but since
-- the parameter list changed, Postgres created a second overload instead of
-- replacing the original. The app only ever calls the 5-arg version; this
-- drops the orphaned 4-arg one to avoid confusion/ambiguity going forward.
drop function if exists public.create_order(text, text, text, text);