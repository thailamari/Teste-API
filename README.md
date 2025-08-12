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

## Testes
Para testar a API, utilize ferramentas como Postman, Insomnia ou scripts automatizados (ex: Supertest).

---

API criada para fins educacionais.
