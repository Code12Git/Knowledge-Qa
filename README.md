# KnowledgeQA — Private Knowledge Q&A

A full-stack web app that lets you upload documents, ask questions, and get AI-generated answers with source citations.

## Features

- **Upload documents** — Drag & drop or click to upload `.txt` / `.md` files
- **View uploaded documents** — See a list of all uploads with file size and date; click to view content
- **Ask questions** — Type a question and get an AI-generated answer from your documents
- **Source citations** — See exactly which document and passage helped generate the answer
- **System health** — Status page showing backend, Qdrant, and OpenAI connectivity
- **Home page** — Clear step-by-step instructions on how to use the app

## Tech Stack

| Layer       | Technology                          |
| ----------- | ----------------------------------- |
| Frontend    | React 19, Vite, TypeScript, Tailwind CSS v4 |
| Backend     | FastAPI (Python 3.13), Uvicorn      |
| Vector DB   | Qdrant (via Docker)                 |
| Embeddings  | OpenAI `text-embedding-3-large`     |
| LLM         | OpenAI `gpt-4o-mini`               |
| Orchestration | LangChain                         |

## How to Run

### Prerequisites

- Node.js 18+
- Python 3.13+
- Docker (for Qdrant)
- OpenAI API key

### 1. Start Qdrant

```bash
cd backend
docker compose up -d
```

### 2. Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

Create a `.env` file in `backend/`:

```
OPENAI_API_KEY=your-openai-api-key
QDRANT_URL=http://localhost:6333
```

Start the server:

```bash
fastapi dev app/main.py
```

Backend runs at `http://localhost:8000`.

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:5173`.

## Project Structure

```
aggroso/
├── backend/
│   ├── app/
│   │   ├── api/              # Route definitions (documents, chat, health)
│   │   ├── controllers/      # Response shaping, HTTP status codes
│   │   ├── services/         # Business logic
│   │   └── helpers/          # File I/O, text extraction, vector search, LLM
│   ├── data/uploads/         # Uploaded files stored here
│   ├── docker-compose.yml    # Qdrant container
│   ├── .env                  # API keys and config
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── api/              # Axios API calls
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/            # Home, Workspace, Status pages
│   │   └── helpers/          # Axios instances
│   └── package.json
├── README.md
├── AI_NOTES.md
├── ABOUTME.md
└── PROMPTS_USED.md
```

## Architecture

```
Upload flow:  File → Save to disk → Extract text → Chunk (1000 chars) → Embed → Store in Qdrant
Query flow:   Question → Embed → Similarity search in Qdrant → Build context → OpenAI LLM → Answer + Sources
```

## What is Done

- ✅ Document upload (click + drag & drop)
- ✅ Document listing with size and date
- ✅ Document content viewer (modal)
- ✅ Text extraction and chunking (LangChain)
- ✅ Vector embedding and storage (Qdrant)
- ✅ Question answering with source citations
- ✅ Structured API responses with error handling
- ✅ Home page with clear steps
- ✅ System status page (backend, DB, LLM health)
- ✅ Input validation (empty questions, empty files, invalid filenames)
- ✅ Loading states and error UI

## What is Not Done

- ❌ Document deletion functionality  
- ❌ PDF file support (currently only .txt and .md supported)  
- ❌ Chat history / conversation memory  
- ❌ User authentication via JWT or OAuth2  
- ❌ Redis queue (Valkey) for handling background jobs  
- ❌ SerpApi integration for fallback  
- ❌ Chain-of-thought prompting technique not used for LLM optimization  
- ❌ File size limits enforcement on frontend  
- ❌ Deployment configuration (production build)  
- ❌ Unit and integration tests
