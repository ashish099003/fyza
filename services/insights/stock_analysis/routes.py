from fastapi import APIRouter
from shared.schemas.stock_schemas import CompareStocksRequest
from services.insights.stock_analysis.stock_service import generate_stock_comparison

router = APIRouter(prefix="/stocks", tags=["Stock Analysis"])

@router.post("/compare")
async def compare_stocks_api(request: CompareStocksRequest):
    answer = generate_stock_comparison(request.symbols)
    return {"query": request.symbols, "analysis": answer}

@router.get("/health")
def health():
    return {"status": "ok"}
