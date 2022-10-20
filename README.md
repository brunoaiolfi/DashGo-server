# DashGo-server

## Sobre o projeto:

- DashGo é uma aplicação desenvolvida durante o curso ignite da rocketseat. Porém durante o curso apenas desenvolvemos apenas o front end. Este projeto vem para substituir a falta da API.

## Sobre a API:

- Esta api tem o intuito de fazer o CRUD de usuários.

## Ferramentas utilizadas:

- NodeJs, Express, Prisma

## Rotas da api:

### ROTAS DE USO DO USUÁRIO 😃

- Cadastrar usuário - /user
- Editar usuário - /user
- Editar senha do usuário - /user/editPassword
- Pegar todos usuários - /user/all
- Pegar usuário pelo id - /user/
- Pegar usuário pelo email - /user/email/
- Deletar usuário - /user

## Como utilizar 
  
-  Após baixar o repositório utilize um `yarn add` para fazer o download de todas as dependências.
-  Após isto crie um arquivo .env conforme o exemplo.
-  Crie uma migration do banco de dados utilizando `prisma migrate dev --name init`.
-  Inicie o projeto com o comando `yarn dev`.
