# BlueHooper Frontend Docker Management
.PHONY: help build dev prod clean logs restart

# Default target
help: ## Show this help message
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Targets:'
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

# Environment setup
setup: ## Setup environment files
	@if [ ! -f .env ]; then cp .env.docker .env; echo "Created .env from .env.docker template"; fi
	@echo "Please update .env with your API configuration"

# Development
dev: setup ## Start development environment with hot reload
	docker-compose -f docker-compose.dev.yml up --build

dev-detached: setup ## Start development environment in background
	docker-compose -f docker-compose.dev.yml up --build -d

dev-logs: ## Show development logs
	docker-compose -f docker-compose.dev.yml logs -f

dev-stop: ## Stop development environment
	docker-compose -f docker-compose.dev.yml down

dev-restart: ## Restart development environment
	docker-compose -f docker-compose.dev.yml restart

# Production
prod: setup ## Start production environment
	docker-compose up --build -d

prod-logs: ## Show production logs
	docker-compose logs -f

prod-stop: ## Stop production environment
	docker-compose down

prod-restart: ## Restart production environment
	docker-compose restart

# Build
build: ## Build frontend image
	docker-compose build

build-dev: ## Build development image
	docker-compose -f docker-compose.dev.yml build

build-no-cache: ## Build without cache
	docker-compose build --no-cache

# Management
restart: ## Restart frontend service
	docker-compose restart

logs: ## Show frontend logs
	docker-compose logs -f

shell: ## Access frontend container shell
	docker-compose exec frontend sh

shell-dev: ## Access development container shell
	docker-compose -f docker-compose.dev.yml exec frontend-dev sh

# Health checks
health: ## Check frontend service health
	@echo "Checking frontend service health..."
	@docker-compose ps

status: ## Show container status
	@docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}" --filter "name=bluehooper-frontend"

# Testing
test: ## Run tests in development container
	docker-compose -f docker-compose.dev.yml exec frontend-dev npm test

test-build: ## Test production build
	docker build --target builder -t bluehooper-test .
	docker run --rm bluehooper-test npm run build

lint: ## Run linting in development container
	docker-compose -f docker-compose.dev.yml exec frontend-dev npm run lint

# Cleanup
clean: ## Remove containers and images
	docker-compose down --rmi all
	docker-compose -f docker-compose.dev.yml down --rmi all

clean-volumes: ## Remove all volumes
	docker-compose down --volumes
	docker-compose -f docker-compose.dev.yml down --volumes

clean-all: ## Complete cleanup
	docker-compose down --rmi all --volumes --remove-orphans
	docker-compose -f docker-compose.dev.yml down --rmi all --volumes --remove-orphans
	docker system prune -af

# Deployment helpers
deploy: ## Build and start production environment
	make build && make prod

update: ## Pull latest changes and restart
	@echo "Updating frontend..."
	git pull
	make build-no-cache
	make prod-restart

# Security
security-scan: ## Run security scan on frontend image
	@echo "Running security scan..."
	docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \
		aquasec/trivy image bluehooper-frontend:latest