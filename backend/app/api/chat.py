from pathlib import Path

from fastapi import APIRouter, HTTPException
from app.models.chat import ChatRequest, ChatResponse, Source
from app.services.ai_service import generate_answer
from app.services.document_loader import load_document


router = APIRouter()
DOCUMENT_PATH = Path(__file__).resolve().parents[2] / "data" / "GLD-TD-3287-114_Renn_Dakar.md"

@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    document_text = load_document(str(DOCUMENT_PATH))

    try:
        answer = generate_answer(request.message, document_text)
    except ValueError as exc:
        raise HTTPException(status_code=500, detail=str(exc)) from exc

    return ChatResponse(
        answer=answer,
        sources=[
            Source(
                document_title="Target Dossier: Renn Dakar, The Quiet Knife",
                document_type="Target Dossier",
                reliability="Mixed Reliability",
                section="Full document",
                passage=document_text
            )
        ]
    )
