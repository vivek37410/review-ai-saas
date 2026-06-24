import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function BusinessPage() {
  const { id } = useParams();
  const [business, setBusiness] = useState(null);
  const [review, setReview] = useState("");

  useEffect(() => {
    fetchBusiness();
  }, []);

  const fetchBusiness = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/b/${id}`);
      setBusiness(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const generateReview = async () => {
    try {
      const res = await axios.post("http://localhost:8000/generate-review", {
        business_name: business.name,
        category: business.category
      });

      setReview(res.data.review);
    } catch (err) {
      console.log(err);
    }
  };

  const copyText = () => {
    navigator.clipboard.writeText(review);
    alert("Copied to clipboard!");
  };

  if (!business) return <h2>Loading...</h2>;

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      
      <img
        src={business.logo || "https://via.placeholder.com/100"}
        style={{ width: 100, borderRadius: "50%" }}
      />

      <h1>{business.name}</h1>
      <p>{business.category}</p>

      <button onClick={generateReview}>
        Generate AI Review
      </button>

      {review && (
        <div style={{ marginTop: 20 }}>
          <textarea
            value={review}
            rows="6"
            style={{ width: "100%" }}
          />

          <br />

          <button onClick={copyText}>
            Copy Review
          </button>
        </div>
      )}
    </div>
  );
}

export default BusinessPage;