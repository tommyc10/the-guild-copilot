from pathlib import Path


def load_document(file_path: str) -> str:
    with open(file_path, "r", encoding="utf-8") as f:
        return f.read()

def load_all_documents(data_dir: str) -> list[str]:
    data_path = Path(data_dir)
    markdown_files = sorted(data_path.glob("*.md"))
    documents = []

    for file_path in markdown_files:
        document_text = load_document(str(file_path))
        documents.append(f"DOCUMENT: {file_path.name}\n\n{document_text}")
    return documents