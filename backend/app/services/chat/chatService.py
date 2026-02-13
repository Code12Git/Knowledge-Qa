from app.helpers.chatProcess import ask_question


async def process_question(query: str) -> dict:
    result = ask_question(query)
    return result