<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

# Car Management API with NestJS

This project is a **Car Management API** built with **NestJS**. It allows users to create, retrieve, update, and delete car records. Additionally, it can fetch and store car data from an external API.

## Features
- Create a car record
- Retrieve all cars with pagination
- Retrieve a specific car by ID
- Update car records
- Delete car records
- Fetch and store cars from an external API

## Technologies Used
- **NestJS** - Framework for building efficient and scalable Node.js applications.
- **GraphQL** - Used for querying the API.
- **MongoDB (Mongoose)** - Database used to store car information.
- **Express** - Middleware for XML parsing.
- **Axios** - Used to fetch car data from an external API.

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/car-management-api.git
    cd car-management-api
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Set up your environment variables:

    Create a `.env` file in the root of your project and include the following:

    ```env
    MONGO_URI=mongodb://localhost:27017/your-database-name
    ```

4. Run the application:

    ```bash
    npm run start
    ```

5. The API will run on `http://localhost:3000`.

## API Endpoints

### GraphQL

#### Queries
- `hello`: Returns a simple greeting.
  
    ```graphql
    query {
      hello
    }
    ```

- `cars(page: Int, limit: Int)`: Retrieves a paginated list of cars.
  
    Example:
    ```graphql
    query {
      cars(page: 1, limit: 10) {
        cars {
          _id
          makeName
        }
        total
      }
    }
    ```

#### Mutations
- `createCar(input: CarInput)`: Creates a new car record.

    Example:
    ```graphql
    mutation {
      createCar(input: { makeName: "Toyota", makeId: 123 }) {
        _id
        makeName
      }
    }
    ```

- `fetchAndStoreCars`: Fetches car data from an external API and stores it in the database.

    Example:
    ```graphql
    mutation {
      fetchAndStoreCars
    }
    ```

## Folder Structure

```bash
src
│
├── car
│   ├── car.resolver.ts          # GraphQL resolver for car operations
│   ├── car.service.ts           # Business logic for managing cars
│   ├── dto
│   │   └── create-car.dto.ts    # DTO for creating cars
│   └── interfaces
│       └── car.interface.ts     # Interface defining the car model
├── xml-parser
│   └── xml-parser.service.ts    # Service to handle external API XML parsing
└── app.module.ts                # Root module of the application

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
