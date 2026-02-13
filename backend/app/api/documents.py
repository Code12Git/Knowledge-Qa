from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from app.controllers.documents.documentController import documentController

apiRouter = APIRouter(prefix="/documents", tags=["documents"])


@apiRouter.post("/upload")
async def upload_document(file: UploadFile = File(...)):
    return await documentController.upload(file)


@apiRouter.get("/")
async def get_all_documents():
    return await documentController.get_all()


@apiRouter.get("/{filename}")
async def get_document_content(filename: str):
    return await documentController.get_content(filename)

upload = apiRouter