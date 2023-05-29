import React,{useState} from 'react';
import { Link,useNavigate,useLocation,useParams } from 'react-router-dom';
import axios from 'axios';
import "../components/update.css"
const Update = () => {
    // const { id } = useParams();
  const [addUser,setAddEvent]=useState({
     
  firstName:"",
  lastName:"" ,
  email :"",
  password :"",
  phoneNumber: "",
  location: "",
  friendList :"",
  historyEvent :"",
  address :"",
  img :"",
   });
   const navigate=useNavigate()
 
   
   const add = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5002/api/client/addclient",addUser);
      navigate("/dashboard/user");
      
    } catch (err) {
      console.log(err);
    
    }
  };


  return (
    <div className="update-page">
      <ul>
      <h1 className='h1'>Add user</h1>
      
      <input 
      className="update-input"
      type='text'
      label='Name'
      onChange={(e)=>{
        setAddEvent((prev)=>({...prev,firstName:e.target.value}))
      }}
      placeholder='Enter name'
      />
      <input
        className="update-input"
     
        rows={5}
        type="text"
        placeholder="Enter email"
        name="email"
        onChange={(e)=>{
          setAddEvent((prev)=>({...prev,email:e.target.value}))
        }}
      />
      
      <input 
      className="update-input"
      type='number'
      label='number'
      onChange={(e)=>{
        setAddEvent((prev)=>({...prev,phoneNumber:e.target.value}))
      }}
      placeholder='Enter phone number'
      />
    
      <input 
      className="update-input"
      type='text'
      label='Password'
      onChange={(e)=>{
        setAddEvent((prev)=>({...prev,password:e.target.value}))
      }}
      placeholder='Enter password'
      />
     
        <button className="update-button" onClick={add}>add</button>
        </ul>
    </div>
  )
}

export default Update