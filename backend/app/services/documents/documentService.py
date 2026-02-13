from fastapi import UploadFile
from app.helpers.fileLoader import file_loader
from app.helpers.textExtractor import text_extractor
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings
from langchain_qdrant import QdrantVectorStore
from dotenv import load_dotenv
import os

load_dotenv()

QDRANT_URL = os.getenv("QDRANT_URL")


# Indexing phase we are handling here:
async def upload_document(file: UploadFile):
    filename = await file_loader.save(file)
    docs = text_extractor.extract(filename)
    print("Docs",docs)
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=200,
        length_function=len
    )
    print("Text Splitter Created",text_splitter)
    chunks = text_splitter.split_documents(documents=docs)
    print("Chunks",chunks)
    embedding_model = OpenAIEmbeddings(model="text-embedding-3-large")
    print("Embedding model created",embedding_model)
    QdrantVectorStore.from_documents(
        documents=chunks,
        embedding=embedding_model,
        url=QDRANT_URL,
        collection_name="sample_collection", 
    )
    print(f"Extracted {len(docs)} pages, {len(chunks)} chunks from {filename}")
    return {"filename": filename}

async def get_all_documents():
    files = file_loader.get_all_files()
    return files

async def get_document_content(filename: str):
    content = file_loader.get_file_content(filename)
    return {"filename": filename, "content": content}


upload_docs = upload_document