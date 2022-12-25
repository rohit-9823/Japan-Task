import React from 'react'
import "./insertrecord.scss"
import { useHistory } from 'react-router-dom'
import reactlogo from "../../assets/images/react2.gif"
import logos from "../../assets/images/logos.png"
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
            <h2 style={{padding:"20px",textAlign:"center"}} className="brand_name">CLOCO</h2>
            <img src={logos} alt="cloco logo" className='cloco_logo'/>
            <hr/>
            <ul>
            <li className='sidebar_items' onClick={()=>history.push('/insertuser')}><i className=" sidebar_icon fa-solid fa-user"></i><span className='sidebar_text'>User</span></li> 
            <li className='sidebar_items' onClick={()=>history.push('/Dashboard')}><i className=" sidebar_icon fa-brands fa-product-hunt"></i><span className='sidebar_text'>Product</span></li> 
            <li className='sidebar_items' onClick={handleNotFound} > <i className=" sidebar_icon fa-sharp fa-solid fa-gear"></i><span className='sidebar_text'>Settings</span></li>
            <li className='sidebar_items' onClick={()=>history.push('/')}><i className="fa-solid fa-right-from-bracket sidebar_icon sidebar_icon"></i><span className='sidebar_text'> Logout</span></li>
            </ul>
        </div>
        {/* <Insertform/> */}
    </div>
  )
}

export default Outlaydesign
