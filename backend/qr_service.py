import qrcode

def create_qr(business_id: str):
    url = f"http://localhost:5173/review/{business_id}"

    img = qrcode.make(url)
    path = f"{business_id}.png"
    img.save(path)

    return path