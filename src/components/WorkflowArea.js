import React, { useCallback, useState } from 'react';
import ReactFlow, { addEdge, useNodesState, useEdgesState, Controls ,Background} from 'react-flow-renderer';
import InputNode from './InputNode';
import LLMEngineNode from './LLMEngineNode';
import OutputNode from './OutputNode';

const nodeTypes = {
  input: InputNode,
  llmEngine: LLMEngineNode,
  output: OutputNode,
};

const WorkflowArea = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [inputValue, setInputValue] = useState('');  // State for input value
  const [outputText, setOutputText] = useState('');  // State to hold output text


  // Function to update the inputValue in nodes
  const handleInputChange = (newInputValue) => {
    setInputValue(newInputValue);

    // Find and update the node that is of type 'llmEngine'
    setNodes((nds) =>
      nds.map((node) => {
        if (node.type === 'llmEngine') {
          // Update the data for the LLMEngineNode
          return {
            ...node,
            data: {
              ...node.data,
              inputValue: newInputValue, // Pass the updated input value
            },
          };
        }
        return node;
      })
    );
  };
  

  // Function to update the outputText in nodes
  const handleOutputChange = (newOutputText) => {
    setOutputText(newOutputText);

    // Update the OutputNode with the new output text
    setNodes((nds) =>
      nds.map((node) => {
        if (node.type === 'output') {
          return {
            ...node,
            data: {
              ...node.data,
              outputText: newOutputText,  // Pass the updated output text
            },
          };
        }
        return node;
      })
    );
  };

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);



  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = event.target.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');
      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const newNode = {
        id: (nodes.length + 1).toString(),
        type,
        position,
        data: {
          label: `${type.charAt(0).toUpperCase() + type.slice(1)} Node`,
          onInputChange: handleInputChange,    // Pass input handler to InputNode
          inputValue,                          // Pass the input value to LLMEngineNode
          onOutputChange: handleOutputChange,  // Pass the output handler to LLMEngineNode
          outputText,                          // Pass the output text to OutputNode

        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes, nodes, inputValue, outputText]
  );

  return (
    <div className="reactflow-wrapper">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={setReactFlowInstance}
        onDrop={onDrop}
        onDragOver={onDragOver}
        nodeTypes={nodeTypes}
        fitView
      >
        
        <Controls />
        <Background color='##002A3C1A' variant='dots' 
        />

      </ReactFlow>
    </div>
  );
};

export default WorkflowArea;


