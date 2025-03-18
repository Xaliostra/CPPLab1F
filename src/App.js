import React, { useState } from "react";

const backendUrl = "https://CPPLab1.azurewebsites.net";  // Укажите URL вашего бэкенда в Azure

function App() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!image) {
      alert("Please upload an image first.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await fetch(`${backendUrl}/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      alert("An error occurred while processing the image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Food Recognizer</h1>
      <input type="file" onChange={handleImageUpload} />
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Processing..." : "Analyze"}
      </button>

      {result && (
        <div>
          <h2>Ingredients:</h2>
          <ul>
            {result.ingredients.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <h2>Recipe:</h2>
          <p>{result.recipe}</p>
        </div>
      )}
    </div>
  );
}

export default App;
