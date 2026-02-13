from fastapi import APIRouter
from pydantic import BaseModel
from app.controllers.chat.chatController import chatController


class QuestionRequest(BaseModel):
    question: str


chatRouter = APIRouter(prefix="/chat", tags=["chat"])


@chatRouter.post("/ask")
async def ask_question(body: QuestionRequest):
    return await chatController.ask(body.question)
