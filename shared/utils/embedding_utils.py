from vertexai.language_models import TextEmbeddingModel
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

def generate_batches(sentences, batch_size=5):
    for i in range(0, len(sentences), batch_size):
        yield sentences[i : i + batch_size]

def encode_texts(model, sentences):
    try:
        embeddings = model.get_embeddings(sentences)
        return [embedding.values for embedding in embeddings]
    except Exception:
        return [None for _ in range(len(sentences))]

def compute_query_embedding(model, query_text):
    return model.get_embeddings([query_text])[0].values

def find_best_match(query_embedding, embeddings):
    cos_sim_array = cosine_similarity([query_embedding], list(embeddings))
    return np.argmax(cos_sim_array)
