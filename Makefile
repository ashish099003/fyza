# Configuration
PROJECT_ID = profound-actor-466504-u7
REGION = us-central1
SERVICE_NAME = finance-agent-api
REPO_NAME = finance-agent-repo
IMAGE_NAME = finance-agent-api
TAG = latest
REMOTE_IMAGE = $(REGION)-docker.pkg.dev/$(PROJECT_ID)/$(REPO_NAME)/$(IMAGE_NAME):$(TAG)

.PHONY: all build push deploy clean

# === Default Target ===
all: build push deploy

# === Build Docker Image ===
build:
	@echo "🐳 Building Docker image..."
	docker build -t $(IMAGE_NAME):$(TAG) .

# === Push Docker Image to Artifact Registry ===
push:
	@echo "📤 Tagging and pushing image: $(REMOTE_IMAGE)"
	docker tag $(IMAGE_NAME):$(TAG) $(REMOTE_IMAGE)
	docker push $(REMOTE_IMAGE)

# === Deploy to Cloud Run ===
deploy:
	@echo "🚀 Deploying to Cloud Run..."
	gcloud run deploy $(SERVICE_NAME) \
		--image $(REMOTE_IMAGE) \
		--platform managed \
		--region $(REGION) \
		--allow-unauthenticated \
		--port 8080
	@echo "🌍 Service URL: $$(gcloud run services describe $(SERVICE_NAME) --region $(REGION) --format 'value(status.url)')"

# === Full Workflow ===
release: build push deploy

# === Clean Local Docker Image ===
clean:
	@echo "🧹 Removing local Docker image..."
	docker rmi $(IMAGE_NAME):$(TAG) || true
