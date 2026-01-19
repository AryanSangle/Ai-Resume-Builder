# AI Resume Builder

A powerful full-stack application that leverages advanced AI (Groq) to craft professional resumes, cover letters, and LinkedIn profiles tailored to your specific career goals.

![Project Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

## 🌟 Features

*   **AI-Powered Content Generation**: Instantly generate professional summaries, work experience descriptions, and skills lists using the Groq AI engine.
*   **Comprehensive Career Suite**: Creates more than just a resume – get a matching cover letter, portfolio bio, and optimized LinkedIn headline & about section.
*   **Real-time Preview**: Visualize your resume as you build it.
*   **PDF Export**: Download your polished resume as a high-quality PDF.
*   **Modern UI**: Clean, responsive, and user-friendly interface built with React and Tailwind CSS.

## 🛠️ Tech Stack

**Frontend:**
*   React (Vite) for a fast and interactive UI.
*   Tailwind CSS for modern, responsive styling.
*   Axios for API communication.
*   Lucide React for consistent iconography.

**Backend:**
*   Python FastAPI for a high-performance API.
*   Groq API for state-of-the-art text generation.
*   ReportLab for server-side PDF generation.
*   Mangum for Vercel serverless deployment compatibility.

## 🚀 Getting Started

Follow these instructions to set up the project locally on your machine.

### Prerequisites

*   [Node.js](https://nodejs.org/) (v16+ recommended)
*   [Python](https://www.python.org/) (v3.8+)
*   A [Groq API Key](https://console.groq.com/)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd ai-resume-builder
    ```

2.  **Backend Setup:**
    
    Navigate to the root directory (or `server` directory depending on your preference, but the root `requirements.txt` covers the Vercel deployment needs, while `server/requirements.txt` is for local dev).

    ```bash
    # Create a virtual environment
    python -m venv venv
    
    # Activate the virtual environment
    # On Windows:
    .\venv\Scripts\activate
    # On macOS/Linux:
    source venv/bin/activate
    
    # Install dependencies
    pip install -r server/requirements.txt
    ```

    **Configuration:**
    Create a `.env` file in the `server` directory (or wherever you run the app from) and add your Groq API key:
    ```env
    GROQ_API_KEY=your_groq_api_key_here
    ```

3.  **Frontend Setup:**

    Open a new terminal and navigate to the `client` directory:
    ```bash
    cd client
    
    # Install dependencies
    npm install
    ```

### 🏃‍♂️ Running the Application

You need to run both the backend and frontend servers.

**1. Start the Backend Server:**

From the project root (ensure your virtual environment is activated):
```bash
uvicorn server.main:app --reload
```
The API will be available at `http://localhost:8000`.
You can check the health status at `http://localhost:8000/api/health`.

**2. Start the Frontend Client:**

From the `client` directory:
```bash
npm run dev
```
The application will usually run at `http://localhost:5173`.

## 📝 Usage

1.  Open your browser and navigate to the frontend URL (e.g., `http://localhost:5173`).
2.  Click on **"Build Your Resume"** or **"Get Started"**.
3.  Fill in your personal details, experience, education, and target role in the form.
4.  Click **"Generate Assets"**.
5.  Wait for the AI to process your information.
6.  You will be redirected to the **Preview Page** where you can see:
    *   Your professional resume.
    *   A tailored cover letter.
    *   LinkedIn profile optimization suggestions.
    *   A portfolio bio.
7.  Click **"Download PDF"** to save your resume.

## 📂 Project Structure

```
Ai Resume Builder/
├── api/                # Vercel serverless function entry points
├── client/             # Frontend React application
│   ├── src/
│   │   ├── components/ # Reusable UI components (InputForm, etc.)
│   │   ├── pages/      # Route pages (Home, ResumeForm, PreviewPage)
│   │   └── services/   # API client (axios setup)
│   └── ...
├── server/             # Backend logic
│   ├── ai_engine.py    # AI generation logic (Groq)
│   ├── pdf_generator.py# PDF creation logic (ReportLab)
│   ├── routes.py       # API endpoints
│   ├── main.py         # App initialization
│   └── ...
└── ...
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT Logic](LICENSE).
