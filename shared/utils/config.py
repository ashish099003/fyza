import os

import vertexai
from google.oauth2 import service_account

SERVICE_ACCOUNT_FILE = os.getenv(
    "GOOGLE_APPLICATION_CREDENTIALS",
    os.path.join(os.getcwd(), "shared/utils/service_account.json")
)
PROJECT_ID = "profound-actor-466504-u7"
REGION = "us-central1"

def authenticate():
    """
    Authenticate using the service account and initialize Vertex AI.
    Returns:
        credentials: The loaded service account credentials
        project_id: The GCP project ID
    """
    if not os.path.exists(SERVICE_ACCOUNT_FILE):
        raise FileNotFoundError(f"Service account file not found at: {SERVICE_ACCOUNT_FILE}")

    credentials = service_account.Credentials.from_service_account_file(
        SERVICE_ACCOUNT_FILE
    )


    print(f"✅ Authenticated and initialized Vertex AI for project '{PROJECT_ID}' in region '{REGION}'")
    return credentials, PROJECT_ID, REGION

def init_vertex_ai():
    credentials, PROJECT_ID, REGION = authenticate()
    vertexai.init(project=PROJECT_ID, location=REGION, credentials=credentials)
    return PROJECT_ID, REGION
