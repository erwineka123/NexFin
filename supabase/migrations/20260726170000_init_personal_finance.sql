create extension if not exists "pgcrypto";

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create table if not exists public.wallets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  balance numeric(14, 2) not null default 0 check (balance >= 0),
  icon text not null default 'Wallet',
  color text not null default '#10b981',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  type text not null check (type in ('income', 'expense')),
  icon text not null default 'Tag',
  color text not null default '#10b981',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  wallet_id uuid not null references public.wallets(id) on delete cascade,
  category_id uuid not null references public.categories(id) on delete restrict,
  amount numeric(14, 2) not null check (amount > 0),
  note text not null default '',
  transaction_date timestamptz not null,
  type text not null check (type in ('income', 'expense', 'transfer')),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.budgets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  category_id uuid not null references public.categories(id) on delete cascade,
  limit_amount numeric(14, 2) not null check (limit_amount > 0),
  period text not null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.financial_goals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  target_amount numeric(14, 2) not null check (target_amount > 0),
  current_amount numeric(14, 2) not null default 0 check (current_amount >= 0),
  deadline timestamptz not null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.goal_contributions (
  id uuid primary key default gen_random_uuid(),
  goal_id uuid not null references public.financial_goals(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  amount numeric(14, 2) not null check (amount > 0),
  contributed_at timestamptz not null default timezone('utc', now()),
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.recurring_transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  wallet_id uuid not null references public.wallets(id) on delete cascade,
  category_id uuid not null references public.categories(id) on delete restrict,
  amount numeric(14, 2) not null check (amount > 0),
  frequency text not null check (frequency in ('daily', 'weekly', 'monthly', 'yearly')),
  next_execution timestamptz not null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  body text not null,
  is_read boolean not null default false,
  due_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create unique index if not exists wallets_user_id_name_key on public.wallets (user_id, name);
create unique index if not exists categories_user_id_name_type_key on public.categories (user_id, name, type);
create unique index if not exists budgets_user_id_category_id_period_key on public.budgets (user_id, category_id, period);

create index if not exists wallets_user_id_idx on public.wallets (user_id);
create index if not exists categories_user_id_idx on public.categories (user_id);
create index if not exists transactions_user_id_transaction_date_idx on public.transactions (user_id, transaction_date desc);
create index if not exists transactions_wallet_id_idx on public.transactions (wallet_id);
create index if not exists budgets_user_id_idx on public.budgets (user_id);
create index if not exists financial_goals_user_id_idx on public.financial_goals (user_id);
create index if not exists goal_contributions_goal_id_idx on public.goal_contributions (goal_id);
create index if not exists recurring_transactions_user_id_idx on public.recurring_transactions (user_id);
create index if not exists notifications_user_id_is_read_idx on public.notifications (user_id, is_read);

drop trigger if exists wallets_set_updated_at on public.wallets;
create trigger wallets_set_updated_at
before update on public.wallets
for each row execute function public.set_updated_at();

drop trigger if exists categories_set_updated_at on public.categories;
create trigger categories_set_updated_at
before update on public.categories
for each row execute function public.set_updated_at();

drop trigger if exists transactions_set_updated_at on public.transactions;
create trigger transactions_set_updated_at
before update on public.transactions
for each row execute function public.set_updated_at();

drop trigger if exists budgets_set_updated_at on public.budgets;
create trigger budgets_set_updated_at
before update on public.budgets
for each row execute function public.set_updated_at();

drop trigger if exists financial_goals_set_updated_at on public.financial_goals;
create trigger financial_goals_set_updated_at
before update on public.financial_goals
for each row execute function public.set_updated_at();

drop trigger if exists recurring_transactions_set_updated_at on public.recurring_transactions;
create trigger recurring_transactions_set_updated_at
before update on public.recurring_transactions
for each row execute function public.set_updated_at();

drop trigger if exists notifications_set_updated_at on public.notifications;
create trigger notifications_set_updated_at
before update on public.notifications
for each row execute function public.set_updated_at();

alter table public.wallets enable row level security;
alter table public.categories enable row level security;
alter table public.transactions enable row level security;
alter table public.budgets enable row level security;
alter table public.financial_goals enable row level security;
alter table public.goal_contributions enable row level security;
alter table public.recurring_transactions enable row level security;
alter table public.notifications enable row level security;

create policy "wallets_select_own" on public.wallets
for select using (auth.uid() = user_id);
create policy "wallets_insert_own" on public.wallets
for insert with check (auth.uid() = user_id);
create policy "wallets_update_own" on public.wallets
for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "wallets_delete_own" on public.wallets
for delete using (auth.uid() = user_id);

create policy "categories_select_own" on public.categories
for select using (auth.uid() = user_id);
create policy "categories_insert_own" on public.categories
for insert with check (auth.uid() = user_id);
create policy "categories_update_own" on public.categories
for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "categories_delete_own" on public.categories
for delete using (auth.uid() = user_id);

create policy "transactions_select_own" on public.transactions
for select using (auth.uid() = user_id);
create policy "transactions_insert_own" on public.transactions
for insert with check (auth.uid() = user_id);
create policy "transactions_update_own" on public.transactions
for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "transactions_delete_own" on public.transactions
for delete using (auth.uid() = user_id);

create policy "budgets_select_own" on public.budgets
for select using (auth.uid() = user_id);
create policy "budgets_insert_own" on public.budgets
for insert with check (auth.uid() = user_id);
create policy "budgets_update_own" on public.budgets
for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "budgets_delete_own" on public.budgets
for delete using (auth.uid() = user_id);

create policy "financial_goals_select_own" on public.financial_goals
for select using (auth.uid() = user_id);
create policy "financial_goals_insert_own" on public.financial_goals
for insert with check (auth.uid() = user_id);
create policy "financial_goals_update_own" on public.financial_goals
for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "financial_goals_delete_own" on public.financial_goals
for delete using (auth.uid() = user_id);

create policy "goal_contributions_select_own" on public.goal_contributions
for select using (auth.uid() = user_id);
create policy "goal_contributions_insert_own" on public.goal_contributions
for insert with check (auth.uid() = user_id);
create policy "goal_contributions_update_own" on public.goal_contributions
for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "goal_contributions_delete_own" on public.goal_contributions
for delete using (auth.uid() = user_id);

create policy "recurring_transactions_select_own" on public.recurring_transactions
for select using (auth.uid() = user_id);
create policy "recurring_transactions_insert_own" on public.recurring_transactions
for insert with check (auth.uid() = user_id);
create policy "recurring_transactions_update_own" on public.recurring_transactions
for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "recurring_transactions_delete_own" on public.recurring_transactions
for delete using (auth.uid() = user_id);

create policy "notifications_select_own" on public.notifications
for select using (auth.uid() = user_id);
create policy "notifications_insert_own" on public.notifications
for insert with check (auth.uid() = user_id);
create policy "notifications_update_own" on public.notifications
for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "notifications_delete_own" on public.notifications
for delete using (auth.uid() = user_id);
