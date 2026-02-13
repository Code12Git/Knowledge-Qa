from fastapi import APIRouter
from app.controllers.health.healthController import healthController

healthRouter = APIRouter(prefix="/health", tags=["health"])


@healthRouter.get("/")
async def get_health():
    return await healthController.check()
