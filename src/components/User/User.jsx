import React, { useEffect, useState } from 'react'

export default function User(props) {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
 
const [title ,setTitle] = useState('');
const [username ,setUsername] = useState('');
const [code ,setCode] = useState('');

const inputsHandler = (e) =>{
    setTitle(e.target.value)
}
const inputsHandler1 = (e) =>{
  setUsername(e.target.value)
}
const inputsHandler2 = (e) =>{
  setCode(e.target.value)
}

const deletecode = (e) =>{
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title:e})
};
fetch('/deletecode', requestOptions)
    .then(response => response.json())
window.location.reload();
}


const submitButton = () =>{
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title:title, username:username,code:code})
};
fetch('/addcode', requestOptions)
    .then(response => response.json())
  window.location.reload();
  }

  useEffect(() => {
    fetch("/getcodes")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])


  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {

  return (
    <div className='container'>
        <hr/>
        <h3 style={{textAlign:"center"}}>Let's Share Some Codes To Our Friend's</h3>


{/* card box */}
{items.map(item => (
   <div key={item.id}>     
<br/>
<div style={{color:"black"}}>
  <div className="card">
  
  <div className="card-body">
    
  <div className="card-title row">
    <h4 className='col' style={{textAlign:"left"}}>{item.title}</h4> 
    <h6 className='col' style={{textAlign:"right"}}><i className="fa fa-user" style={{backgroundColor:"gray", color:"white", padding:"5px",borderRadius:"25px"}} aria-hidden="true"></i> {item.username}</h6>
  </div>
    <p className="card-text" style={{whiteSpace:"pre"}}>{item.code}</p>
    <div className="card-title ">
      {/* {console.log(props.x)} */}
    {props.x===1 ? <div  style={{textAlign:"right"}}><button className="fa fa-trash" onClick={()=>{deletecode(item.title)}} style={{backgroundColor:"red", color:"white", padding:"6px",borderRadius:"25px"}} aria-hidden="true"></button></div>:<></>}
  </div>
  </div>

</div>
</div>
</div>
))}
<br/>


<div style={{padding:"6px", borderColor:"white",borderStyle:"solid", borderRadius:"8px"}}>
<div className="mb-3 row mx-2 my-2" >
  <label htmlFor="exampleFormControlInput1" style={{textAlign:"right"}}  className="form-label col" >Title : </label>
  <input type="text" className="form-control col" id="exampleFormControlInput1" name="title" placeholder="CPP || Triangle Pattern"  onChange={inputsHandler}   value={title}/>

  <label htmlFor="exampleFormControlInput1" style={{textAlign:"right"}} className="form-label col">Username : </label>
  <input type="text" className="form-control col" id="exampleFormControlInput1" placeholder="Vishal39" name="username" onChange={inputsHandler1}   value={username}/>
</div>
<div className="mb-3 mx-2 my-2">
  <label htmlFor="exampleFormControlTextarea1" style={{textAlign:"center"}} className="form-label">Your Code</label>
  <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" onChange={inputsHandler2}  name="code"  value={code}></textarea>
</div>
<div style={{textAlign:"right"}}>
<button type="submit" onClick={()=>{submitButton()}} class="btn btn-primary mb-3 mx-4" >Submit</button>
</div>
</div>
    </div>
  )
}
}