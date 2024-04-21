<p align="center">
  <img src="./assets/morgan.png" width="200" alt="Purshew Logo" /></a>
</p>

<p align="center">Purshew: Chase Bank opened a branch in +234</p>
<p align="center">
<!-- <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a> -->
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

2. copy .env.example to .env and fill them out

3. install all dependencies

    ```bash
    pnpm install
    ```

4. [download docker](https://www.docker.com/products/docker-desktop/)

5. start the postgres (database) service

    ```bash
    docker compose up dev-db
    ```

6. generate SQL migrations for the drizzle schema definitions

    ```bash
    pnpm drizzle-kit generate:pg
    ```

7. push the generated SQL migrations to the postgres database

    ```bash
    pnpm tsx db/migrate.ts
    ```

8. seed the transaction templates

    ```bash
    pnpm tsx seed/migrate.ts
    ```

9. (optional) start the drizzle-kit studio to interact with your database

    ```bash
    pnpm drizzle-kit studio
    ```

10. start the app in development mode

    ```bash
    pnpm start:dev
    ```

## Stay in touch

- Author - [Prince Ofori](https://princeofori.webflow.io)
- Twitter - [@KwadwoTheAtta](https://twitter.com/KwadwoTheAtta)

## License

Purshew API is [MIT licensed](LICENSE).
