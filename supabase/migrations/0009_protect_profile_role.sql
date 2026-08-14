create function public.protect_profile_role()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.role is distinct from old.role then
    if current_user <> 'service_role' then
      raise exception 'You are not allowed to change your role.';
    end if;
  end if;

  return new;
end;
$$;

create trigger before_profile_update
  before update on public.profiles
  for each row
  execute function public.protect_profile_role();