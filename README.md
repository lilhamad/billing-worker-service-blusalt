# Billing Worker Service

Backend technology used : Node.js/Express.js

service-to-service communication used : RabbitMQ

# Steps to run Billing Worker Service 

- create .env and paste this content

	PORT = 203
	DB_URL=mysql://root:Admin@1234@127.0.0.1/billings_db
	transactionQueueName = transactionsQueue
	processTransaction =  * * * * *
	RABBITMQURL = localhost
* uses same db as billing service

- replace DB_URL in the env file with : your billings_db credentials.
  root : your db user
  Admin@1234 : your db password
  mysql : your dialect
  127.0.0.1 : your db host

Run locally

// migrate : npm run migrate

// run service : npm run start:dev

Run on docker
// run service : docker-compose up
// you might have to settup your database info on dockerFile and docker-compose.yml

Note

- billing-worker-service runs every 5mins to do a dummy charge for a customer (with id 1)

