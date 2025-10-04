import React, { useEffect, useState } from "react";

const ApiTest: React.FC = () => {
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    // Call your Deno server
    fetch("http://localhost:8080") // Deno server URL
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => console.error("Error fetching from backend:", err));
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial", textAlign: "center" }}>
      <h2>Deno Server Message:</h2>
      <p>{message}</p>
    </div>
  );
};

export default ApiTest;
