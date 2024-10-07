import React, { useState, useEffect } from 'react';
import { Handle } from 'react-flow-renderer';
import llmlogo from '../LLMlogo.png';

const LLMEngineNode = ({ id, data }) => {
  const [outputText, setOutputText] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [apiBase, setApiBase] = useState(""); // New state for API base URL
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (data.onOutputChange) {
      data.onOutputChange(outputText);
    }
  }, [outputText, data]);

  const handleOutputButton = async () => {
    
    if (!data.inputValue || data.inputValue === "" || !apiKey || !apiBase)  {
      alert('please fill all ')    
      return;
    }

    // Construct the URL using the user inputs
    const url = `${apiBase}/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

    const headers = {
      'Content-Type': 'application/json',
    };

    const body = {
      contents: [
        {
          parts: [{ text: data.inputValue }],
        },
      ],
    };

    try {
      setLoading(true);
      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const jsonResponse = await response.json();
      const text = jsonResponse.candidates[0]?.content?.parts[0]?.text || "No content returned";
      setOutputText(text);
    } catch (error) {
      setOutputText("An error occurred, please try again.");
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="custom-node-llm">
      <div className='llm-header'>
        <img src={llmlogo} alt='llm logo' />
        <strong>LLM Engine</strong>
      </div>
     
       
        <label>Model Name</label>
        <select>
          <option value="defualt" disabled>Default</option>
          <option value="Gemini">Gemini</option>
        </select>

      <label>Gemini API Base URL</label>
      <input 
        type="text" 
        placeholder="https://generativelanguage.googleapis.com" 
        value={apiBase} 
        onChange={(e) => setApiBase(e.target.value)} 
      />

      <label>Gemini API Key</label>
      <input 
        type="text" 
        placeholder="Insert Gemini OpenAPI key" 
        value={apiKey} 
        onChange={(e) => setApiKey(e.target.value)} 
      />

        <label>Max Tokens</label>
        <input type="number" placeholder="e.g., 1000" />

        <label>Temperature</label>
        <input type="number" step="0.1" min="0" max="1" placeholder="e.g., 0.7" /><br/>

      <button onClick={handleOutputButton} disabled={loading} style={{justifySelf:'right'}}>
        {loading ? 'Loading...' : 'Output'}
      </button>

      <p style={{background:'red', color:'white', fontSize:'14px'}}> Note :- Before Pressing Output button Drag Output node to see Result  </p>

      
      
      <Handle type="target" position="left" />
      <Handle type="source" position="right" />
     
    </div>
  );
};

export default LLMEngineNode;

