from fastapi import UploadFile
from app.helpers.fileLoader import file_loader
from app.helpers.textExtractor import text_extractor
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings
from langchain_qdrant import QdrantVectorStore
from fastapi import BackgroundTasks
from dotenv import load_dotenv
import os
import traceback


load_dotenv()

QDRANT_URL = os.getenv("QDRANT_URL")

print("Qdrant URL:", QDRANT_URL)
# Indexing phase we are handling here:

async def process_and_store(filename: str):
    try:
        print("Processing file:", filename)

        docs = text_extractor.extract(filename)
        print("Total docs:", len(docs))

        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=1000,
            chunk_overlap=200,
            length_function=len,
        )

        chunks = text_splitter.split_documents(docs)
        print("Total chunks:", len(chunks))

        if not chunks:
            print("No chunks created. Skipping Qdrant insert.")
            return

        embedding_model = OpenAIEmbeddings(model="text-embedding-3-small")

        print("Inserting into Qdrant...")

        QdrantVectorStore.from_documents(
            documents=chunks,
            embedding=embedding_model,
            url=QDRANT_URL,
            collection_name="sample_collection",
        )

        print("Stored in Qdrant successfully")

    except Exception:
        print("Qdrant background error:")
        traceback.print_exc()

async def upload_document(file: UploadFile, background_tasks: BackgroundTasks):
    filename = await file_loader.save(file)

    background_tasks.add_task(process_and_store, filename)

    return {"message": "File uploaded. Processing in background."}

async def get_all_documents():
    files = file_loader.get_all_files()
    return files

async def get_document_content(filename: str):
    content = file_loader.get_file_content(filename)
    return {"filename": filename, "content": content}


upload_docs = upload_document