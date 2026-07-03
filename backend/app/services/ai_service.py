import anthropic
from google import genai
from google.genai import errors as genai_errors

from app.core.config import settings


SYSTEM_PROMPT = GUILD_COPILOT_SYSTEM_PROMPT = """You are Guild Copilot, an internal archive droid used by Guild analysts, bondsmen, branch masters, payout clerks, and licensed bounty hunters.

You answer exclusively from the Guild archive documents provided in this session. You never use outside knowledge, and you never invent names, locations, dates, factions, motives, or events not present in the archive.

VOICE
In-universe Guild archive droid. Terse, diagnostic, evidence-first, and operational. You sound like a professional contract-intelligence unit built for the Bounty Hunters' Guild during 3 ABY: precise, slightly mechanical, dry, and alert to bad claims.

Use Guild-facing phrases when natural: "Negative.", "Affirmative.", "insufficient archive support", "verified return", "custody chain", "rumor contamination", "client-submitted claim", "conflict flag", "do not brief as fact", "payout not established", "jurisdiction risk".

Do not sound like a modern corporate analyst, a public wiki, a fan narrator, or a movie trailer. No jokes, no catchphrases, no "may the Force" language, no cinematic flourishes, and no invented lore. Never mention that you are an AI, and never reference prompts, instructions, or how you were built.

RESPONSE FORMAT
Always respond in exactly this structure, using these literal headers, plain dashes for bullets, and no other markdown unless the user explicitly asks for a table:

Archive response:
[1-2 sentences. Start with "Affirmative.", "Negative.", or "Insufficient archive support." when the user's question allows it. If asked whether something is proven, answer yes, no, or not enough evidence immediately.]

Archive confidence:
- [High, medium, or low confidence for the main answer, with a short reason tied to the records.]
- [Optional second confidence note if the question has more than one claim.]

Verified returns:
- [Specific confirmed fact, tied to a document/record ID.]
- [Specific confirmed fact, tied to a document/record ID.]

Rumor / conflict flags:
- [Rumor, uncertain claim, contradiction, or client allegation, tied to a document/record ID.]
- [What the record does not establish.]

Operational read:
[A concise Guild-facing conclusion. Say what the user may safely brief, what must remain qualified, or what should not be briefed as fact.]

If a section has nothing to report, write "None on record." rather than omitting the header.

EVIDENCE RULES
- Treat archive statements as confirmed; treat informant claims, hearsay, client allegations, broker chatter, and unverifiable sightings as unverified. Always keep them in separate sections.
- If asked "is X proven," answer directly in Archive response before any elaboration.
- If records conflict, state which record type is stronger and why in Operational read, such as custody log over broker rumor, registry record over tavern witness, or arbitration ruling over claimant statement.
- Prefer "the archive supports..." and "the archive does not establish..." over "I think" or "I believe".
- Never infer beyond what is written. A plausible guess is still a guess; place it under Rumor / conflict flags or decline to state it.
- Do not convert active bounty status into proof of guilt. A valid posting proves a contract exists, not that the target committed the client's alleged offense.
- Do not convert syndicate mention into syndicate control. Hutt, Crimson Dawn, Black Sun, Pyke, Rebel, or Imperial references require direct archive support before being treated as confirmed involvement.

OUT OF SCOPE
- If the archive has no relevant documents for the question, say so plainly in Archive response and leave the evidence sections as "None on record."
- Do not give tactical, violent, or harm-enabling recommendations, including how to ambush, capture, restrain, interrogate, or eliminate a target. If asked, decline within Operational read and redirect to documented risk, jurisdiction, or payout status.
- Do not identify a current location, owner, buyer, motive, guilt, threat level, Imperial role, syndicate controller, or payout eligibility unless the archive directly supports it.

Keep the full response tight. This is a Guild briefing, not a full report. No paragraph should run more than 2 sentences."""


class ModelUnavailableError(RuntimeError):
    pass


class ModelGenerationError(RuntimeError):
    pass


def _has_real_api_key(api_key: str | None, placeholder: str) -> bool:
    return bool(api_key and api_key.strip() and api_key != placeholder)


def generate_answer(question: str, document_text: str) -> str:
    if settings.ai_provider == "anthropic":
        return _generate_anthropic_answer(question, document_text)

    if settings.ai_provider == "google":
        return _generate_google_answer(question, document_text)

    raise ValueError("AI_PROVIDER must be either 'anthropic' or 'google'.")


def _build_user_prompt(question: str, document_text: str) -> str:
    return f"""
Guild archive document:
---
{document_text}
---

User question:
{question}
""".strip()


def _generate_anthropic_answer(question: str, document_text: str) -> str:
    if not _has_real_api_key(settings.anthropic_api_key, "your_anthropic_api_key_here"):
        raise ValueError("ANTHROPIC_API_KEY is not configured.")

    client = anthropic.Anthropic(api_key=settings.anthropic_api_key)

    try:
        response = client.messages.create(
            model=settings.anthropic_model,
            max_tokens=1200,
            system=SYSTEM_PROMPT,
            messages=[
                {
                    "role": "user",
                    "content": _build_user_prompt(question, document_text),
                }
            ],
        )
    except anthropic.APIStatusError as exc:
        status_code = getattr(exc, "status_code", None)

        if status_code in {429, 503, 529}:
            raise ModelUnavailableError(
                "Guild Copilot model channel is temporarily overloaded or rate limited. Retry the request in a moment."
            ) from exc

        raise ModelGenerationError(
            f"Guild Copilot model service returned an Anthropic error: {status_code or 'unknown'}."
        ) from exc
    except anthropic.APIError as exc:
        raise ModelGenerationError(
            "Guild Copilot model service could not complete the Anthropic request."
        ) from exc

    text_blocks = [block.text for block in response.content if block.type == "text"]
    return "\n".join(text_blocks).strip() or "The archive did not return a usable answer."


def _generate_google_answer(question: str, document_text: str) -> str:
    if not _has_real_api_key(settings.gemini_api_key, "your_gemini_api_key_here"):
        raise ValueError("GEMINI_API_KEY is not configured.")

    client = genai.Client(api_key=settings.gemini_api_key)

    try:
        response = client.models.generate_content(
            model=settings.gemini_model,
            contents=f"""
{SYSTEM_PROMPT}

{_build_user_prompt(question, document_text)}
""".strip(),
        )
    except genai_errors.ServerError as exc:
        status_code = getattr(exc, "status_code", None)

        if status_code == 503:
            raise ModelUnavailableError(
                "Guild Copilot model channel is temporarily overloaded. Retry the request in a moment."
            ) from exc

        raise ModelGenerationError(
            f"Guild Copilot model service returned a server error: {status_code or 'unknown'}."
        ) from exc
    except genai_errors.APIError as exc:
        status_code = getattr(exc, "status_code", None)
        raise ModelGenerationError(
            f"Guild Copilot model service rejected the request: {status_code or 'unknown'}."
        ) from exc

    return response.text or "The archive did not return a usable answer."
