import React,{useState} from 'react';
import { Link,useNavigate,useLocation,useParams } from 'react-router-dom';
import axios from 'axios';
import "../components/update.css"
const Update = ({handeltoggle}) => {
    const { id } = useParams();
  const [updateEvent,setAddEvent]=useState({
    title: "",
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
      await axios.put(`http://localhost:5001/api/event/${id}`, updateEvent);
      navigate("/dashboard/products");
     
    } catch (err) {
      console.log(err);
      
    }
  };


  return (
    <div className="update-page">
      <ul>
      <h1 className='h1'>Update</h1>
      
      <input 
      className="update-form"
      type='text'
      label='Name'
      onChange={(e)=>{
        setAddEvent((prev)=>({...prev,eventName:e.target.value}))
      }}
      placeholder='Enter name'
      />
      <textarea
        className="update-input"
     
        rows={5}
        type="text"
        placeholder="Enter Description"
        name="Description"
        onChange={(e)=>{
          setAddEvent((prev)=>({...prev,description:e.target.value}))
        }}
      />
      
      <input 
      className="update-input"
      type='number'
      label='Price'
      onChange={(e)=>{
        setAddEvent((prev)=>({...prev,price:e.target.value}))
      }}
      placeholder='Enter Price'
      />
      <input 
       className="update-input"
      type='text'
      label='image'
      onChange={(e)=>{
        setAddEvent((prev)=>({...prev,img:e.target.value}))
      }}
      placeholder='Enter Image'
      />
      <input 
      className="update-input"
      type='text'
      label='Category'
      onChange={(e)=>{
        setAddEvent((prev)=>({...prev,category:e.target.value}))
      }}
      placeholder='Enter Categoey'
      />
      <input 
       className="update-input"
      type='text'
      label='Grade'
      onChange={(e)=>{
        setAddEvent((prev)=>({...prev,grade:e.target.value}))
      }}
      placeholder='Enter Grade'
      />
         <input 
      className="update-input"
      type='text'
      label='date'
      onChange={(e)=>{
        setAddEvent((prev)=>({...prev,date:e.target.value}))
      }}
      placeholder='Enter Date '
      />  
       <input 
       className="update-input"
      type='text'
      label='video'
      onChange={(e)=>{
        setAddEvent((prev)=>({...prev,video:e.target.value}))
      }}
      placeholder='Enter video'
      />
        <button className="update-button" onClick={handleClick}>update Event</button>
        </ul>
    </div>
  )
}

export default Update