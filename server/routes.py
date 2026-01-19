from fastapi import APIRouter, HTTPException
from server.schemas import ResumeRequest, GeneratedContent
from server.ai_engine import generate_resume_content, generate_cover_letter, generate_portfolio_bio, generate_linkedin_content
from server.pdf_generator import create_pdf_base64

router = APIRouter()

@router.post("/api/generate", response_model=GeneratedContent)
async def generate_content(request: ResumeRequest):
    try:
        request_data = request.dict()
        
        
        resume_text = generate_resume_content(request_data)
        cover_letter = generate_cover_letter(request_data)
        portfolio_bio = generate_portfolio_bio(request_data)
        linkedin = generate_linkedin_content(request_data)
        
        
        pdf_base64 = create_pdf_base64(
            resume_text=resume_text,
            cover_letter=cover_letter,
            portfolio_bio=portfolio_bio,
            user_name=request.full_name,
            user_email=request.email,
            target_role=request.target_role
        )
        
        return GeneratedContent(
            resume_content=resume_text,
            cover_letter=cover_letter,
            portfolio_bio=portfolio_bio,
            linkedin_headline=linkedin["headline"],
            linkedin_about=linkedin["about"],
            pdf_base64=pdf_base64
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
