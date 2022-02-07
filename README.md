# Billing Worker Service

Backend technology used : Node.js/Express.js

service-to-service communication used : RabbitMQ

// run service npm run start:dev

// migrate npm run migrate

// seed npx sequelize-cli db:seed:all

//port : 203

//RABBITMQURL can be set on the env

Note

- billing-worker-service runs every 5mins to do a dummy charge for a customer (with id 1)

