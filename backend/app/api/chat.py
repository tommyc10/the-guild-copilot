from fastapi import APIRouter
from app.models.chat import ChatRequest, ChatResponse, Source


router = APIRouter()

@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    return ChatResponse(
        answer="Renn Dakar's last confirmed sighting was at Drelth Outpost on Standard Date 3287.103, where a biometric scan matched him with 98 percent confidence. His registered ship, the Ashen Comet, departed Drelth Outpost one day later on 3287.104, but the dossier does not prove Dakar was aboard. Later claims about an unregistered shuttle, a second traveler, or movement toward the Threen Concordat border region are unverified and should not be treated as confirmed.",
        sources=[
            Source(
                document_title="Target Dossier: Renn Dakar, The Quiet Knife",
                document_type="Target Dossier",
                reliability="Mixed Reliability",
                section="Biometric Scan Record",
                passage="Scan match confirmed at Drelth Outpost terminal 3, timestamp 3287.103, subject identified as Renn Dakar with 98 percent confidence."
            )
        ]
    )