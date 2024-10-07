// src/App.js
import React, { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import WorkflowArea from './components/WorkflowArea';
import Nav from './components/Nav';
function App() {

  const [inputData,setInputData]=useState('')  // modify

  return (
    <div>
    <Nav/>

     <div className="dndflow">
      <Sidebar/>
      <WorkflowArea inputData={inputData} setInputData={setInputData}  />  
     </div>
    </div>
  );
}

export default App;
