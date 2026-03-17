# eco-plantmap
PlantMap é uma plataforma web que permite registrar e visualizar árvores plantadas em um mapa interativo, incentivando o reflorestamento e a conscientização ambiental.

Dica: Para as coordenadas de Manaus (latitude e longitude), o tipo REAL (números com vírgula/ponto) é o ideal para o GPS não dar erro.

DER do Banco de Dados: basicamente um resumo de como está organizado o Banco de Dados.
USUARIOS
---------
id (PK)
nome
email
senha
data_de_criacao

ARVORES
---------
id (PK)
usuario_id (FK)
especie_da_arvore
latitude
longitude
data_plantio
descricao
data_do_registro

FOTOS_ARVORES
---------
id (PK)
arvore_id (FK)
url_foto
data_upload

TIPOS_PONTOS
---------
id (PK)
nome

PONTOS_MAPA
---------
id (PK)
tipo_id (FK)
nome
latitude
longitude
endereco
descricao
