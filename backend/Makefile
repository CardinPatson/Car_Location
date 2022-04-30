postgres:
	docker run --name postgres14 -p 5432:5432 -e POSTGRES_USER=root -e POSTGRES_PASSWORD=secret -d postgres:14-alpine

mysql:
	docker run --name mysql8 -p 3306:3306 -e MYSQL_ROOT_PASSWORD=secret -d mysql:8

createdb:
	docker exec -it postgres14 createdb --username=root --owner=root car_test

dropdb:
	docker exec-it postgres14 dropdb car_test

migrateup:
	migrate -path database/migrations -database "postgresql://root:secret@localhost:5432/car_test?sslmode=disable" -verbose up

migratedown:
	migrate -path database/migrations -database "postgresql://root:secret@localhost:5432/car_test?sslmode=disable" -verbose down

backend:
	node app.js

test:
	newman run Cars_Location.postman_collection.json

.PHONY: postgres createdb dropdb migrateup migratedown backend test