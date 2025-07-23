import numpy as np
import vertexai
from sklearn.decomposition import PCA
from vertexai.language_models import TextEmbeddingModel
from test.vertexai.utils.utils import authenticate
import seaborn as sns
import matplotlib.pyplot as plt
import pandas as pd

def reduce_embedding_wth_pca(embeddings_array, n):
    PCA_model = PCA(n_components=n)
    PCA_model.fit(embeddings_array)
    new_values = PCA_model.transform(embeddings_array)
    return new_values


def visual_embedding():
    in_1 = "Missing flamingo discovered at swimming pool"

    in_2 = "Sea otter spotted on surfboard by beach"

    in_3 = "Baby panda enjoys boat ride"

    in_4 = "Breakfast themed food truck beloved by all!"

    in_5 = "New curry restaurant aims to please!"

    in_6 = "Python developers are wonderful people"

    in_7 = "TypeScript, C++ or Java? All are great!"

    input_text_lst_news = [in_1, in_2, in_3, in_4, in_5, in_6, in_7]
    credentials, PROJECT_ID, REGION = authenticate()

    vertexai.init(project=PROJECT_ID,
                  location=REGION,
                  credentials=credentials)

    embedding_model = TextEmbeddingModel.from_pretrained(
        "text-embedding-005")
    embeddings = []
    for input_text in input_text_lst_news:
        emb = embedding_model.get_embeddings(
            [input_text])[0].values
        embeddings.append(emb)

    embeddings_array = np.array(embeddings)
    print("Shape: " + str(embeddings_array.shape))
    print(embeddings_array)
    new_values = reduce_embedding_wth_pca(embeddings_array,2)
    print("Shape: " + str(new_values.shape))
    print(new_values)
    embedded_df = pd.DataFrame(new_values, columns=('A','B'))
    print(embedded_df)
    embedded_df['element_name'] = input_text_lst_news
    sns.scatterplot(data=embedded_df,x='A', y='B', s=100)
    for i in range(len(embedded_df)):
        x = embedded_df.loc[i, 'A']
        y = embedded_df.loc[i, 'B']
        label = embedded_df.loc[i, 'element_name']
        plt.text(x + 0.01, y + 0.01, label, fontsize=9)

    # Final plot settings
    plt.title("2D PCA of Text Embeddings")
    plt.xlabel("PC 1")
    plt.ylabel("PC 2")
    plt.legend(bbox_to_anchor=(1.05, 1), loc='upper left')
    plt.tight_layout()
    plt.show()
    print("Ashish")


if __name__=='__main__':
    visual_embedding()