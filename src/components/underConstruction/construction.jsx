import React from 'react'

import construction from "../../assets/images/construction.gif"
function Construction() {
  return (
    <div style={{position: "absolute",left:"15%",width:"84%",
        top: "100px"}}>
        <h1>Progress...</h1>
        <img src={construction} alt="" style={{width:"40%",display:"block",margin:"0 auto"}} />
    </div>
  )
}

export default Construction