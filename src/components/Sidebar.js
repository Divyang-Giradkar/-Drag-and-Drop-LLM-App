// src/components/Sidebar.js
import React from 'react';
import inputlogo from '../inputlogo.png'
import outputlogo from '../outputlogo.png'
import llmlogo from '../LLMlogo.png'
import threebar from '../barlogo.png'

const Sidebar = () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside>
      <strong > Components </strong>
      <div className="description">Drag and Drop </div>
      <div
        className="dndnode input"
        onDragStart={(event) => onDragStart(event, 'input')}
        draggable
      > <img src={inputlogo} alt='inputlogo'/>
        Input Node<img src={threebar} alt='bars' className='sidemenubar' style={{position:'relative',left:'35px'}}/>
      </div>
      <div
        className="dndnode llmEngine"
        onDragStart={(event) => onDragStart(event, 'llmEngine')}
        draggable
      ><img src = {llmlogo} alt='llm engine'/>
        LLM Engine Node<img src={threebar} alt='bars'className='sidemenubar'/>
      </div>
      <div
        className="dndnode output"
        onDragStart={(event) => onDragStart(event, 'output')}
        draggable
      ><img src={outputlogo} alt='outputlogo'/>
        Output Node<img src={threebar} alt='bars' className='sidemenubar' style={{position:'relative',left:'30px'}}/>
      </div>
    </aside>
  );
};

export default Sidebar;
