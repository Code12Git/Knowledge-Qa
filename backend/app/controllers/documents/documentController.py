from fastapi import HTTPException
from app.services.documents.documentService import upload_docs, get_all_documents, get_document_content
from fastapi import BackgroundTasks

    
class DocumentController:
    # For uploading Purpose
    async def upload(self, file, background_tasks: BackgroundTasks):
        try:
            result = await upload_docs(file,background_tasks)
            return {
                "success": True,
                "statusCode": 200,
                "message": "Document uploaded successfully",
                "data": result
            }
        except ValueError as e:
            raise HTTPException(status_code=400, detail={
                "success": False,
                "statusCode": 400,
                "message": str(e)
            })
        except OSError as e:
            raise HTTPException(status_code=500, detail={
                "success": False,
                "statusCode": 500,
                "message": f"File system error: {str(e)}"
            })
        except Exception as e:
            raise HTTPException(status_code=500, detail={
                "success": False,
                "statusCode": 500,
                "message": f"Unexpected error: {str(e)}"
            })

    # For listing all documents
    async def get_all(self):
        try:
            documents = await get_all_documents()
            return {
                "success": True,
                "statusCode": 200,
                "message": "Documents retrieved successfully",
                "data": documents
            }
        except Exception as e:
            raise HTTPException(status_code=500, detail={
                "success": False,
                "statusCode": 500,
                "message": f"Failed to retrieve documents: {str(e)}"
            })

    # For getting content of a specific document
    async def get_content(self, filename: str):
        try:
            result = await get_document_content(filename)
            return {
                "success": True,
                "statusCode": 200,
                "message": "Document content retrieved successfully",
                "data": result
            }
        except FileNotFoundError as e:
            raise HTTPException(status_code=404, detail={
                "success": False,
                "statusCode": 404,
                "message": str(e)
            })
        except ValueError as e:
            raise HTTPException(status_code=400, detail={
                "success": False,
                "statusCode": 400,
                "message": str(e)
            })
        except OSError as e:
            raise HTTPException(status_code=500, detail={
                "success": False,
                "statusCode": 500,
                "message": f"File system error: {str(e)}"
            })
        except Exception as e:
            raise HTTPException(status_code=500, detail={
                "success": False,
                "statusCode": 500,
                "message": f"Unexpected error: {str(e)}"
            })

documentController = DocumentController()