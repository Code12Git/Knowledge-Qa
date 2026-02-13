# AI Notes

## What I Used AI For

- **Scaffolding**: Initial project structure (folder layout, boilerplate files)
- **Component generation**: React components (Header, DocumentUpload, DocumentList, QuestionBox, AnswerCard) with Tailwind CSS styling
- **Backend architecture**: Route → Controller → Service → Helper pattern setup
- **Error handling**: Structured response format `{success, statusCode, message, data}` across all endpoints
- **API integration**: Axios API calls with proper error extraction from FastAPI's HTTPException detail format
- **Bug fixing**: Debugging issues like `ModuleNotFoundError` (import paths), `onClick` vs `onChange` on file inputs, variable shadowing (`text_extractor` overwritten by splitter), `logger.info` not printing args
- **LangChain integration**: Text extraction, chunking with `RecursiveCharacterTextSplitter`, Qdrant vector store setup
- **Retrieval pipeline**: Prompt bulding and for proper error handling
- **Health check endpoint**: Async checks for Qdrant and OpenAI connectivity
- **Routing**: React Router setup with Home, Workspace, and Status pages

## What I Checked Myself

- **Architecture decisions**: Chose the controller/service/helper layering; decided where status codes belong
- **File naming and folder structure**: Named folders (`chat`, `documents`, `health`), decided on project layout
- **Manual code edits**: Several manual edits to service files (adding imports, tweaking logic)
- **Retrieval pipeline**: Made retrieval phase functionality like Similarity search with scores, context building, OpenAI prompt engineering
- **Docker setup**: Created `docker-compose.yml` for Qdrant
- **Environment variables**: Set up `.env` with API keys, verified `dotenv` loading
- **Testing**: Manually tested upload flow, document listing, Q&A pipeline, health checks
- **Debugging**: Identified issues like wrong filename (`docker.compose.yml` vs `docker-compose.yml`), missing `__init__.py` files, `await` on non-async constructor

## LLM and Provider

| Component   | Provider | Model                      | Why                                                                                  |
| ----------- | -------- | -------------------------- | ------------------------------------------------------------------------------------ |
| Embeddings  | OpenAI   | `text-embedding-3-large`   | High-quality embeddings with 3072 dimensions; excellent for semantic search accuracy  |
| Chat/Answer | OpenAI   | `gpt-4o-mini`              | Cost-effective, fast, and accurate for grounded Q&A with provided context             |

**Why OpenAI?** Reliable API, excellent documentation, strong performance for RAG (Retrieval-Augmented Generation) use cases. `gpt-4o-mini` strikes the right balance between quality and cost for a knowledge Q&A app.

**Why Qdrant?** Open-source vector database that runs easily via Docker, has a clean Python SDK, and integrates well with LangChain. Good for local development with no cloud dependency.
