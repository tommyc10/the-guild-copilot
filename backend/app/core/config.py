import os

from dotenv import load_dotenv

load_dotenv()


class Settings:
    ai_provider: str = os.getenv("AI_PROVIDER", "google").strip().lower()
    gemini_api_key: str | None = os.getenv("GEMINI_API_KEY")
    gemini_model: str = os.getenv("GEMINI_MODEL", "gemini-2.5-flash")
    anthropic_api_key: str | None = os.getenv("ANTHROPIC_API_KEY")
    anthropic_model: str = os.getenv("ANTHROPIC_MODEL", "claude-sonnet-5")


settings = Settings()
