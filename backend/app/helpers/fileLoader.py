import os
from fastapi import UploadFile  
from pathlib import Path         
import uuid
import logging

logger = logging.getLogger(__name__)

UPLOAD_DIR = Path("data/uploads")
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)


class FileLoader:

    async def save(self, file: UploadFile) -> str:
        if not file.filename:
            raise ValueError("File has no filename")

        ext = Path(file.filename).suffix
        file_id = f"{uuid.uuid4()}{ext}"
        file_path = UPLOAD_DIR / file_id

        try:
            content = await file.read()
            if not content:
                raise ValueError("File content is empty")

            with open(file_path, "wb") as f:
                f.write(content)

            logger.info(f"File saved: {file_path} ({len(content)} bytes)")
            return file_id

        except ValueError:
            raise
        except OSError as e:
            logger.error(f"IO error saving file {file_id}: {e}")
            if file_path.exists():
                file_path.unlink()
            raise OSError(f"Could not write file to disk: {e}")
        except Exception as e:
            logger.error(f"Unexpected error saving file {file_id}: {e}")
            if file_path.exists():
                file_path.unlink()
            raise


    def get_all_files(self):
        files = []
        for f in UPLOAD_DIR.iterdir():
            if f.is_file():
                stat = f.stat()
                files.append({
                    "filename": f.name,
                    "size": stat.st_size,
                    "uploaded_at": stat.st_mtime,
                })
        files.sort(key=lambda x: x["uploaded_at"], reverse=True)
        return files

    def get_file_content(self, filename: str) -> str:
        file_path = UPLOAD_DIR / filename

        if not file_path.exists():
            raise FileNotFoundError(f"File '{filename}' not found")

        if not file_path.resolve().parent == UPLOAD_DIR.resolve():
            raise ValueError("Invalid filename")

        try:
            with open(file_path, "r", encoding="utf-8") as f:
                return f.read()
        except UnicodeDecodeError:
            raise ValueError("File is not a readable text file")
        except OSError as e:
            logger.error(f"Error reading file {filename}: {e}")
            raise OSError(f"Could not read file: {e}")


file_loader = FileLoader()