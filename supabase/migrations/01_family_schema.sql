-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Create Families Table (Aileler)
create table if not exists public.families (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  invite_code text unique not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Update Profiles Table (Kullanıcılar)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  updated_at timestamp with time zone,
  username text unique,
  full_name text,
  avatar_url text,
  xp integer default 0
);

-- Add Family columns to Profiles
alter table public.profiles 
add column if not exists family_id uuid references public.families(id),
add column if not exists role text check (role in ('parent', 'child')) default 'child',
add column if not exists pin_code text,
add column if not exists cash_balance numeric default 0,
add column if not exists digital_balance numeric default 0;

-- 3. Create Tasks Table (Görevler)
create table if not exists public.tasks (
  id uuid default gen_random_uuid() primary key,
  family_id uuid references public.families(id) not null,
  assigned_to uuid references public.profiles(id) not null,
  created_by uuid references public.profiles(id) not null,
  title text not null,
  description text,
  reward_amount numeric not null,
  status text check (status in ('pending', 'completed', 'approved', 'rejected')) default 'pending',
  proof_image_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Create Goals Table (Hedefler)
create table if not exists public.goals (
  id uuid default gen_random_uuid() primary key,
  owner_id uuid references public.profiles(id) not null,
  title text not null,
  target_amount numeric not null,
  current_amount numeric default 0,
  image_url text,
  status text check (status in ('active', 'completed', 'archived')) default 'active',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. Create Transactions Table (Cüzdan Geçmişi)
create table if not exists public.transactions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) not null,
  goal_id uuid references public.goals(id), -- Optional: linked to a specific goal deposit
  amount numeric not null,
  type text check (type in ('deposit', 'withdrawal', 'allowance', 'task_reward')) not null,
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 6. Gamification Tables (Rozetler ve İlerleme)
create table if not exists public.user_badges (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) not null,
  badge_id text not null, -- e.g. 'saver', 'first-step'
  awarded_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, badge_id)
);

create table if not exists public.user_lesson_progress (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) not null,
  lesson_id text not null,
  status text check (status in ('started', 'completed')) default 'completed',
  completed_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, lesson_id)
);

-- 7. Database Functions (RPCs called from frontend)

-- Function: Increment XP
create or replace function increment_xp(x integer)
returns void as $$
begin
  update public.profiles
  set xp = xp + x
  where id = auth.uid();
end;
$$ language plpgsql security definer;

-- Function: Increment Balance (Digital)
create or replace function increment_balance(user_id uuid, amount numeric)
returns void as $$
begin
  update public.profiles
  set digital_balance = digital_balance + amount
  where id = user_id;
end;
$$ language plpgsql security definer;

-- Function: Update Goal Amount (Transaction logic)
create or replace function update_goal_amount(goal_id uuid, amount_to_add numeric)
returns void as $$
begin
  update public.goals
  set current_amount = current_amount + amount_to_add
  where id = goal_id;
end;
$$ language plpgsql security definer;

-- 8. Enable RLS (Row Level Security)
alter table public.families enable row level security;
alter table public.profiles enable row level security;
alter table public.tasks enable row level security;
alter table public.goals enable row level security;
alter table public.transactions enable row level security;
alter table public.user_badges enable row level security;
alter table public.user_lesson_progress enable row level security;

-- 9. Policies (Robust: Drops before Create)

-- Profiles Policies
drop policy if exists "View own profile" on public.profiles;
create policy "View own profile" on public.profiles for select using (id = auth.uid());

drop policy if exists "View family members" on public.profiles;
create policy "View family members" on public.profiles for select using (family_id in (select family_id from public.profiles where id = auth.uid()));

-- Families Policies
drop policy if exists "View own family" on public.families;
create policy "View own family" on public.families for select using (id in (select family_id from public.profiles where id = auth.uid()));

-- Tasks Policies
drop policy if exists "View family tasks" on public.tasks;
create policy "View family tasks" on public.tasks for select using (family_id in (select family_id from public.profiles where id = auth.uid()));

drop policy if exists "Manage own tasks" on public.tasks;
create policy "Manage own tasks" on public.tasks for all using (created_by = auth.uid() or assigned_to = auth.uid());

-- Goals Policies
drop policy if exists "View own goals" on public.goals;
create policy "View own goals" on public.goals for select using (owner_id = auth.uid() or owner_id in (select id from public.profiles where family_id in (select family_id from public.profiles where id = auth.uid()) and role = 'child'));

drop policy if exists "Manage own goals" on public.goals;
create policy "Manage own goals" on public.goals for all using (owner_id = auth.uid());

-- Transactions Policies
drop policy if exists "View own transactions" on public.transactions;
create policy "View own transactions" on public.transactions for select using (user_id = auth.uid());

drop policy if exists "Insert own transactions" on public.transactions;
create policy "Insert own transactions" on public.transactions for insert with check (user_id = auth.uid());

-- Badges Policies
drop policy if exists "View badges" on public.user_badges;
create policy "View badges" on public.user_badges for select using (user_id = auth.uid());

drop policy if exists "Insert badges" on public.user_badges;
create policy "Insert badges" on public.user_badges for insert with check (user_id = auth.uid());

-- Progress Policies
drop policy if exists "View progress" on public.user_lesson_progress;
create policy "View progress" on public.user_lesson_progress for select using (user_id = auth.uid());

drop policy if exists "Insert progress" on public.user_lesson_progress;
create policy "Insert progress" on public.user_lesson_progress for insert with check (user_id = auth.uid());
