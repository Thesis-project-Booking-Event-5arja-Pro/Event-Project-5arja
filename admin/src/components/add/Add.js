import React,{useState} from 'react';
import {link , useNavigate} from 'react-router-dom';
import axios from 'axios';
import "./add.css"

const Add = () => {

 const [addEvent,setAddEvent]=useState({
    eventName: "",
    img: "",
    video: "",
    description:"",
    lineUp:"",
    date: "",
    price: "",
    grade: "",
    category:"" ,
    latitude: "", 
    longitude: "",
 });
 const navigate=useNavigate()
    
 const handleClick = async (e) => {
  e.preventDefault();
  try {
    await axios.post("http://localhost:5002/api/event/addevent", addEvent);
    navigate("/dashboard/products");
    
  } catch (err) {
    console.log(err);
  
  }
};




  return (
    <div className="forme">
      <ul>
      <h1 className='h1'>Add</h1>
      
      <input 
      type='text'
      label='Name'
      onChange={(e)=>{
        setAddEvent((prev)=>({...prev,eventName:e.target.value}))
      }}
      placeholder='Enter name'
      />
      <textarea
       className='textarea'
        rows={5}
        type="text"
        placeholder="Enter Description"
        name="Description"
        onChange={(e)=>{
          setAddEvent((prev)=>({...prev,description:e.target.value}))
        }}
      />
      
      <input 
      className='input'
      type='number'
      label='Price'
      onChange={(e)=>{
        setAddEvent((prev)=>({...prev,price:e.target.value}))
      }}
      placeholder='Enter Price'
      />
      <input 
      className='input'
      type='text'
      label='image'
      onChange={(e)=>{
        setAddEvent((prev)=>({...prev,img:e.target.value}))
      }}
      placeholder='Enter Image'
      />
      <input 
      className='input'
      type='text'
      label='Category'
      onChange={(e)=>{
        setAddEvent((prev)=>({...prev,category:e.target.value}))
      }}
      placeholder='Enter Categoey'
      />
      <input 
      className='input'
      type='text'
      label='Grade'
      onChange={(e)=>{
        setAddEvent((prev)=>({...prev,grade:e.target.value}))
      }}
      placeholder='Enter Grade'
      />
         <input 
      className='input'
      type='text'
      label='date'
      onChange={(e)=>{
        setAddEvent((prev)=>({...prev,date:e.target.value}))
      }}
      placeholder='Enter Date '
      />  
       <input 
      className='input'
      type='text'
      label='video'
      onChange={(e)=>{
        setAddEvent((prev)=>({...prev,video:e.target.value}))
      }}
      placeholder='Enter video'
      />
        <button className='button' onClick={handleClick}>Add Event</button>
        </ul>
    </div>
  )
}

export default Add