# Affirmation App

A full-stack application that generates therapeutic affirmations using Google's Gemini API. Built with React (Vite) and FastAPI.

## Project Structure

- `frontend/`: React application.
- `backend/`: FastAPI application.

## Prerequisites

- Node.js (v18+)
- Python (v3.9+)
- A Google Gemini API Key.

## Local Development

### 1. Backend Setup

Navigate to the `backend` directory:

```bash
cd backend
```

Create a virtual environment and activate it:

Windows
```bash
py -m venv venv
.\venv\Scripts\activate
```
Mac/Linux
```bash
python3 -m venv venv
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

**Edit `.env` and add your `GEMINI_API_KEY`.**

Run the backend server:

```bash
uvicorn main:app --reload --port 8080
```

The API will be available at `http://localhost:8080`.

### 2. Frontend Setup

Open a new terminal and navigate to the `frontend` directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

## Deployment

- live app --> https://aiffirmation.vercel.app/
- backend docs --> https://ai-ffirmation-backend-production.up.railway.app/docs

### Deployment Guide
1. Backend Deployment (Railway)
Create Project:

- Log in to Railway and select "New Project" > "Deploy from GitHub repo".

- Select your repository.

Environment Variables:

- Go to the Variables tab.

- Add GEMINI_API_KEY with your Google API key value.

Public URL:

- Go to Settings > Networking > Public Networking.

- Click "Generate Domain" to get your backend URL (e.g., https://your-app.up.railway.app).

2. Frontend Deployment (Vercel)
Create Project:

- Log in to Vercel and click "Add New..." > "Project".

- Import your repository.

Build Settings:

- Framework Preset: Select "Vite" (Vercel usually auto-detects this).

- Root Directory: Leave empty change if necessary

Environment Variables:

- Go to Settings > Environment Variables.

- Add VITE_API_URL with your Railway backend URL (ensure it starts with https:// and has no trailing slash).
