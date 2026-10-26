create table if not exists public.sync_vault (
  sync_id text primary key,
  ciphertext text not null,
  iv text not null,
  version bigint not null default 1,
  updated_at timestamptz not null default now()
);

alter table public.sync_vault enable row level security;
revoke all on table public.sync_vault from anon, authenticated;

create or replace function public.sync_pull_vault(p_sync_id text)
returns jsonb
language sql
security definer
set search_path = public
as $$
  select jsonb_build_object(
    'ciphertext', v.ciphertext,
    'iv', v.iv,
    'version', v.version,
    'updated_at', v.updated_at
  )
  from public.sync_vault v
  where v.sync_id = p_sync_id;
$$;

create or replace function public.sync_push_vault(
  p_sync_id text,
  p_ciphertext text,
  p_iv text,
  p_expected_version bigint default 0
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  existing public.sync_vault%rowtype;
  next_version bigint;
begin
  if length(p_sync_id) <> 64 or p_sync_id !~ '^[a-f0-9]+$' then
    raise exception 'INVALID_SYNC_ID';
  end if;
  if length(p_ciphertext) < 1 or length(p_ciphertext) > 1000000 then
    raise exception 'INVALID_PAYLOAD';
  end if;
  if length(p_iv) < 12 or length(p_iv) > 128 then
    raise exception 'INVALID_IV';
  end if;

  select * into existing
  from public.sync_vault
  where sync_id = p_sync_id
  for update;

  if not found then
    if p_expected_version <> 0 then
      return jsonb_build_object('conflict', true, 'version', 0);
    end if;
    insert into public.sync_vault (sync_id, ciphertext, iv, version, updated_at)
    values (p_sync_id, p_ciphertext, p_iv, 1, now())
    returning version into next_version;
  else
    if existing.version <> p_expected_version then
      return jsonb_build_object('conflict', true, 'version', existing.version);
    end if;
    next_version := existing.version + 1;
    update public.sync_vault
    set ciphertext = p_ciphertext,
        iv = p_iv,
        version = next_version,
        updated_at = now()
    where sync_id = p_sync_id;
  end if;

  return jsonb_build_object('conflict', false, 'version', next_version);
end;
$$;

revoke all on function public.sync_pull_vault(text) from public;
revoke all on function public.sync_push_vault(text, text, text, bigint) from public;
grant execute on function public.sync_pull_vault(text) to anon;
grant execute on function public.sync_push_vault(text, text, text, bigint) to anon;
