$(VERBOSE).SILENT:
.DEFAULT_GOAL := help

.PHONY: help
help: # Prints out help
	@IFS=$$'\n' ; \
	help_lines=(`fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/\\$$//' | sed -e 's/##/:/'`); \
	printf "%-30s %s\n" "target" "help" ; \
	printf "%-30s %s\n" "------" "----" ; \
	for help_line in $${help_lines[@]}; do \
			IFS=$$':' ; \
			help_split=($$help_line) ; \
			help_command=`echo $${help_split[0]} | sed -e 's/^ *//' -e 's/ *$$//'` ; \
			help_info=`echo $${help_split[2]} | sed -e 's/^ *//' -e 's/ *$$//'` ; \
			printf '\033[36m'; \
			printf "%-30s %s" $$help_command ; \
			printf '\033[0m'; \
			printf "%s\n" $$help_info; \
	done
	@echo

.PHONY: install
install: ## installs dependencies
	npm install

.PHONY: dev
dev: ## runs the development binary in hot-reload watch mode
	npx nodemon server/app.js

.PHONY: run
run: init_db ## runs the production binary
	node server/app.js

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

.PHONY: build_docker
build_docker: ## builds Docker container
	docker build --tag goddtriffin/oasis:latest --file ./deployment/Dockerfile .

.PHONY: run_docker
run_docker: ## runs a new Docker container
	docker run \
	--name "oasis" \
	-d --restart unless-stopped \
	-p 8080:8080 \
	goddtriffin/oasis

.PHONY: start_docker
start_docker: ## resumes a stopped Docker container
	docker start oasis

.PHONY: stop_docker
stop_docker: ## stops the Docker container
	docker stop oasis

.PHONY: remove_docker
remove_docker: ## removes the Docker container
	docker rm oasis

.PHONY: push_docker
push_docker: ## pushes new Docker image to Docker Hub
	docker push goddtriffin/oasis:latest

.PHONY: restart_deployment
restart_deployment: ## restarts all pods in the oasis k8s deployment
	kubectl rollout restart deployment oasis

.PHONY: deploy
deploy: build_docker push_docker restart_deployment # builds/pushes new docker image at :latest and restarts k8s deployment

# TODO: vet the other targets

.PHONY: mem_usage
mem_usage: # displays the memory usage of the currently running Docker container
	docker stats oasis --no-stream --format "{{.Container}}: {{.MemUsage}}"

.PHONY: logs
logs: # displays logs from the currently running Docker container
	docker logs oasis
