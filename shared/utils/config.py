import os
import vertexai
from google.auth import default
from google.oauth2 import service_account

PROJECT_ID = "profound-actor-466504-u7"
REGION = "us-central1"

# Only use service_account.json if explicitly set
SERVICE_ACCOUNT_FILE = os.getenv("GOOGLE_APPLICATION_CREDENTIALS", None)

def authenticate():
    """
    Authenticate using either:
      1. GOOGLE_APPLICATION_CREDENTIALS (local dev), or
      2. Application Default Credentials (Cloud Run).
    """
    credentials = None

    if SERVICE_ACCOUNT_FILE and os.path.exists(SERVICE_ACCOUNT_FILE):
        print(f"🔑 Using local service account file: {SERVICE_ACCOUNT_FILE}")
        credentials = service_account.Credentials.from_service_account_file(
            SERVICE_ACCOUNT_FILE
        )
    else:
        print("🌐 Using Application Default Credentials (Cloud Run).")
        credentials, project_id = default()
        global PROJECT_ID
        if project_id:
            PROJECT_ID = project_id

    print(f"✅ Authenticated to project '{PROJECT_ID}' in region '{REGION}'")
    return credentials, PROJECT_ID, REGION

def init_vertex_ai():
    credentials, project_id, region = authenticate()
    vertexai.init(project=project_id, location=region, credentials=credentials)
    return project_id, region