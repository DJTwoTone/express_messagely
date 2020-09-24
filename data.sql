\c messagely

DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS users;


CREATE TABLE users (
    username text PRIMARY KEY,
    password text NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL,
    phone text NOT NULL,
    join_at timestamp without time zone NOT NULL,
    last_login_at timestamp with time zone
);

CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    from_username text NOT NULL REFERENCES users,
    to_username text NOT NULL REFERENCES users,
    body text NOT NULL,
    sent_at timestamp with time zone NOT NULL,
    read_at timestamp with time zone
);

INSERT INTO users
VALUES ('user1', 'testpassword1', 'Bob', 'Jones', '010-5555-1234', '2004-10-19 10:23:54'),
        ('user2', 'testpassword2', 'Henry', 'James', '010-5555-1235', '2004-10-19 10:23:54');


INSERT INTO messages (from_username, to_username, body, sent_at)
VALUES ('user1', 'user2', 'blah blah, blah', '2004-10-19 10:23:54'),
        ('user2', 'user1', 'Nee Nee Neee', '2004-10-19 10:23:54');