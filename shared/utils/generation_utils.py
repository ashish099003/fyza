from vertexai.generative_models import GenerativeModel

def generate_response(context, query_text):
    prompt = f"""
    Here is the context: {context}

    Using the relevant information from the context,
    provide an answer to the query: "{query_text}".

    If the context doesn't provide any relevant information,
    answer with:
    [I couldn't find a good match in the document database for your query]
    """
    model = GenerativeModel("gemini-2.0-flash-lite-001")
    response = model.generate_content(prompt)
    return response.text
