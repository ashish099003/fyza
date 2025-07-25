from fastapi import FastAPI
from services.insights.finance_agent.routes import router
from services.insights.stock_analysis.routes import router as stock_router

app = FastAPI(title="Finance Insights Agent")

# Include routes
app.include_router(router)
app.include_router(stock_router)


# Optional health check
@app.get("/health")
def health_check():
    return {"status": "ok"}