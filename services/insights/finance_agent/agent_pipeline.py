import pandas as pd
from vertexai.language_models import TextEmbeddingModel

from shared.utils.bigquery_utils import fetch_financial_data
from shared.utils.config import init_vertex_ai
from shared.utils.embedding_utils import generate_batches, encode_texts, compute_query_embedding, find_best_match
from shared.utils.generation_utils import generate_response
from shared.utils.nlp_utils import extract_keywords

class QAPipeline:
    def __init__(self):
        init_vertex_ai()
        self.embedding_model = TextEmbeddingModel.from_pretrained("text-embedding-005")

    def prepare_data(self, keywords):
        df = fetch_financial_data(keywords)
        df = df.head(200)
        all_embeddings = []
        for batch in generate_batches(df.input_text.tolist(), batch_size=5):
            all_embeddings.extend(encode_texts(self.embedding_model, batch))
        df["embeddings"] = all_embeddings
        return df

    def generate_answer(self, query_text):
        keywords = extract_keywords(query_text)
        if not keywords:
            return "No relevant keywords found in query."

        data_df = self.prepare_data(keywords)
        query_embedding = compute_query_embedding(self.embedding_model, query_text)
        index = find_best_match(query_embedding, data_df.embeddings.values)
        context = f"Question: {data_df.input_text[index]}\nAnswer: {data_df.output_text[index]}"
        return generate_response(context, query_text)

qa_pipeline = QAPipeline()
