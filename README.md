# Movie Review and Rating Application

## Overview
This application is a movie review and rating platform developed using microservices architecture. The backend services are built with Spring Boot and the frontend is built with React. The application uses MongoDB for data storage. 

## Prerequisites
- Docker must be installed on the system.

## MongoDB Connection
The application uses a hardcoded MongoDB connection URL. Ensure that the MongoDB URL is specified in every service. The current configuration includes a preset MongoDB URL that can be used to run the application.

## Running the Application

### Build and Start
To build and start the application, run the following command:
```sh
docker-compose up --build -d
