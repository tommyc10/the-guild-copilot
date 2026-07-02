from pathlib import Path

from fastapi import APIRouter, HTTPException
from app.models.chat import ChatRequest, ChatResponse, Source
from app.services.ai_service import generate_answer
from app.services.document_loader import load_all_documents


router = APIRouter()
DATA_DIR = Path(__file__).resolve().parents[2] / "data"


@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    documents = load_all_documents(str(DATA_DIR))
    document_text = "\n\n---\n\n".join(documents)

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
