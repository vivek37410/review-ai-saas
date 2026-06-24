import ollama

def generate_review(business_name, category):
    prompt = f"""
You are a Google review assistant.

Business: {business_name}
Category: {category}

Write a natural, realistic Google review (3-5 lines).
Do NOT mention other industries.
Make it sound human and genuine.
"""

    response = ollama.chat(
        model="llama3",
        messages=[{"role": "user", "content": prompt}]
    )

    return response["message"]["content"]