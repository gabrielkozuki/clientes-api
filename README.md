# clientes-api

API RESTful para gerenciamento de clientes, desenvolvida com Node.js, MongoDB e Docker.

## Tecnologias

- **Node.js** com ES Modules
- **Express** v5
- **MongoDB** via Mongoose
- **Zod** para validação de dados
- **Swagger UI** para documentação interativa
- **Docker** + **Docker Compose**
- **Vitest** para testes unitários
- **Pino** para logs estruturados

---

## Pré-requisitos

Para rodar o projeto com Docker (recomendado), você precisa de:

- [Docker](https://www.docker.com/) (inclui Docker Compose v2)

Para rodar localmente sem Docker:

- [Node.js](https://nodejs.org/) v20 ou superior
- Uma instância MongoDB acessível

---

## Configuração das variáveis de ambiente

Copie o arquivo de exemplo e preencha os valores:

```bash
cp .env.example .env
```

Edite o `.env` com as suas configurações:

```env
PORT=3000
MONGODB_URI=mongodb://mongodb:27017/clientes-api
NODE_ENV=development # development | production
LOG_LEVEL=info # trace | debug | info | warn | error | fatal
```

> Ao usar Docker Compose, o valor `mongodb` no `MONGODB_URI` corresponde ao nome do serviço definido no `docker-compose.yml`.  
> Para rodar localmente sem Docker, substitua por `mongodb://localhost:27017/clientes-api`.

## Rodando com Docker

Certifique-se de ter o `.env` configurado antes de executar. Na raiz do projeto:

```bash
docker-compose up --build
```

A API estará disponível em `http://localhost:3000`.

Para encerrar:

```bash
docker-compose down
```

---

## Rodando localmente (sem Docker)

```bash
npm install
npm run dev
```

Certifique-se de que a variável `MONGODB_URI` no `.env` aponta para uma instância MongoDB local.

---

## Documentação Swagger

Com a aplicação em execução, acesse a documentação interativa em:

```
http://localhost:3000/docs
```

Todas as rotas podem ser testadas diretamente pela interface do Swagger UI.

---

## Rotas disponíveis

| Método | Rota | Descrição |
|---|---|---|
| `POST` | `/clients` | Criar um novo cliente |
| `GET` | `/clients` | Listar clientes (com paginação) |
| `GET` | `/clients/:id` | Buscar cliente por ID |
| `PUT` | `/clients/:id` | Atualizar cliente completo |
| `PATCH` | `/clients/:id` | Atualizar cliente parcialmente |
| `DELETE` | `/clients/:id` | Deletar cliente |

### Parâmetros de paginação (GET /clients)

| Parâmetro | Tipo | Padrão | Descrição |
|---|---|---|---|
| `page` | inteiro | 1 | Número da página |
| `limit` | inteiro | 10 | Registros por página (máx. 100) |

---

## Modelo do cliente

| Campo | Tipo | Descrição |
|---|---|---|
| `name` | string | Nome do cliente (mín. 2 caracteres) |
| `email` | string | E-mail único |
| `document` | string | CPF ou CNPJ (somente números, 11–14 caracteres) |
| `createdAt` | datetime | Preenchido automaticamente |
| `updatedAt` | datetime | Preenchido automaticamente |

---

## Estrutura do projeto

```
src/
├── server.js               # Ponto de entrada
├── db.js                   # Conexão com MongoDB
├── logger.js               # Configuração do Pino
├── swagger.yml             # Especificação OpenAPI
├── controllers/            # Orquestração de requisição/resposta
├── repositories/           # Interação com o banco de dados
├── models/                 # Schemas Mongoose
├── routes/                 # Definição de rotas e middlewares
├── middlewares/            # Validação e tratamento de erros
├── validations/            # Schemas Zod
├── errors/                 # Classes de erro customizadas
└── tests/                  # Testes unitários e mocks
```

---

## Testes

Os testes unitários cobrem as camadas de **controller** e **repository**, com todas as dependências externas substituídas por mocks — sem necessidade de banco de dados em execução.

Para executar:

```bash
npm test
```

Para executar em modo watch (re-executa ao salvar):

```bash
npm run test:watch
```

---

## Uso de Inteligência Artificial

Este projeto foi desenvolvido com auxílio do modelo Claude Sonnet 4.6. A IA foi utilizada como ferramenta de apoio para boilerplate e repetição, dúvidas pontuais e escrita de documentação.

Todas as decisões técnicas foram feitas pelo desenvolvedor, que incluem:
- Arquitetura em camadas (routes → controllers → repositories) para isolamento de responsabilidades;
- Validação com Zod separada por origem do dado (`validateRequestBody`, `validateRequestParams`, `validateRequestRouteParams`), com mensagens de erro customizadas em português;
- Hierarquia de erros customizados (`AppError` → `NotFoundError`, `ConflictError`) com tratamento centralizado no `errorHandler`;
- `overwrite: true` no `PUT` para substituição completa do documento, e comportamento padrão de `$set` no `PATCH` para atualização parcial;
- Erro `11000` do MongoDB tratado em todas as operações de escrita, garantindo resposta `409` consistente;
- `mapClient` no repository desacoplando o formato de resposta da estrutura interna do Mongoose;
- Documentação via `swagger.yml`, sem uso de outras dependências para controle total sobre o contrato da API;
- Logs estruturados com `pino` e `pino-http`, com nível configurável via `LOG_LEVEL`; em desenvolvimento (`NODE_ENV=development`) o `pino-pretty` formata os logs de forma legível no terminal, em produção o JSON puro é emitido.