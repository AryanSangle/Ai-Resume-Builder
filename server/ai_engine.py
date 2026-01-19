import os
from pathlib import Path
from groq import Groq
from dotenv import load_dotenv

env_path = Path(__file__).parent / ".env"
load_dotenv(dotenv_path=env_path)

client = Groq(api_key=os.environ.get("GROQ_API_KEY"))

def generate_resume_content(data: dict) -> str:
    prompt = f"""
    Generate a professional resume content for {data['full_name']} targeting the role of {data['target_role']}.
    Tone: {data['tone']}.
    
    Details:
    - Skills: {data['skills']}
    - Experience: {data['experience']}
    - Projects: {data['projects']}
    - Education: {data['education']}
    
    Format the output as a clean, structured Markdown string suitable for parsing or direct display. 
    Include sections: Professional Summary, Skills, Experience, Education, Projects.
    Do NOT include any preamble or postscript. Just the resume content.
    """
    
    chat_completion = client.chat.completions.create(
        messages=[
            {"role": "system", "content": "You are an expert professional resume writer."},
            {"role": "user", "content": prompt}
        ],
        model="llama-3.3-70b-versatile",
    )
    return chat_completion.choices[0].message.content

def generate_cover_letter(data: dict) -> str:
    prompt = f"""
    Write a compelling cover letter for {data['full_name']} applying for a {data['target_role']} position.
    Tone: {data['tone']}.
    Highlight these skills: {data['skills']}.
    Keep it professional and concise.
    """
    
    chat_completion = client.chat.completions.create(
        messages=[
            {"role": "system", "content": "You are an expert career coach."},
            {"role": "user", "content": prompt}
        ],
        model="llama-3.3-70b-versatile",
    )
    return chat_completion.choices[0].message.content

def generate_portfolio_bio(data: dict) -> str:
    prompt = f"""
    Create a short, engaging professional bio for a portfolio website for {data['full_name']}, a {data['target_role']}.
    Tone: {data['tone']}.
    Key highlights: {data['skills']}.
    Max 100 words.
    """
    
    chat_completion = client.chat.completions.create(
        messages=[
            {"role": "system", "content": "You are a personal branding expert."},
            {"role": "user", "content": prompt}
        ],
        model="llama-3.3-70b-versatile",
    )
    return chat_completion.choices[0].message.content

def generate_linkedin_content(data: dict) -> dict:
    prompt = f"""
    Generate LinkedIn content for {data['full_name']}, a {data['target_role']}.
    
    Based on:
    - Skills: {data['skills']}
    - Experience: {data['experience']}
    
    Return EXACTLY in this format (no extra text):
    HEADLINE: [A catchy LinkedIn headline, max 120 characters]
    ---
    ABOUT: [A compelling LinkedIn About section, 150-200 words, first person, engaging]
    """
    
    chat_completion = client.chat.completions.create(
        messages=[
            {"role": "system", "content": "You are a LinkedIn profile optimization expert."},
            {"role": "user", "content": prompt}
        ],
        model="llama-3.3-70b-versatile",
    )
    
    content = chat_completion.choices[0].message.content
    
    try:
        parts = content.split("---")
        headline = parts[0].replace("HEADLINE:", "").strip()
        about = parts[1].replace("ABOUT:", "").strip() if len(parts) > 1 else ""
    except:
        headline = f"{data['target_role']} | {data['skills'].split(',')[0]}"
        about = content
    
    return {"headline": headline, "about": about}
