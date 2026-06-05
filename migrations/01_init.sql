create table if not exists tasks (
  id bigserial primary key,
  description text not null,
  done boolean not null default false,
  create_date date not null default current_date,
  username text not null
);

insert into tasks (description, done, create_date)
values
  ('Buy milk (high)', true, '2002-08-24'),
  ('Sell milk (low)', false, '2002-08-25');

create table if not exists users (
  id bigserial primary key,
  username text not null,
  password text not null,
)

insert into users (username, passowrd)
values
  ('admin', '1234'),
  ('not admin', '2345');
