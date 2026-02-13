from pathlib import Path
 
from langchain_community.document_loaders import TextLoader


PROJECT_ROOT = Path(__file__).resolve().parents[2]
UPLOADS_DIR = PROJECT_ROOT / "data" / "uploads"

print("Uploads Directory:", UPLOADS_DIR)

 
class TextExtractor:
    """
    Extract text content from uploaded files (.txt, .md, .text).
    """
    
    def extract(self, filename: str):

        file_path = UPLOADS_DIR / filename

        print("Extracting text from:", file_path)

        if not file_path.exists():
            raise FileNotFoundError(f"File not found: {file_path}")

        loader = TextLoader(str(file_path))

        docs = loader.load()

        print("Number of pages extracted:", len(docs))

        return docs


 
text_extractor = TextExtractor()
