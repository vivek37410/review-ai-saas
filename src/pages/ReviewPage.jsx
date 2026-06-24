import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ReviewPage() {

  const { business_id } = useParams();

  const [business, setBusiness] = useState(null);
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/business/${business_id}`)
      .then(res => res.json())
      .then(data => setBusiness(data));
  }, [business_id]);


  const generateReview = async () => {

    setLoading(true);
    setReview("");

    const res = await fetch("http://127.0.0.1:8000/generate-review", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        business_id,
        rating,
        selected: [text]
      })
    });

    const data = await res.json();

    setReview(data.review);
    setLoading(false);
  };


  if (!business) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>

      <h1>{business.name}</h1>

      <div>
        {[1,2,3,4,5].map(star => (
          <span
            key={star}
            onClick={() => setRating(star)}
            style={{ fontSize: "30px", cursor: "pointer",
              color: star <= rating ? "gold" : "gray"
            }}
          >
            ★
          </span>
        ))}
      </div>

      <input
        placeholder="What did you like?"
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ width: "100%", padding: "10px" }}
      />

      <button onClick={generateReview} disabled={loading}>
        {loading ? "Generating..." : "Generate Review"}
      </button>

      <p>{review}</p>

    </div>
  );
}

export default ReviewPage;
