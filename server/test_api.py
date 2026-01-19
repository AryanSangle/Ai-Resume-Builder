import requests

data = {
    "full_name": "Alex Johnson",
    "email": "alex@example.com",
    "skills": "Python, React",
    "projects": "Test Project",
    "education": "Test University",
    "experience": "5 years",
    "target_role": "Developer",
    "tone": "Professional"
}

try:
    resp = requests.post("http://localhost:8000/api/generate", json=data, timeout=60)
    print(f"Status: {resp.status_code}")
    print(resp.text[:500] if len(resp.text) > 500 else resp.text)
except Exception as e:
    print(f"Error: {e}")
