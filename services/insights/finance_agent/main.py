from fastapi import FastAPI
from services.insights.finance_agent.routes import router

app = FastAPI(title="Finance Insights Agent")

# Include routes
app.include_router(router)

# Optional health check
@app.get("/health")
def health_check():
    return {"status": "ok"}