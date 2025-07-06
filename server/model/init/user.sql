create table if not exists users (
  id int auto_increment primary key,
  email varchar(255) not null,
  password varchar(255) not null,
  name varchar(255) not null,
  role enum('admin', 'user') not null default 'user',
  created_at timestamp default current_timestamp
);