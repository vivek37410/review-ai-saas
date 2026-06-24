import React, { useState } from "react";
import axios from "axios";
import API_BASE_URL from "../api";

function BusinessPage() {
  const [businessId, setBusinessId] = useState("");
  const [business, setBusiness] = useState(null);
  const [review, setReview] = useState("");

  // GET BUSINESS
  const fetchBusiness = async () => {
    try {
      const res = await axios.get(
        `${API_BASE_URL}/b/${businessId}`
      );
      setBusiness(res.data);
    } catch (err) {
      console.log(err);
      alert("Business not found");
    }
  };

  // GENERATE REVIEW
  const generateReview = async () => {
    try {
      const res = await axios.post(
        `${API_BASE_URL}/generate-review`,
        {
          business_name: business.name,
          category: business.category
        }
      );

      setReview(res.data.review || res.data);
    } catch (err) {
      console.log(err);
      alert("Error generating review");
    }
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h1>AI Review Generator</h1>

      {/* INPUT */}
      <input
        placeholder="Enter Business ID"
        value={businessId}
        onChange={(e) => setBusinessId(e.target.value)}
        style={{ padding: "10px", width: "300px" }}
      />

      <button onClick={fetchBusiness} style={{ marginLeft: "10px" }}>
        Load Business
      </button>

      {/* BUSINESS INFO */}
      {business && (
        <div style={{ marginTop: "20px" }}>
          <h2>{business.name}</h2>
          <p>Category: {business.category}</p>

          <button onClick={generateReview}>
            Generate AI Review
          </button>
        </div>
      )}

      {/* REVIEW OUTPUT */}
      {review && (
        <div style={{ marginTop: "20px", background: "#f2f2f2", padding: "10px" }}>
          <h3>Generated Review:</h3>
          <p>{review}</p>
        </div>
      )}
    </div>
  );
}

export default BusinessPage;