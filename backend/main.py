from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware   
from db import get_businesses, get_business_by_id, create_business
from ai_service import generate_review

app = FastAPI()

# -----------------------------
# CORS SETUP (PUT HERE)
# -----------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # later you can replace with your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------
# MODELS (REQUEST BODY)
# -----------------------------

class BusinessCreate(BaseModel):
    user_id: str
    name: str
    category: str


class ReviewRequest(BaseModel):
    business_name: str
    category: str


# -----------------------------
# HEALTH CHECK
# -----------------------------
@app.get("/")
def home():
    return {"message": "Review AI SaaS Backend Running 🚀"}


# -----------------------------
# CREATE BUSINESS
# -----------------------------
@app.post("/create-business")
def add_business(data: BusinessCreate):

    business = create_business(
        data.user_id,
        data.name,
        data.category
    )

    if not business.data:
        raise HTTPException(status_code=400, detail="Business creation failed")

    return {
        "message": "Business created successfully",
        "business": business.data[0]
    }


# -----------------------------
# GET ALL BUSINESSES
# -----------------------------
@app.get("/businesses")
def list_businesses():
    return get_businesses().data


# -----------------------------
# QR LANDING PAGE (CORE ROUTE)
# -----------------------------
@app.get("/b/{business_id}")
def business_page(business_id: str):

    result = get_business_by_id(business_id)

    if not result.data:
        raise HTTPException(status_code=404, detail="Business not found")

    business = result.data[0]

    return {
        "id": business["id"],
        "name": business["name"],
        "category": business["category"],
        "logo": business.get("logo"),
        "theme": business.get("theme"),
        "qr_url": business.get("qr_url")
    }


# -----------------------------
# AI REVIEW GENERATOR
# -----------------------------
@app.post("/generate-review")
def review(req: ReviewRequest):

    review_text = generate_review(
        req.business_name,
        req.category
    )

    return {
        "review": review_text
    }