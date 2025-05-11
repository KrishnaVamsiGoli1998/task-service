# Task Service

Task management microservice for the Scalable Microservices Application.

## Features

- Create, read, update, and delete tasks
- Task assignment and status tracking
- Integration with other microservices

## Prerequisites

- Docker Desktop
- Node.js (for development)
- Kubernetes (optional, for k8s deployment)

## Quick Start

### Using Pre-built Docker Image

1. Import the Docker image:

   ```
   cd docker-image
   .\import.ps1
   ```

2. Start the service:
   ```
   cd ..
   docker-compose up -d
   ```

### Building from Source

1. Build and start the service:
   ```
   docker-compose up -d --build
   ```

### Kubernetes Deployment

1. Apply the Kubernetes configuration:

   ```
   kubectl apply -f k8s-deployment.yaml
   ```

2. Check the deployment status:
   ```
   kubectl get deployments
   kubectl get pods
   kubectl get services
   ```

## API Endpoints

- `GET /tasks` - Get all tasks
- `GET /tasks/:id` - Get a specific task
- `POST /tasks` - Create a new task
- `PUT /tasks/:id` - Update a task
- `DELETE /tasks/:id` - Delete a task

## Environment Variables

Create a `.env` file with the following variables:

```
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=your_db_host
DB_PORT=your_db_port
DB_NAME=your_db_name
```

## Development

1. Install dependencies:

   ```
   npm install
   ```

2. Start the development server:
   ```
   npm start
   ```

## Docker Commands

- Build the image:

  ```
  docker build -t task-service .
  ```

- Run the container:

  ```
  docker run -p 4001:4001 --env-file .env task-service
  ```

- Save the image:

  ```
  docker save task-service:latest -o task-service.tar
  ```

- Load the image:
  ```
  docker load -i task-service.tar
  ```
