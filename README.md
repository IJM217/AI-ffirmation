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

```bash
# Windows
py -m venv venv
.\venv\Scripts\activate

# Mac/Linux
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

### Backend (Railway)

1.  Create a new project on [Railway](https://railway.app/).
2.  Connect your GitHub repository.
3.  Select the `backend` directory as the root directory (if monorepo) or ensure the build command points there.
4.  Set the start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
5.  **Important**: Add `GEMINI_API_KEY` in the Railway service variables.

### Frontend (Vercel)

1.  Import the repository into [Vercel](https://vercel.com).
2.  Set the `Root Directory` to `frontend`.
3.  Add the Environment Variable `VITE_API_URL` set to your deployed Backend URL (e.g., `https://web-production-xxxx.up.railway.app`).
4.  Deploy.
