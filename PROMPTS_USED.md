# Prompts Used

A record of prompts used during development of this application.

---

## 1. Initial Setup

> Build a web app where I can add documents, see list, ask questions, get answers with sources. Make UI only, no logic. Backend and frontend should be in separate folders.

> Use Tailwind CSS

> Just drag functionality should remain, remove all other logic

## 2. Frontend — Document Upload

> Add drag and drop also

> Make handleDrop actually call uploadDocument

## 3. Backend — File Upload

> Fix ModuleNotFoundError (import paths)

> Fix TypeError unhashable dict key

> Add structured response format in documentController (success, statusCode, message, data)

## 4. Frontend — API Error Handling

> Update frontend to extract backend error messages using axios.isAxiosError

## 5. Document Listing

> We have to get all documents we uploaded

> Handle the response format: {success, statusCode, message, data}

> Fix: 18718 · Invalid Date — document format issue

## 6. Document Viewing

> We can view also (view document content in modal)

## 7. Backend — Text Extraction & Indexing

> What do we use for text extractor

> Fix: extracting text from PDF error on .md file (use TextLoader instead of PyPDFLoader)

> Fix: variable shadowing — text_extractor overwritten by RecursiveCharacterTextSplitter


## 8. Retrieval Phase — Q&A

> I have made the retreival phase you just  make the retrieval phase perfect with statusCode.

> Fix: logger.info not printing document and score (use f-strings)

## 9. Architecture Decisions

> Where should we make docker compose file

> For statusCode I should use controller only for production grade application right because i am from javascript background mainly so i should use same as we make in javascript.

> Why __init__.py is used and where we have to use them

> Does one __init__.py in controllers cover subfolders (answer: no, each folder needs its own)

## 10. Final Polish

> Check the whole app — is anything not done per the problem statement
