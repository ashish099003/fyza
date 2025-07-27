from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from services.insights.finance_agent.routes import router
from services.insights.stock_analysis.routes import router as stock_router

app = FastAPI(title="Finance Insights Agent")

# ✅ Add CORS middleware
origins = [
    "http://localhost:5173",  # for local dev
    "https://frontend-ui-kvo42ojzra-uc.a.run.app",  # deployed frontend
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # or ["*"] for testing all origins
    allow_credentials=True,
    allow_methods=["*"],    # Allow all HTTP methods
    allow_headers=["*"],    # Allow all headers
)

# Include routes
app.include_router(router)
app.include_router(stock_router)


# Optional health check
@app.get("/health")
def health_check():
    return {"status": "ok"}