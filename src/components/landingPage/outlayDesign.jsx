import React from 'react'
import "./insertrecord.scss"
import { useHistory } from 'react-router-dom'
import reactlogo from "../../assets/images/react2.gif"
import Insertform from './insertForm'
function Outlaydesign() {
    let history=useHistory()
    const handleNotFound=()=>{
        history.push('./Construction')
    }
  return (
    <div>
        <nav className='navbars'>
            <img src={reactlogo} alt="Logo" className='navbar_logo' /> 
            <a className="navbar_item" href="./Dashboard">Home</a>
            <a className="navbar_item"  onClick={handleNotFound} >About</a>
            <a className="navbar_item"  onClick={handleNotFound}  >Service</a>
        </nav>
        <div className="sidebar">
            <h2 style={{padding:"20px",textAlign:"center"}}>CLOCO</h2>
            <hr/>
            <ul>
            <li className='sidebar_items' onClick={()=>history.push('/Dashboard')}><i className=" sidebar_icon fa-solid fa-plus" ></i>Add Record</li> 
            <li className='sidebar_items' onClick={handleNotFound} > <i className=" sidebar_icon fa-sharp fa-solid fa-gear"></i>Settings</li>
            <li className='sidebar_items' onClick={()=>history.push('/')}><i class="fa-solid fa-right-from-bracket sidebar_icon"></i> Logout</li>
            </ul>
        </div>
        {/* <Insertform/> */}
    </div>
  )
}

export default Outlaydesign
