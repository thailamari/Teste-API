# API de Transferências

Esta API permite o registro, login, consulta de usuários e transferências de valores entre usuários. O objetivo é servir de base para estudos de testes e automação de APIs.

## Tecnologias
- Node.js
- Express
- Swagger (documentação)

## Instalação

1. Clone o repositório ou copie os arquivos para sua máquina.
2. Instale as dependências:
   ```
npm install express swagger-ui-express
   ```

## Como rodar

1. Inicie o servidor:
   ```
node server.js
   ```
2. Acesse a documentação Swagger em: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## Endpoints principais

- `POST /register` — Registro de usuário
- `POST /login` — Login de usuário
- `GET /users` — Listar usuários
- `POST /transfer` — Realizar transferência
- `GET /transfers` — Listar transferências

## Regras de negócio
- Login exige usuário e senha.
- Não é permitido registrar usuários duplicados.
- Transferências para destinatários não favorecidos só podem ser feitas se o valor for menor que R$ 5.000,00.
- O banco de dados é em memória (os dados são perdidos ao reiniciar o servidor).

## Estrutura de diretórios
- `controller/` — Lógica dos endpoints
- `service/` — Regras de negócio
- `model/` — Dados em memória
- `app.js` — Configuração do Express e rotas
- `server.js` — Inicialização do servidor
- `swagger.json` — Documentação da API

## GraphQL Types, Queries e Mutations

Rode npm run start-graphql para executar a API do GraphQL e acesse a URL http://localhost:4000/graphql para acessá-la.

- Types:
      User: username, favorecidos, saldo
      Transfer: from, to, value, date
- Queries:
      users: lista todos os usuários
      transfers: lista todas as transferências (requer autenticação JWT)
- Mutations:
      registerUser(username, password, favorecidos): retorna User
      loginUser(username, password): retorna token + User
      createTransfer(from, to, value): retorna Transfer (requer autenticação JWT)


## Regras de negócio

      Não é permitido registrar usuários duplicados.
      Login exige usuário e senha.
      Transferências acima de R$ 5.000,00 só podem ser feitas para favorecidos.
      O saldo inicial de cada usuário é de R$ 10.000,00.


## Testes
O arquivo app.js pode ser importado em ferramentas de teste como Supertest.
Para testar a API GraphQL, importe graphql/app.js nos testes.

## Testes
Para testar a API, utilize ferramentas como Postman, Insomnia ou scripts automatizados (ex: Supertest).

---

API criada para fins educacionais.
