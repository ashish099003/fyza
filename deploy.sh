#!/bin/bash

# === CONFIGURATION ===
PROJECT_ID="profound-actor-466504-u7"
REGION="us-central1"
SERVICE_NAME="finance-agent-api"
REPO_NAME="finance-agent-repo"
IMAGE_NAME="finance-agent-api"
TAG="latest"

# === CHECK PREREQUISITES ===
echo "🚀 Starting deployment..."

if ! command -v gcloud &> /dev/null
then
    echo "❌ gcloud CLI not found. Install it first."
    exit 1
fi

if ! command -v docker &> /dev/null
then
    echo "❌ Docker not found. Install it first."
    exit 1
fi

# === AUTHENTICATE GCP ===
echo "🔑 Authenticating with GCP..."
gcloud config set project $PROJECT_ID
gcloud auth configure-docker $REGION-docker.pkg.dev -q

# === ENABLE REQUIRED SERVICES ===
echo "⚙️ Enabling required GCP services..."
gcloud services enable artifactregistry.googleapis.com run.googleapis.com

# === BUILD DOCKER IMAGE ===
echo "🐳 Building Docker image..."
docker build -t $IMAGE_NAME:$TAG .

# === CREATE ARTIFACT REPO IF NEEDED ===
if ! gcloud artifacts repositories describe $REPO_NAME --location=$REGION &> /dev/null
then
    echo "📦 Creating Artifact Registry repository: $REPO_NAME"
    gcloud artifacts repositories create $REPO_NAME \
        --repository-format=docker \
        --location=$REGION \
        --description="Docker repo for Finance Agent API"
else
    echo "✅ Artifact Registry repository $REPO_NAME exists."
fi

# === TAG AND PUSH IMAGE ===
REMOTE_IMAGE="$REGION-docker.pkg.dev/$PROJECT_ID/$REPO_NAME/$IMAGE_NAME:$TAG"
echo "📤 Tagging and pushing image: $REMOTE_IMAGE"
docker tag $IMAGE_NAME:$TAG $REMOTE_IMAGE
docker push $REMOTE_IMAGE

# === DEPLOY TO CLOUD RUN ===
echo "🚀 Deploying to Cloud Run..."
gcloud run deploy $SERVICE_NAME \
    --image $REMOTE_IMAGE \
    --platform managed \
    --region $REGION \
    --allow-unauthenticated \
    --port 8080

# === GET DEPLOYED URL ===
SERVICE_URL=$(gcloud run services describe $SERVICE_NAME --region $REGION --format "value(status.url)")
echo "✅ Deployment complete!"
echo "🌍 Service URL: $SERVICE_URL"
echo "Swagger UI: $SERVICE_URL/docs"
