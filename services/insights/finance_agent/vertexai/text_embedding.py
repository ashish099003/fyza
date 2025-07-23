import string

from test.vertexai.utils.utils import authenticate, remove_stopwords
import vertexai
from vertexai.language_models import TextEmbeddingModel
from sklearn.metrics.pairwise import cosine_similarity
import nltk
import numpy as np

nltk.download('stopwords')
nltk.download('punkt')
nltk.data.path.append("/Users/ashish/nltk_data")


def check_similarity(embedding_model):
    emb_1 = embedding_model.get_embeddings(
        ["What is the meaning of life?"])  # 42!

    emb_2 = embedding_model.get_embeddings(
        ["How does one spend their time well on Earth?"])

    emb_3 = embedding_model.get_embeddings(
        ["Would you like a salad?"])

    vec_1 = [emb_1[0].values]
    vec_2 = [emb_2[0].values]
    vec_3 = [emb_3[0].values]
    print(cosine_similarity(vec_1, vec_2))
    print(cosine_similarity(vec_2, vec_3))
    print(cosine_similarity(vec_1, vec_3))


def average_word_embeddings(embedding_model):
    str_1 = "The kids play in the park."
    str_2 = "The play was for kids in the park."
    str_1_lower = str_1.lower()
    translator = str.maketrans('', '', string.punctuation)
    str_1_remove_punctuation =str_1_lower.translate(translator)
    str_1_stop_words  = remove_stopwords(str_1_remove_punctuation)
    str_2_lower = str_2.lower()
    str_2_remove_punctuation =str_2_lower.translate(translator)
    str_2_stop_words  = remove_stopwords(str_2_remove_punctuation)
    embeddings_1 = [emb.values for emb in embedding_model.get_embeddings(str_1_stop_words)]
    emb_array_1 = np.stack(embeddings_1)
    print(emb_array_1.shape)
    embeddings_2 = [emb.values for emb in embedding_model.get_embeddings(str_2_stop_words)]
    emb_array_2 = np.stack(embeddings_2)
    print(emb_array_2.shape)
    emb_1_mean = emb_array_1.mean(axis=0)
    print(emb_1_mean.shape)
    emb_2_mean = emb_array_2.mean(axis=0)
    print(emb_1_mean[:4])
    print(emb_2_mean[:4])




def driver():
    credentials, PROJECT_ID, REGION= authenticate()

    vertexai.init(project=PROJECT_ID,
                  location=REGION,
                  credentials=credentials)

    embedding_model = TextEmbeddingModel.from_pretrained(
        "text-embedding-005")

    # check_similarity(embedding_model)

    # ->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    # embedding = embedding_model.get_embeddings(
    #     ["life"])
    # vector = embedding[0].values
    # print(f"Length = {len(vector)}")
    # print(vector[:10])
    # embedding = embedding_model.get_embeddings(
    #     ["What is the meaning of life?"])
    # vector = embedding[0].values
    # print(f"Length = {len(vector)}")
    # print(vector[:10])
    average_word_embeddings(embedding_model)



if __name__=='__main__':
    driver()
