import { useState, useCallback, useMemo } from "react";

import "./App.css";

function App() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [imgSrc, setImgSrc] = useState("");
  const [placeholder, setPlaceholder] = useState(
    "Search Anything Here .."
  );
  
  const API_KEY = "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"
 
  
  console.log(API_KEY)

  async function myFetch(prompt, configuration) {
    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        prompt: prompt,
        n: 1,
        size: "512x512",
      }),
    });
    const json = await response.json();
    if (!response.ok) {
      throw new Error(json.error.message);
    }
    return json.data[0].url;
  }

  const generateImage = useCallback(async () => {
    setPlaceholder(`Recent Search: ${prompt}`);
    setImgSrc("")
    setLoading(true);
    try {
      const url = await myFetch(prompt, configuration);
      setImgSrc(url);
    } catch (error) {
      console.error(error);
    }
  }, [prompt, configuration]);

  return (
    <div className="app-main">
      <div className="rightside-section">
        {loading ? (
          <h2>Generating..Please Wait..</h2>
        ) : (
          <div className="textarea-container">
            <h2>Generate an Image using Open AI API</h2>
            <textarea
              className="app-input"
              placeholder={placeholder}
              onChange={(e) => setPrompt(e.target.value)}
              rows="10"
              cols="40"
            />
            <button onClick={generateImage} >Generate an Image</button>
          </div>
        )}
      </div>
      <div className="leftside-section">
        {imgSrc && (
          <img
            className="result-image"
            src={imgSrc}
            alt="result"
            onLoad={() => setLoading(false)}
          />
        )}
      </div>
    </div>
  );
}

export default App;
