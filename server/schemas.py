from pydantic import BaseModel, EmailStr
from typing import Optional

class ResumeRequest(BaseModel):
    full_name: str
    email: EmailStr
    phone: Optional[str] = None
    skills: str
    projects: str
    education: str
    experience: str
    target_role: str
    tone: str = "Professional"
    job_description: Optional[str] = None

class GeneratedContent(BaseModel):
    resume_content: str
    cover_letter: str
    portfolio_bio: str
    linkedin_headline: str
    linkedin_about: str
    pdf_base64: str
