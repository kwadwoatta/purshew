<p align="center">
  <img src="./assets/purshew.png" width="200" alt="Purshew Logo" /></a>
</p>

<p align="center">Purshew: Chase Bank opened a branch in +234</p>
<p align="center">
<a href="https://twitter.com/kwadwotheatta" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

<p align="center">Built with NestJS, this service offers a robust and scalable server-side application for accounting purposes. The API leverages GraphQL for efficient data querying and manipulation, ensuring high performance and flexibility. It utilizes Drizzle ORM for seamless database operations, and PostgreSQL for reliable data storage and retrieval.</p>

## Running the app

1. clone the repo

    ```bash
    git clone https://github.com/kwadwoatta/purshew.git
    ```

2. cd into the repo

    ```bash
    cd purshew
    ```

3. copy .env.example to .env and fill them out

4. install all dependencies

    ```bash
    pnpm install
    ```

5. [download docker](https://www.docker.com/products/docker-desktop/)

6. start the postgres (database) service

    ```bash
    docker compose up -d
    ```

7. generate SQL migrations for the drizzle schema definitions

    ```bash
    pnpm drizzle-kit generate:pg
    ```

8. push the generated SQL migrations to the postgres database

    ```bash
    pnpm tsx db/migrate.ts
    ```

9. seed the transaction templates

    ```bash
    pnpm tsx seed/migrate.ts
    ```

10. (optional) start the drizzle-kit studio to interact with your database

    ```bash
    pnpm drizzle-kit studio
    ```

11. start the app in development mode

    ```bash
    pnpm start:dev
    ```

12. visit url in Altair or Graphql client of choice

    ```bash
    http://[::1]:3000/graphql
    ```

13. signing up a user

    ```graphql
    mutation {
      signup(signup: { email: "test@mail.com", password: "123" }) {
        access_token
      }
    }
    ```

14. copy access token and set as Header for subsequent requests

    ```graphql
    Authorization: Bearer {your access token}
    ```

15. execute template for Kwame's initial opening balance

    ```graphql
    mutation {
      executeTransactionTemplate(
        executeTransactionTemplateInput: {
          template: kwame_initial_capital
          amount: 50000.00
        }
      )
    }
    ```

16. execute template for Kwame's purchase of GHS 20,000 worth of System Units

    ```graphql
    mutation {
      executeTransactionTemplate(
        executeTransactionTemplateInput: {
          template: kwame_system_unit_purchase
          amount: 20000.00
        }
      )
    }
    ```

17. execute template for Kwame's sale of GHS 10,000 worth of System Units

    ```graphql
    mutation {
      executeTransactionTemplate(
        executeTransactionTemplateInput: {
          template: kwame_system_unit_sale
          amount: 10000.00
        }
      )
    }
    ```

## Stored Procedure

Here is a PostgreSQL stored procedure for generating a balance sheet:

```sql
  CREATE OR REPLACE PROCEDURE balance_sheet(INOUT result_set refcursor)
  LANGUAGE plpgsql
  AS $$
  BEGIN
      OPEN result_set FOR
    SELECT
          debit_account_name AS "Debit Account",
          debit_amount AS "Amount",
          credit_account_name AS "Credit Account",
          credit_amount AS "Amount",
          description AS "Description"
      FROM
          transactions

      UNION ALL

      SELECT
          'TOTAL' AS debit_account_name,
          SUM(debit_amount) AS debit_amount,
          'TOTAL' AS credit_account_name,
          SUM(credit_amount) AS credit_amount,
          NULL AS description
      FROM
          transactions;
  END;
  $$;
```

## Stay in touch

- Author - [Prince Ofori](https://princeofori.webflow.io)
- Twitter - [@KwadwoTheAtta](https://twitter.com/KwadwoTheAtta)

## License

Purshew API is [MIT licensed](LICENSE).
