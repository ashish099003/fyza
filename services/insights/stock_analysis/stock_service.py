import yfinance as yf
from vertexai.generative_models import GenerativeModel

def fetch_stock_summary(symbol: str):
    stock = yf.Ticker(symbol)
    hist = stock.history(period="1mo")
    return hist.tail(5).to_dict()

def compare_stocks(symbols: list[str]):
    result = {}
    for symbol in symbols:
        try:
            result[symbol] = fetch_stock_summary(symbol)
        except Exception as e:
            result[symbol] = f"Error fetching data: {e}"
    return result

def generate_stock_comparison(symbols: list[str]):
    MAX_TOKENS= 1024
    stock_data = compare_stocks(symbols)

    prompt = f"You are finance Expert and need you to provide the very crisk response in 2-3 points. Compare the following stocks for the upcoming week: {symbols}.\nData: {stock_data}"

    model = GenerativeModel("gemini-2.0-flash-lite-001")
    response = model.generate_content(prompt, generation_config={"max_output_tokens": MAX_TOKENS})
    return response.text






