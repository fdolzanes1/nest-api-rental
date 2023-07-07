# API Car Rental 

![Badge em Desenvolvimento](http://img.shields.io/static/v1?label=Status&message=Under%20Development&color=GREEN)

## Description

The car rental system is a web application developed in Node.js, using the Nest.js framework and the Prisma ORM to connect to a PostgreSQL database. 


## Entity Relationship Model
![](diagrama-rental-api.png)

## Stack
* `Node.js`
* `Nest.js`
* `Prisma`
* `Postgres`
* `JWT`
* `RBAC`
* `Passport`
* `Swagger`
* `TDD`
* `Deploy`

## Installation

```bash
# install dependencies
$ npm install
```

## Running the database

```bash
# docker
$ docker-compose up -d
```

## Running the app

```bash
# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Running the seed

```bash
# watch mode
$ npm run prisma:seed
```

## Running Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Endpoints

The API exposes the following *endpoints* from the *base URL* `localhost:3000/api`:

`/car`
* `GET /car`
* `GET /car/:id`
* `GET /car/:id/specifications`
* `POST /car`
* `PUT /car/:id`
* `DELETE /car/:id`

`/categories`
* `GET /categories`
* `GET /categories/:id`
* `POST /categories`
* `PUT /categories/:id`
* `DELETE /categories/:id`

`/specifications`
* `GET /specifications`
* `GET /specifications/:id`
* `POST /specifications`
* `PUT /specifications/:id`
* `DELETE /specifications/:id`

`/users`
* `GET /users`
* `GET /users/:id`
* `PUT /users/:id`
* `DELETE /users/:id`

`/auth`
* `POST /register`
* `POST /login`
* `POST /forget`
* `POST /reset`
* `POST /verify`
* `POST /verify-guard`

`/rentals`
* Under development

## Software Developer
![](https://avatars.githubusercontent.com/u/7582408?s=100&v=2)

[Fabiano Dolzanes](https://fdolzanes1.github.io)

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
