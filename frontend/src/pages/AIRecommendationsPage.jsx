import { useEffect, useState } from "react";
import axios from "axios";

function AIRecommendationsPage() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/recommendations/student/3");
        setRecommendations(res.data.recommendations || []);
      } catch (err) {
        console.error("Axios error:", err.response || err);
        setError("Failed to load recommendations.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  if (loading) return <p>Loading recommendations...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>AI Recommendations</h1>
      <p>Based on your farm data, here are recommended actions:</p>
      <ul>
        {recommendations.map((rec, index) => (
          <li key={index}>
            <h3>{rec.title}</h3>
            <p>{rec.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AIRecommendationsPage;
