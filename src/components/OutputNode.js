import React from 'react';
import { Handle } from 'react-flow-renderer';
import outputlogo from '../outputlogo.png'
const OutputNode = ({ data }) => {
  return (
    <div className="custom-node-output">
      <div className='input-header'> 
      <img src={outputlogo} alt='outpulogo'/>

      <strong style={{fontSize:'0.9rem'}}>OUTPUT</strong>
      </div>
      
      <label>Output</label>
      
      {/* Display the passed outputText in the textarea */}
      <textarea 
        placeholder="Output will appear here" 
        rows={4} 
        value={data.outputText || ''}  // Display outputText if available
        readOnly  // Make it read-only to prevent user editing
        
      />
      <Handle type="target" position="left" />
    </div>
  );
};

export default OutputNode;
