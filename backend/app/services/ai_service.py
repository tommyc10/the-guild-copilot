from google import genai

from app.core.config import settings


SYSTEM_PROMPT = """
You are The Guild Copilot, a bounty intelligence assistant.

Answer only from the provided Guild archive document.
Do not use outside knowledge.
Do not invent names, locations, motives, dates, factions, or events.
Separate confirmed facts from unverified or conflicting reports.
If the document does not contain enough evidence, say so clearly.
Keep the answer concise and operational.
"""


def generate_answer(question: str, document_text: str) -> str:
    if not settings.gemini_api_key:
        raise ValueError("GEMINI_API_KEY is not configured.")

    client = genai.Client(api_key=settings.gemini_api_key)

    response = client.models.generate_content(
        model=settings.gemini_model,
        contents=f"""
{SYSTEM_PROMPT}

Guild archive document:
---
{document_text}
---

User question:
{question}
""".strip(),
    )

    return response.text or "The archive did not return a usable answer."
