export DATABASE_URL := mysql://root:root@127.0.0.1:3306/achat

.PHONY: build
build:
	docker-compose build

.PHONY: up
up:
	docker-compose up -d

.PHONY: achatapi_local
achatapi_local:
	cd a_chat_api; cargo run --bin main

.PHONY: migrate
migrate:
	docker-compose exec tools bash -c "diesel migration run && cargo run --bin insert"
