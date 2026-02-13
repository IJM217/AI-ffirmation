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

https://aiffirmation.vercel.app/
