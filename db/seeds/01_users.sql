-- Users table seeds here (Example)
INSERT INTO users (name, email, password, is_admin) VALUES ('Alice', 'alice@g', 'password', TRUE);
INSERT INTO users (name, email, password, is_admin)  VALUES ('Kira', 'Kira8945@gmail.com', 'password', TRUE);
INSERT INTO users (name, email, password)  VALUES ('James', 'james@g', 'password');
INSERT INTO users (name, email, password)  VALUES ('Amanda', 'amanda@', 'password');
INSERT INTO users (name, email, password, is_admin) VALUES ('Ab', 'jayda.mraz@hotmail.com', 'password'. TRUE);
INSERT INTO users (name, email, password, is_admin) VALUES ('Aba', 'savanna58@yahoo.com', 'password', TRUE);
INSERT INTO users (name, email, password) VALUES ('Abad', 'iheaney@anderson.com', 'password');
INSERT INTO users (name, email, password) VALUES ('Abagael', 'pdoyle@yahoo.com', 'password');
INSERT INTO users (name, email, password) VALUES ('Abagail', 'hturcotte@gmail.com', 'password');
INSERT INTO users (name, email, password) VALUES ('Abana', 'novella.bergnaum@marks.com', 'password');
INSERT INTO users (name, email, password) VALUES ('Abate', 'jayde87@gmail.com', 'password');
INSERT INTO users (name, email, password) VALUES ('Abba', 'gladyce01@gmail.com', 'password');
INSERT INTO users (name, email, password) VALUES ('Abbate', 'schoen.destini@okeefe.com', 'password');
INSERT INTO users (name, email, password) VALUES ('Abbe', 'maye.bechtelar@gorczany.com', 'password');
INSERT INTO users (name, email, password) VALUES ('Abbey', 'kali57@yahoo.com', 'password');
INSERT INTO users (name, email, password) VALUES ('Abbi', 'nblick@johnston.com', 'password');
INSERT INTO users (name, email, password) VALUES ('Abbie', 'icummerata@gmail.com', 'password');

INSERT INTO items (admin_id, title, description, thumbnail_photo_url, cover_photo_url, cost, date, sold, country, city, province)
VALUES (1, 'shoe', 'black', '/image', '/image2', 100, '2022-03-11', FALSE, 'Canada', 'Toronto', 'ON');

INSERT INTO items (admin_id, title, description,thumbnail_photo_url, cover_photo_url, cost, date, sold, country, city, province)
VALUES (2, 'hat', 'white', '/image3', '/image4', 50, '2022-03-05', True, 'Canada', 'Montreal', 'QC');

INSERT INTO items (admin_id, title, description,thumbnail_photo_url, cover_photo_url, cost, date, sold, country, city, province)
VALUES (1, 'shirt','blue', '/image5', '/image6', 80, '2022-01-15', FALSE, 'Canada', 'London', 'ON');

INSERT INTO items (admin_id, title,description, thumbnail_photo_url, cover_photo_url, cost, date, sold, country, city, province)
VALUES (1, 'dress', 'description','/image', '/image2', 25, '2022-03-09', FALSE, 'Canada', 'Toronto', 'ON');

INSERT INTO items (admin_id, title,description, thumbnail_photo_url, cover_photo_url, cost, date, sold, country, city, province)
VALUES (4, 'pants', 'demim', '/image3', '/image4', 65, '2022-02-05', True, 'Canada', 'Montreal', 'QC');

INSERT INTO items (admin_id, title,description, thumbnail_photo_url, cover_photo_url, cost, date, sold, country, city, province)
VALUES (5, 'shirt', 'graphic text' , '/image5', '/image6', 80, '2022-01-15', True, 'Canada', 'London', 'ON');


INSERT INTO features (user_id, item_id)
VALUES(1,1);
INSERT INTO features (user_id, item_id)
VALUES (1,3);
INSERT INTO features (user_id, item_id)
VALUES (2,3);
INSERT INTO features (user_id, item_id)
VALUES(4,2);
INSERT INTO features (user_id, item_id)
VALUES (3,3);
INSERT INTO features (user_id, item_id)
VALUES (3,4);
INSERT INTO features (user_id, item_id)
VALUES(3,2);
INSERT INTO features (user_id, item_id)
VALUES (3,3);


INSERT INTO messages (user_id, item_id, message)
VALUES (1,2,"where was this hat made?");

INSERT INTO messages (user_id, item_id, message)
VALUES (2,3,"what condition is the shirt in? ");

INSERT INTO messages (user_id, item_id, message)
VALUES (3,1, "will you take 50 bucks?" );

INSERT INTO messages (user_id, item_id, message)
VALUES (3,2,"can we meet tomorrow?")

INSERT INTO messages (user_id, item_id, message)
VALUES (3,2,"and will you do 40?");

INSERT INTO messages (user_id, item_id, message)
VALUES (1,3, "is it still availible?");
