import React, { useState } from "react";

const backendUrl = "https://my-food-recognizer-backend.azurewebsites.net";

function App() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);

  const handleImageUpload = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("image", image);

    const response = await fetch(`${backendUrl}/upload`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    setResult(data);
  };

  return (
    <div>
      <h1>Food Recognizer</h1>
      <input type="file" onChange={handleImageUpload} />
      <button onClick={handleSubmit}>Analyze</button>

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
