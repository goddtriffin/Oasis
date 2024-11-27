$(VERBOSE).SILENT:
.DEFAULT_GOAL := help

.PHONY: help
help: # show available commands and their descriptions
	@printf "%-30s %s\n" "target" "help"
	@printf "%-30s %s\n" "------" "----"
	@grep -E '^[a-zA-Z0-9_-]+:.*?## .*$$' $(MAKEFILE_LIST) | \
	while read -r line; do \
		target=$$(echo "$$line" | cut -f1 -d":"); \
		help=$$(echo "$$line" | cut -f2- -d"#" | cut -c3-); \
		printf '\033[36m%-30s\033[0m %s\n' "$$target" "$$help"; \
	done

.PHONY: install
install: ## installs dependencies
	npm install

.PHONY: dev
dev: ## runs the development binary in hot-reload watch mode
	NODE_ENV=development \
		PORT=8080 \
		npx nodemon server/app.js

.PHONY: init_db
init_db: ## deletes the Sqlite database and re-initializes it
	rm -rf db
	mkdir -p db
	node dev/sqlite3-tool.js production

.PHONY: upgrade_deps
upgrade_deps: ## upgrades dependencies
	npm outdated
	npx ncu -u
	npm update
	npm install
	npm find-dupes

.PHONY: docker_build
docker_build: ## builds Docker container
	docker build \
		--platform linux/amd64 \
		--tag goddtriffin/oasis:latest \
		--file ./Dockerfile \
		.

.PHONY: docker_run
docker_run: ## runs Docker containers
	docker compose up -d

.PHONY: docker_stop
docker_stop: ## stops Docker containers
	docker compose down

.PHONY: docker_logs
docker_logs: ## displays Docker logs
	docker compose logs oasis_server -f

.PHONY: docker_mem_usage
docker_mem_usage: ## displays the memory usage of the currently running Docker containers
	docker stats oasis_server --no-stream --format "{{.Container}}: {{.MemUsage}}"

.PHONY: docker_push
docker_push: ## pushes Docker images to Docker Hub
	docker push goddtriffin/oasis:latest
