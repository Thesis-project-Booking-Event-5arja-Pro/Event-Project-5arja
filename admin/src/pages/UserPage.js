
import { useState,useEffect } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';




export default function UserPage() {
  
  const navigate=useNavigate()
  
  const handleNewUserClick = () => {
    navigate('/dashboard/addu');
  };
  const [User,setUser]=useState([])

  useEffect(() => {
    axios.get("http://localhost:5002/api/client/getAllclient").then(res=>{setUser(res.data)
}).catch(err => console.log(err))
    
      }, [])
    console.log(User.firstName);
    const buttonStyles = {
      backgroundColor: 'blue',
      color: 'white',
      padding: '10px 20px',
      borderRadius: '5px',
    };
  return (
          <div>
          <button className="buttons"variant="contained" onClick={ handleNewUserClick} style={buttonStyles}>
            New User
          </button>
          {User.map((e)=>(
      <div className="event-box" key={e.id}>
        <h2 className='name'> Name: {e.firstName}</h2>
        <p>User account: {e.email}</p>
       
        
        
      </div>
    ))}
          </div>  
  )}
        
       
