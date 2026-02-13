import os
import google.generativeai as genai
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI()

# CORS Configuration 
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Gemini API Configuration
API_KEY = os.getenv("GEMINI_API_KEY")
if not API_KEY:
    print("WARNING: GEMINI_API_KEY not found in environment variables.")

try:
    genai.configure(api_key=API_KEY)
    model = genai.GenerativeModel('gemini-2.0-flash')
except Exception as e:
    print(f"Error configuring Gemini API: {e}")

class AffirmationRequest(BaseModel):
    name: str
    feeling: str

class AffirmationResponse(BaseModel):
    affirmation: str

@app.post("/api/affirmation", response_model=AffirmationResponse)
async def generate_affirmation(request: AffirmationRequest):
    if not request.name or not request.feeling:
        raise HTTPException(status_code=400, detail="Name and feeling are required.")
    
    if not API_KEY:
        raise HTTPException(status_code=500, detail="Server configuration error: API Key missing.")

    try:
        # Construct the prompt
        prompt = (
            f"Generate a short, empathetic, non-clinical therapeutic affirmation for {request.name} "
            f"who is feeling {request.feeling}. "
            "Keep it under 4 sentences. "
            "Do NOT provide medical advice or diagnosis. "
            "If the feeling indicates self-harm, providing a safe, supportive message encouraging professional help."
        )

        # Call Gemini API
        response = model.generate_content(prompt)
        
        if not response.text:
             raise HTTPException(status_code=502, detail="Received empty response from AI.")

        return AffirmationResponse(affirmation=response.text)

    except Exception as e:
        print(f"Error generating affirmation: {e}")
        # generic error message for user, log details
        raise HTTPException(status_code=502, detail="Failed to generate affirmation. Please try again later.")

@app.get("/")
def read_root():
    return {"message": "Affirmation API is running"}
