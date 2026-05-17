CREATE DATABASE plantmap;
USE plantmap;

-- usuarios

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL, -- not null serve pra deixar o campo obrigatorio ser preenchido
    email VARCHAR(150) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    data_de_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- salva a data e a hora do momento atual
);

-- as avrori

CREATE TABLE arvores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    especies_das_arvores VARCHAR(100), -- pra nao ficar confuso, o 100 serve pro numero maximo de caracteres
    latitude DECIMAL(10,8) NOT NULL, -- aqui eh diferente, 10 no caso eh a precisao, os algarismos, e 8 eh o numero de casas decimais, mesma coisa no debaixo
    longitude DECIMAL(11,8) NOT NULL,
    data_plantio DATE,
    descricao TEXT,
    data_do_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) -- FOREIGN KEY basicamente guarda a referencia, e REFERENCES eh o endereco do destino
);

CREATE INDEX idx_arvore_localizacao ON arvores(latitude, longitude);

-- lugar para guardar as fotos das arvores (no caso serao usadas urls das fotos)

CREATE TABLE fotos_arvores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  arvore_id INT NOT NULL,
  url_foto VARCHAR(255),
  data_upload TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (arvore_id) REFERENCES arvores(id) ON DELETE CASCADE -- basicamente vai excluir as fotos das arvores automaticamente
);

-- tipos dos pontos

CREATE TABLE tipos_pontos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL
);

-- pontos no mapa

CREATE TABLE pontos_mapa (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tipo_id INT NOT NULL,
    nome VARCHAR(100),
    latitude DECIMAL(10,8) NOT NULL,
    longitude DECIMAL(11,8) NOT NULL,
    endereco VARCHAR(255),
    descricao TEXT,

    FOREIGN KEY (tipo_id) REFERENCES tipos_pontos(id)
); 

CREATE INDEX idx_pontos_localizacao ON pontos_mapa(latitude, longitude);

-- sistema de armazenar postagens

CREATE DATABASE armz_post;
USE armz_post;

CREATE TABLE postagens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    conteudo TEXT NOT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-------- estrutura inicial do banco plantmap

-- tabela de usuarios
CREATE TABLE usuarios(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    foto VARCHAR(255)
);

--tabela dux poxti
CREATE TABLE posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    descricao TEXT,
    imagem VARCHAR(255),
    data TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

--tabela dos comment 🥵🥵
CREATE TABLE comentarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    post_id INT NOT NULL,
    texto TEXT NOT NULL,
    data TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);
