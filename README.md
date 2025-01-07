# XP Calculator

**XP Tracker** web application for tracking and managing experience points. Built with modern technologies including **Express.js** for the backend, **Vue.js** for the frontend, and **PostgreSQL** for the database, all written in **TypeScript**. Docker is used for easy setup and deployment.

---

## Features

- **Frontend**: Interactive user interface built with Vue.js and TypeScript.
- **Backend**: RESTful API powered by Express.js and TypeScript.
- **Database**: PostgreSQL for data persistence.
- **Dockerized Setup**: Seamlessly start and stop the project using Docker Compose.
---

## Prerequisites

Before you start, ensure you have the following installed:

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
---

## Quick Start

### Backend API

When the application is started, the [documentation](http://localhost:4000/docs) is available

### Starting the Project

If it's the first time you launch the application, run the following command before running the next one  :

```bash
./firstStart.sh
```

To start the application, run the following command in the project directory :

```bash
docker-compose up --build
```

### Stopping the Project

To stop the application, run the following command in the project directory :

```bash
docker-compose down -v
```

## Credits

This project was developed by:

- **[Karu](https://github.com/karumapathetic)** - Backend and Devops development.
- **[Hope](https://github.com/ItsMeHope)** - Frontend development.
