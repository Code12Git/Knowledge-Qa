import os
import httpx
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()


class HealthController:
    async def check(self):
        backend_status = {"status": "healthy"}

        # Checking Qdrant
        qdrant_url = os.getenv("QDRANT_URL", "http://localhost:6333")
        try:
            async with httpx.AsyncClient(timeout=5) as client:
                res = await client.get(f"{qdrant_url}/collections")
                qdrant_status = {
                    "status": "healthy" if res.status_code == 200 else "unhealthy",
                    "url": qdrant_url,
                }
        except Exception as e:
            qdrant_status = {"status": "unhealthy", "url": qdrant_url, "error": str(e)}

        # Checking OpenAI
        api_key = os.getenv("OPENAI_API_KEY")
        if api_key:
            try:
                client = OpenAI(api_key=api_key)
                client.models.list()
                llm_status = {"status": "healthy", "provider": "OpenAI", "model": "gpt-4o-mini"}
            except Exception as e:
                llm_status = {"status": "unhealthy", "provider": "OpenAI", "error": str(e)}
        else:
            llm_status = {"status": "unhealthy", "provider": "OpenAI", "error": "API key not configured"}

        overall = "healthy" if (
            backend_status["status"] == "healthy"
            and qdrant_status["status"] == "healthy"
            and llm_status["status"] == "healthy"
        ) else "degraded"

        return {
            "success": True,
            "statusCode": 200,
            "message": "Health check completed",
            "data": {
                "overall": overall,
                "backend": backend_status,
                "database": qdrant_status,
                "llm": llm_status,
            }
        }


healthController = HealthController()
