create table bot
(
    id          int auto_increment
        primary key,
    user_id     int           not null,
    title       varchar(200)  not null,
    description varchar(200)  not null,
    content     varchar(2000) not null,
    createtime  datetime      not null,
    modifytime  datetime      not null
);

create table record
(
    id          int auto_increment
        primary key,
    a_id        int           not null,
    a_sx        int           not null,
    a_sy        int           null,
    b_id        int           null,
    b_sx        int           null,
    b_sy        int           null,
    b_steps     varchar(2000) null,
    map         varchar(2000) null,
    loser       varchar(2000) null,
    create_time datetime      null,
    a_steps     varchar(2000) null
);

create table user
(
    id       int auto_increment
        primary key,
    username varchar(200)  null,
    password varchar(2000) null,
    photo    varchar(2000) null,
    rating   int           null
);

