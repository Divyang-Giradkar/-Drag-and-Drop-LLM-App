import React, { useState } from 'react';
import { Handle } from 'react-flow-renderer';
import inputlogo from '../inputlogo.png'

const InputNode = ({ data}) => {
  const [inputValue, setInputValue] = useState(data.value || '');

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    data.onInputChange(newValue); // Notify parent about the change
    console.log("InputNode Data:", newValue); // Log for testing
  };

  
  


  return (
   
    <div className="custom-node-input">
      <div className='input-header'>
      <img src={inputlogo} alt='inputlogo'/>

      <strong>Input</strong>
      </div>
      
      <div className='floatbox-popup'>write the input/question you want to ask</div>
      
      <label><strong>Input</strong> </label>
      <input
        type="text"
        placeholder="Type something here..."
        value={inputValue}
        onChange={handleInputChange}
        required
      />
      <Handle type="source" position="right" />
      <p style={{background:'red',color:'white'}}>Note:-Drag LLM Enginee as well</p>
    </div>
    
  );
};

export default InputNode;



