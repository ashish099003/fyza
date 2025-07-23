from google.cloud import bigquery
from google.oauth2 import service_account
import requests
import time

# CONFIG
PROJECT_ID = 'profound-actor-466504-u7'
DATASET_ID = 'stackexchange_data'
TABLE_ID = 'questions'
BQ_TABLE = f"{PROJECT_ID}.{DATASET_ID}.{TABLE_ID}"
NUM_PAGES = 10

SERVICE_ACCOUNT_FILE = "/Users/ashish/PycharmProjects/pythonTest/test/vertexai/resources/service_account.json"

# Create credentials and BigQuery client
credentials = service_account.Credentials.from_service_account_file(
    SERVICE_ACCOUNT_FILE
)
client = bigquery.Client(credentials=credentials, project=credentials.project_id)

def fetch_questions(page):
    response = requests.get(
        "https://api.stackexchange.com/2.3/questions",
        params={
            "order": "desc",
            "sort": "votes",
            "site": "money",
            "pagesize": 100,
            "page": page,
            "filter": "!9_bDE(fI5"
        }
    )
    return response.json().get("items", [])

def fetch_answer(answer_id):
    response = requests.get(
        f"https://api.stackexchange.com/2.3/answers/{answer_id}",
        params={"site": "money", "filter": "withbody"}
    )
    items = response.json().get("items", [])
    return items[0]["body"] if items else ""

def send_to_bigquery(rows):
    errors = client.insert_rows_json(BQ_TABLE, rows)
    if errors:
        print("BigQuery insert errors:", errors)
    else:
        print(f"Inserted {len(rows)} rows to BigQuery")

def main():
    for page in range(1, NUM_PAGES + 1):
        print(f"Fetching page {page}")
        questions = fetch_questions(page)
        rows = []
        for q in questions:
            answer_body = ""
            if 'accepted_answer_id' in q:
                try:
                    answer_body = fetch_answer(q["accepted_answer_id"])
                    time.sleep(0.5)
                except:
                    pass

            rows.append({
                "question_id": q["question_id"],
                "title": q["title"],
                "question_body": q.get("body", ""),
                "tags": ", ".join(q.get("tags", [])),
                "score": q["score"],
                "question_link": q["link"],
                "accepted_answer_id": q.get("accepted_answer_id"),
                "answer_body": answer_body
            })
        send_to_bigquery(rows)
        time.sleep(1)


def run_bq_query(sql):

    # Create BQ client
    bq_client = bigquery.Client(project = PROJECT_ID,
                                credentials = credentials)

    # Try dry run before executing query to catch any errors
    job_config = bigquery.QueryJobConfig(dry_run=True,
                                         use_query_cache=False)
    bq_client.query(sql, job_config=job_config)

    # If dry run succeeds without errors, proceed to run query
    job_config = bigquery.QueryJobConfig()
    client_result = bq_client.query(sql,
                                    job_config=job_config)

    job_id = client_result.job_id

    # Wait for query/job to finish running. then get & return data frame
    df = client_result.result().to_arrow().to_pandas()
    print(f"Finished job_id: {job_id}")
    return df

if __name__ == "__main__":
    main()
