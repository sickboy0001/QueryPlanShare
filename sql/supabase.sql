-- projects

CREATE TABLE projects (
  id integer primary key ,
  user_id UUID REFERENCES ,
  is_public BOOLEAN DEFAULT FALSE,
  is_archive BOOLEAN DEFAULT FALSE,
  title TEXT,
  description TEXT,
  actionplan TEXT,
  state TEXT ,
  start_date DATE,
  due_date DATE,
  important INTEGER ,
  review TEXT,
  created_at TIMESTAMP DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMP DEFAULT timezone('utc'::text, now())
);

alter table profiles enable row level security;
create policy "誰でも参照可能" on projects for select using (true);
create policy "誰でも更新" on projects for update using (true);

-- tasks
CREATE TABLE tasks (
  id integer primary key ,
  user_id UUID REFERENCES ,
  project_id integer  ,
  is_public BOOLEAN DEFAULT FALSE,
  is_archive BOOLEAN DEFAULT FALSE,
  title TEXT,
  description TEXT,
  actionplan TEXT,
  detail TEXT,
  start_date DATE,
  due_date DATE,
  state TEXT,
  type TEXT,
  review TEXT,
  created_at TIMESTAMP DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMP DEFAULT timezone('utc'::text, now())
);

-- profilesテーブルRLS設定
alter table profiles enable row level security;
create policy "誰でも参照可能" on tasks for select using (true);
create policy "誰でも更新" on tasks for update using (true);


------
-- profilesテーブル作成
create table profiles (
  id uuid primary key references auth.users on delete cascade,
  email text not null,
  name text,
  introduce text,
  avatar_url text
);

-- profilesテーブルRLS設定
alter table profiles enable row level security;
create policy "プロフィールは誰でも参照可能" on profiles for select using (true);
create policy "プロフィールを更新" on profiles for update using (true);

-- サインアップ時にプロフィールテーブル作成する関数
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer set search_path = public;

-- サインアップ時にプロフィールテーブル作成する関数を呼び出すトリガー
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- プロフィール画像のstorage作成
insert into storage.buckets (id, name, public) values ('profile', 'profile', true);

create policy "プロフィール画像は誰でも参照可能" on storage.objects for select using ( bucket_id = 'profile' );
create policy "プロフィール画像はログインユーザーが追加" on storage.objects for insert with check ( bucket_id = 'profile' AND auth.role() = 'authenticated' );
create policy "自身のプロフィール画像を更新" on storage.objects for update with check ( bucket_id = 'profile' AND auth.uid() = owner );
create policy "自身のプロフィール画像を削除" on storage.objects for delete using ( bucket_id = 'profile' AND auth.uid() = owner );