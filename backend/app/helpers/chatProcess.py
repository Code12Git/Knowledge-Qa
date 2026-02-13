from langchain_qdrant import QdrantVectorStore
from langchain_openai import OpenAIEmbeddings
from dotenv import load_dotenv
from openai import OpenAI
import os
import logging

load_dotenv()

logger = logging.getLogger(__name__)

openai_client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
QDRANT_URL = os.getenv("QDRANT_URL")


def get_vector_store():
    embedding_model = OpenAIEmbeddings(model="text-embedding-3-small")
    return QdrantVectorStore.from_existing_collection(
        collection_name="sample_collection",
        embedding=embedding_model,
        url=QDRANT_URL,
    )


def retrieve_chunks(query: str, k: int = 5):
    """Search Qdrant for relevant chunks and return them with metadata."""
    vector_db = get_vector_store()
    results = vector_db.similarity_search_with_score(query, k=k)
    logger.info(f"Raw search results: {results}")
    sources = []
    for doc, score in results:
        logger.info(f"Document: {doc}, Score: {score}")
        sources.append({
            "content": doc.page_content,
            "source": doc.metadata.get("source", "Unknown"),
            "score": round(float(score), 4),
        })
    print("Sources",sources)
    return sources


def generate_answer(query: str, sources: list[dict]) -> str:
    """Send query + retrieved context to OpenAI and get an answer."""
    context = "\n\n---\n\n".join(
        [
            f"Source: {s['source']}\nContent: {s['content']}"
            for s in sources
        ]
    )

    system_prompt = f"""You are a helpful AI assistant that answers questions based ONLY on the provided context from uploaded documents.

Rules:
- Answer based strictly on the context below.
- If the context doesn't contain enough information, say so clearly.
- Reference which source document the information came from.
- Be concise and accurate.

Context:
{context}
"""

    response = openai_client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": query},
        ],
        temperature=0.3,
    )

    return response.choices[0].message.content


def ask_question(query: str) -> dict:
    """Full retrieval pipeline: search → build context → generate answer."""
    if not query or not query.strip():
        raise ValueError("Question cannot be empty")

    logger.info(f"Processing question: {query}")

    sources = retrieve_chunks(query)

    if not sources:
        return {
            "answer": "No relevant documents found. Please upload documents first.",
            "sources": [],
        }

    answer = generate_answer(query, sources)

    top_source = sources[0]

    return {
        "answer": answer,
        "sources": [top_source],
    }