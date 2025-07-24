from fastapi import APIRouter
from services.insights.finance_agent.agent_pipeline import qa_pipeline
from shared.schemas.question_schema import QuestionRequest, AnswerResponse

router = APIRouter()


@router.post("/ask", response_model=AnswerResponse)
async def ask_question(request: QuestionRequest):
    answer = qa_pipeline.generate_answer(request.question)
    return AnswerResponse(question=request.question, answer=answer)


@router.get("/health")
def health_check():
    return {"status": "ok"}


@router.get("/")
def home():
    return {"message": "Finance Agent API is running!"}
