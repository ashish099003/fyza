import numpy as np
import pandas as pd
import vertexai

from vertexai.generative_models import GenerativeModel
from vertexai.language_models import TextEmbeddingModel
from vertexai.language_models import TextGenerationModel
from sklearn.metrics.pairwise import cosine_similarity

from test.vertexai.big_query_stack_exchange import run_bq_query
from test.vertexai.utils.utils import authenticate

def generate_financial_dataframe_bg_query(financial_list):
    se_df = pd.DataFrame()

    for fin in financial_list:
        print(f"generating {fin} dataframe")

        query = f"""
        SELECT  title AS input_text, answer_body AS output_text FROM `profound-actor-466504-u7.stackexchange_data.questions` WHERE accepted_answer_id IS NOT NULL AND answer_body is not null AND REGEXP_CONTAINS(tags,"{fin}") AND score >= 100 ;
        """

        language_df = run_bq_query(query)
        language_df["category"] = fin
        se_df = pd.concat([se_df, language_df],
                          ignore_index=True)

    return se_df


def generate_batches(sentences, batch_size = 5):
    for i in range(0, len(sentences), batch_size):
        yield sentences[i : i + batch_size]


def encode_texts_to_embeddings(model, sentences):
    try:
        embeddings = model.get_embeddings(sentences)
        return [embedding.values for embedding in embeddings]

    except Exception:
        return [None for _ in range(len(sentences))]


def driver():
    credentials, PROJECT_ID, REGION = authenticate()
    vertexai.init(project=PROJECT_ID, location=REGION, credentials=credentials)

    financial_list = ['fraud', 'trading', 'stocks', 'markets', 'insurance']
    se_df = generate_financial_dataframe_bg_query(financial_list)
    se_df = se_df.head(200)  # ensure match with embeddings
    input_texts = se_df.input_text.tolist()

    embedding_model = TextEmbeddingModel.from_pretrained("text-embedding-005")
    all_embeddings = []

    for batch in generate_batches(input_texts, batch_size=5):
        all_embeddings.extend(encode_texts_to_embeddings(embedding_model, batch))

    se_df["embeddings"] = all_embeddings

    query_text = "How to make money in stock market"
    query_embedding = embedding_model.get_embeddings([query_text])[0].values

    cos_sim_array = cosine_similarity([query_embedding], list(se_df.embeddings.values))
    index_doc_cosine = np.argmax(cos_sim_array)

    context = f"Question: {se_df.input_text[index_doc_cosine]}\nAnswer: {se_df.output_text[index_doc_cosine]}"

    prompt = f"""Here is the context: {context}

Using the relevant information from the context,
provide an answer to the query: "{query_text}".

If the context doesn't provide any relevant information,
answer with:
[I couldn't find a good match in the document database for your query]
"""

    model = GenerativeModel("gemini-2.0-flash-lite-001")
    response = model.generate_content(prompt)
    # model = TextGenerationModel.from_pretrained("text-bison-32k")
    # response = model.predict("best movie of 2025", temperature=0.3, max_output_tokens=512)
    print(response.text)
    # t_value = 0.2
    # response = generation_model.predict(prompt="best movie of 2025",temperature = t_value, max_output_tokens = 1024)


if __name__=='__main__':
    driver()