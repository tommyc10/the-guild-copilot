from pydantic import BaseModel

class ChatRequest(BaseModel):
    message: str

class Source(BaseModel):
    document_title: str
    document_type: str
    reliability: str
    section: str
    passage: str

class ChatResponse(BaseModel):
    answer: str
    sources: list[Source]

