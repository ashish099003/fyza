import spacy

# Load spaCy English model
nlp = spacy.load("en_core_web_sm")


def extract_keywords(text: str):
    """
    Extract meaningful keywords from user query using spaCy.
    """
    doc = nlp(text.lower())
    keywords = [token.lemma_ for token in doc if token.is_alpha and not token.is_stop]
    return list(set(keywords))  # unique keywords
