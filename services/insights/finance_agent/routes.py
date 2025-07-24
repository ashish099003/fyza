
from fastapi import APIRouter, Request

from services.insights.finance_agent.agent_pipeline import qa_pipeline

router = APIRouter()

@router.post("/ask")
async def ask_question(req: Request):
    data = await req.json()
    query = data.get("question", "")
    if not query:
        return {"error": "Question is required."}
    answer = qa_pipeline.generate_answer(query)
    return {"question": query, "answer": answer}
