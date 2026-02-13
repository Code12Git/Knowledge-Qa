from fastapi import HTTPException
from app.services.chat.chatService import process_question


class ChatController:
    async def ask(self, query: str):
        try:
            result = await process_question(query)
            return {
                "success": True,
                "statusCode": 200,
                "message": "Answer generated successfully",
                "data": result
            }
        except ValueError as e:
            raise HTTPException(status_code=400, detail={
                "success": False,
                "statusCode": 400,
                "message": str(e)
            })
        except FileNotFoundError as e:
            raise HTTPException(status_code=404, detail={
                "success": False,
                "statusCode": 404,
                "message": str(e)
            })
        except Exception as e:
            raise HTTPException(status_code=500, detail={
                "success": False,
                "statusCode": 500,
                "message": f"Failed to generate answer: {str(e)}"
            })


chatController = ChatController()
