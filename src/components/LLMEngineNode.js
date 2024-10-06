  // // src/components/LLMEngineNode.js
  // import React, { useState, useEffect } from 'react';
  // import { Handle } from 'react-flow-renderer';
  // import llmlogo from '../LLMlogo.png'

  // const LLMEngineNode = ({ id,data }) => {
  //   const [outputText, setOutputText] = useState("");
  //   const [currentCount, setCurrentCount] = useState(0); 

  

  //   useEffect(() => {
  //     console.log("From button the text is: " + outputText);
  //     if (data.onOutputChange) {
  //       data.onOutputChange(outputText);  // Pass output to parent
  //     }
  //   }, [outputText, data]);

  //   // useEffect(() => {
  //   //   setOutputText("this is output message " + currentCount);
  //   // }, [currentCount]);

  //   const handleOutputButton = async () => {
    
  //     // Just to save our tokens
  //     // setCurrentCount(currentCount+1);
  //     // return;
  //   // };

  //     if(!data.inputValue || data.inputValue == ""){
  //       console.log("From button don't try on empty string as have limited tokens");
  //       return;
  //     }
  //     const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyC7EdJg0pY4CIwkxA-j39dH5P4XJZhx6TA';  // Replace with the actual URL
    
  //     const headers = {
  //       'Content-Type': 'application/json',
  //     };
    
  //     const body = {
  //       contents: [
  //         {
  //           parts: [
  //             {
  //               text: data.inputValue,
  //             },
  //           ],
  //         },
  //       ],
  //     };
    
  //     try {
  //       const response = await fetch(url, {
  //         method: 'POST',
  //         headers: headers,
  //         body: JSON.stringify(body),
  //       });
    
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
    
  //       const jsonResponse = await response.json();
  //       const text = jsonResponse.candidates[0].content.parts[0].text;
  //       setOutputText(text);
  //       console.log('From button response is:', text);
  //       console.log("and output text is: ", outputText);
  //     } catch (error) {
  //       setOutputText("Some internal problem please try again");
  //       console.error('Error:', error);
  //     }
  //   };
    

  //   // console.log("at llm engine data is: ",data.inputValue);
  //   return (
      // <div className="custom-node">
      //   <div className='input-header'>
      //   <img src={llmlogo} alt='llm logo'/>

      //   {/* <p>Input Value from InputNode: {data.inputValue}</p> */}
      //   <strong>LLM Engine</strong>
      //   </div>
      //   <div className='floatbox-popup'>Lorem ipsum sic dolar amet   </div>

      //   <label>Model Name</label>
      //   <select>
      //     <option value="defualt" disabled>Default</option>
      //     <option value="Gemini">Gemini</option>
      //   </select>

  //       <label>Open API Base URL</label>
  //       <input type="text" placeholder="https://api.openai.com/v1/" />

  //       <label>Open API Key</label>
  //       <input type="text" placeholder=" insert Gemini OpenAPI key" />

        // <label>Max Tokens</label>
        // <input type="number" placeholder="e.g., 1000" />

        // <label>Temperature</label>
        // <input type="number" step="0.1" min="0" max="1" placeholder="e.g., 0.7" />

  //       <button onClick={handleOutputButton}  >Output</button>

  //       <Handle type="target" position="left" />
  //       <Handle type="source" position="right" />
  //     </div>
  //   );
  // };

  // export default LLMEngineNode;



  import React, { useState, useEffect } from 'react';
import { Handle } from 'react-flow-renderer';
import llmlogo from '../LLMlogo.png';

import { ShowChart } from '@mui/icons-material';


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
    if (!data.inputValue || data.inputValue === "" || !apiKey || !apiBase) {
      alert('Please fill all feild')
      
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
    <div className="custom-node">
      <div className='input-header'>
        <img src={llmlogo} alt='llm logo' />
        <strong>LLM Engine</strong>
      </div>
     
        <div className='floatbox-popup'>Lorem ipsum sic dolar amet   </div>

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
