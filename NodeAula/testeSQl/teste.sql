CREATE TABLE usuario(
    nome VARCHAR(50),
    email VARCHAR(100)
);

INSERT INTO usuario(nome,email) VALUES("Paula","pauladNielsen@gmail.com");
INSERT INTO usuario(nome,email) VALUES("Laura","Laurad@gmail.com");

SELECT * FROM usuario WHERE nome = "Laura";

DROP TABLE usuario;
DELETE FROM usuario WHERE nome = "laula";
UPDATE usuario SET email = "gusanielsen@gmail.com" WHERE nome = "Gustavo";

DELETE FROM posts WHERE id = 4;

