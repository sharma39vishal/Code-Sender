import React from 'react'

export default function Header(props) {
  return (
    <div>
      <br/>
         <h1 style={{textAlign:"center"}}><i onClick={()=>{props.setx(1-props.x);}} className="fa fa-solid fa-fire"></i> Code Sender</h1>
    </div>
  )
}
