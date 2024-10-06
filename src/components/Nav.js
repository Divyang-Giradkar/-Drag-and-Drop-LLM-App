import React from 'react'
import logo from '../logo.png'
import run from '../run.png'
import './Nav.css'

function Nav() {
  return (
    
      <nav className='navbar'>
        <div className='nav-left'>
            <img src={logo} className='nav-logo'/>
            <span className='logo-text'> OpenAGI</span>
        </div>
        
        <div className='nav-right'>
            <button className='nav-deploy'>Deploy</button>
            
            <button className='nav-runbutton'><img src={run}/>Run</button>
        </div>
        

      </nav>
    
    
  )
}

export default Nav

