import { useState, useCallback, useMemo } from "react";
import { Configuration, OpenAIApi } from "openai";
import "./App.css";

function App() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [imgSrc, setImgSrc] = useState("");
  const [placeholder, setPlaceholder] = useState(
    "Search Anything Here .."
  );
  
 

  
  const configuration = useMemo(() => new Configuration({
    apiKey: process.env.API_KEY;;
  }), []);

  const openai = useMemo(() => new OpenAIApi(configuration), [configuration]);

  const generateImage = useCallback(async () => {
    setPlaceholder(`Recent Search: ${prompt}`);
    setImgSrc("")
    setLoading(true);
    const response = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: "512x512",
    });
    
    setImgSrc(response.data.data[0].url);
  }, [prompt, openai]);

  

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
