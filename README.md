# CryproAppDemo

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.1.

## Getting Started

### Prerequisites

Ensure you have the following installed on your local development machine:

- [Node.js](https://nodejs.org/) - A JavaScript runtime. Use the version specified in `.nvmrc` file if available. You can use [NVM](https://github.com/nvm-sh/nvm) (Node Version Manager) to manage your Node.js versions and switch between them.
- [NPM](https://www.npmjs.com/) - A package manager for Node.js.
- [Angular CLI](https://cli.angular.io/) - A command line interface for Angular.

### Installing Dependencies

After cloning the repository to your local machine, navigate to the project directory in the terminal and run the following command to install all necessary dependencies:

```sh
npm install
```
## Development server

Navigate to the root directory and run the following command to run a dev server:
```sh
ng serve
``` 
Navigate to [http://localhost:4200/](http://localhost:4200/). The app will automatically reload if you change any of the source files.

## Build

Run the following command to build the project:
```sh
ng build
``` 
The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run the following command to execute the unit tests:
```sh
ng test
```
Tests are executed using [Karma](https://karma-runner.github.io), a test runner that spawns a web server to execute source code against test code for each of the browsers connected.

## Dockerization of the Application

### Prerequisites

- Docker
- Docker Compose

### Build Docker Image

Navigate to the root directory of the project and run the following command to build the Docker image:

```sh
docker-compose build
```

### Run the Docker Container
To run the Docker container, execute the following command:

```sh
docker-compose up
# or
docker-compose up -d    # to start containers in detached mode
```

The application should be available at [http://localhost:8080](http://localhost:8080).

### Stopping the Docker Container
To stop the Docker container, you can use the following command:

```sh
docker-compose down
```
## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.