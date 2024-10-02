import React from 'react'
import MainContainer from './component/MainContainer'
import SideBarContainer from './component/SideBarContainer'
import './App.css'



function App() {
  return (
    <div className='container'  >
      <MainContainer/>
      <div style={{width:"100%",height:"100vh"}}>
      <SideBarContainer/>
      </div>
    </div>
  )
}

export default App
