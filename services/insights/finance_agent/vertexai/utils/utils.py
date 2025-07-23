import os
from google.oauth2 import service_account
import vertexai
import nltk
from nltk import word_tokenize
from nltk.corpus import stopwords

nltk.download('stopwords')
nltk.download('punkt')
nltk.data.path.append("/Users/ashish/nltk_data")

SERVICE_ACCOUNT_FILE = "/Users/ashish/PycharmProjects/pythonTest/test/vertexai/resources/service_account.json"
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


def remove_stopwords(text, language='english'):
    stop_words = set(stopwords.words(language))
    words = word_tokenize(text)
    filtered_words = [word for word in words if word.lower() not in stop_words]
    return filtered_words
