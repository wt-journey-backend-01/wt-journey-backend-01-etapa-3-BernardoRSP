# Instruções para Configuração do Banco de Dados

Este documento descreve os passos para configurar e popular o banco de dados PostgreSQL usando Docker, Knex migrations e seeds.

---

## 1. Subir o banco com Docker

Certifique-se de ter o [Docker](https://www.docker.com/get-started) instalado.

No terminal, dentro da pasta do projeto, execute:

```bash
docker-compose up -d
```

Isso irá iniciar o container do PostgreSQL configurado no arquivo docker-compose.yml.

## 2. Executar migrations

As migrations criam as tabelas no banco de dados.

Execute o comando:

```bash
npx knex migrate:latest
```

Esse comando irá aplicar todas as migrations pendentes.

## 3. Rodar seeds

As seeds inserem dados iniciais nas tabelas.

Execute o comando:

```bash
npx knex seed:run
```

Isso vai popular as tabelas com os dados definidos nos arquivos de seeds.

## 4. Recriar tabelas (refazer migrations)

Caso precise desfazer todas as migrations e recriar as tabelas do zero, execute:

```bash
npx knex migrate:rollback
```

### Observações

- Certifique-se que as variáveis de ambiente POSTGRES_USER, POSTGRES_PASSWORD e POSTGRES_DB estejam definidas no seu ambiente ou em um arquivo .env na raiz do projeto.

- O banco estará disponível na porta 5432 do seu localhost.

Pronto! O banco está configurado e com dados iniciais para uso.
