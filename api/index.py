from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from .routes import router
import os

app = FastAPI(title="AI Resume Builder API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# API Routes
app.include_router(router, prefix="/api")

@app.get("/health")
def health_check():
    return {"status": "ok"}

# Serve React App
# Mount assets
if os.path.exists("client/dist/assets"):
    app.mount("/assets", StaticFiles(directory="client/dist/assets"), name="assets")

# Catch-all for SPA
@app.exception_handler(404)
async def custom_404_handler(_, __):
    if os.path.exists("client/dist/index.html"):
        return FileResponse("client/dist/index.html")
    return {"error": "Frontend not found"}

@app.get("/{full_path:path}")
async def catch_all(full_path: str):
    # If it matches an API route, it's already handled above
    # Otherwise serve index.html
    if os.path.exists("client/dist/index.html"):
        return FileResponse("client/dist/index.html")
    return {"error": "Frontend not found"}

