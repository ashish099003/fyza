import pandas as pd
from google.cloud import bigquery

from shared.utils.config import authenticate

credentials, PROJECT_ID, _ = authenticate()
bq_client = bigquery.Client(project = PROJECT_ID,
                                credentials = credentials)
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
    df = client_result.result().to_dataframe()
    print(f"Finished job_id: {job_id}")
    return df


def fetch_financial_data(financial_list):
    se_df = pd.DataFrame()
    for fin in financial_list:
        query = f"""
        SELECT title AS input_text, answer_body AS output_text 
        FROM `profound-actor-466504-u7.stackexchange_data.questions` 
        WHERE accepted_answer_id IS NOT NULL 
        AND answer_body IS NOT NULL 
        AND REGEXP_CONTAINS(tags, "{fin}") 
        AND score >= 100;
        """
        language_df = run_bq_query(query)
        language_df["category"] = fin
        se_df = pd.concat([se_df, language_df], ignore_index=True)
    return se_df
