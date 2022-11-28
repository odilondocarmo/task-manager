# task-manager
A API developer pratical exercise


## Structure

![Arch](https://github.com/odilondocarmo/task-manager/blob/main/images/overview-diagram.png?raw=true)

## Features

- Manage User
- Manage Tasks
- Perform Task
  - Send Notification


## Run api localy

Clone project

```bash
  git clone https://github.com/odilondocarmo/task-manager.git
```

Enter project directory

```bash
  cd .\task-manager\
```

[Optional] RabbitMQ and MySQL services

```bash
  docker-compose up
```

Enter api directory

```bash
  cd .\task-manager\api\
```

Install dependencies

```bash
  npm install
```

Run Migrations

```bash
  npm run migrations
```

Run project

```bash
  npm run start
```

## Running tests

```bash
  npm run test
```


## API Documentation

#### Get Token

```curl
  curl --location --request POST 'localhost:3333/sessions' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "username": "admin",
        "password": "admin"
    }'
```

| Param   | Type       | Description                           |
| :---------- | :--------- | :---------------------------------- |
| `username` | `string` | **Required**. The user's identification |
| `password` | `string` | **Required**. The user's password |

#### Create a User

```curl
  curl --location --request POST 'localhost:3333/user' \
    --header 'Authorization: Bearer {{token}}' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "username": "{{username}}",
        "password": "{{passowrd}}",
        "role": "{{role}}"
    }'
```

| Param   | Type       | Description                                   |
| :---------- | :--------- | :------------------------------------------ |
| `username` | `string` | **Required**. The user's identification |
| `password` | `string` | **Required**. The user's password |
| `role` | `manager | developer` | **Required**. The user's role |
| `token` | `string` | **Required**. The api token |

#### Create a Task

```curl
  curl --location --request POST 'localhost:3333/tasks' \
  --header 'Authorization: Bearer {{token}}' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "summary": "{{summary}}"
  }'
```

| Param   | Type       | Description                                   |
| :---------- | :--------- | :------------------------------------------ |
| `summary` | `string` | **Required**. The summary of the task |
| `token` | `string` | **Required**. The api token |

#### List All Tasks

```curl
  curl --location --request GET 'localhost:3333/tasks' \
  --header 'Authorization: Bearer {{token}}'
```

| Param   | Type       | Description                                   |
| :---------- | :--------- | :------------------------------------------ |
| `token` | `string` | **Required**. The api token |

#### Perform Task

```curl
  curl --location --request POST 'localhost:3333/tasks/perform/{{taskId}}' \
  --header 'Authorization: Bearer {{token}}'
```

| Param   | Type       | Description                                   |
| :---------- | :--------- | :------------------------------------------ |
| `taskId` | `integer` | **Required**. The task id |
| `token` | `string` | **Required**. The api token |

#### Show a Task

```curl
  curl --location --request GET 'localhost:3333/tasks/{{taskId}}' \
  --header 'Authorization: Bearer {{token}}'
```

| Param   | Type       | Description                                   |
| :---------- | :--------- | :------------------------------------------ |
| `taskId` | `integer` | **Required**. The task id |
| `token` | `string` | **Required**. The api token |

#### Delete Task

```curl
  curl --location --request DELETE 'localhost:3333/tasks/{{taskId}}' \
  --header 'Authorization: Bearer {{token}}'
```

| Param   | Type       | Description                                   |
| :---------- | :--------- | :------------------------------------------ |
| `taskId` | `integer` | **Required**. The task id |
| `token` | `string` | **Required**. The api token |


## Stack

**API:** Javascript - Node, Express, JWT, RabbitMQ

**Notification Service:** Javascript - Node, RabbitMQ
