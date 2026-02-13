
from fastapi import FastAPI, APIRouter 
from fastapi.middleware.cors import CORSMiddleware  

from app.api.documents import apiRouter as documents_router
from app.api.chat import chatRouter as chat_router
from app.api.health import healthRouter as health_router
 
 
app = FastAPI()

 

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],           
    allow_credentials=True,        
    allow_methods=["*"],           
    allow_headers=["*"],           
)

 
api_router = APIRouter()
 

@app.get("/")
def read_root():
    """
    Simple endpoint to check if server is running.
    
    When you visit http://localhost:8000/ in browser, you'll see:
    {"Hello": "World"}
    
    This proves the server is alive and responding!
    """
    return {"Hello": "World"}

 
api_router.include_router(documents_router)
api_router.include_router(chat_router)
api_router.include_router(health_router)
 
app.include_router(api_router)

 