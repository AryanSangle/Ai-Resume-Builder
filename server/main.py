from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

from fastapi.staticfiles import StaticFiles
from server.routes import router


load_dotenv()

app = FastAPI(title="AI Resume Builder API")


os.makedirs("static", exist_ok=True)
app.mount("/static", StaticFiles(directory="static"), name="static")


origins = [
    "http://localhost:5173", 
    "http://localhost:5174", 
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)

@app.get("/")
async def root():
    return {"message": "AI Resume Builder API is running"}

@app.get("/api/health")
async def health_check():
    return {"status": "healthy"}
