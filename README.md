# Product Service 

## Environment variables
To run the app both on a local machine or in a docker container setup environments variables in `.env` like in `.env-example`

## Running the app in docker container

```bash
$ docker compose up -d 
```

## Running the app on local machine

1. Run development environment
```bash
$ docker compose up -d mongo rabbitmq
```

2. Change connection url's hosts in config.ts accordingly

- mongo.url : `mongodb://localhost:27017/admin`

- rabbitmq.url: `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASS}@localhost:5672`

3. Install all dependencies
```bash
$ npm install
```

4. Build the app
```bash
$ npm run build
```

5. Run the app
```bash
$ npm start
```

