import React, { useEffect, useState } from 'react';
import{Link} from 'react-router-dom'
import axios from 'axios';
import ProfileCard from '../ProfileCard'

function Users(props) {
    const[users,setUsers]=useState([{}]);

    useEffect(()=>{
    axios.get(`${process.env.REACT_APP_SERVER_URL}/users`)
    .then((response)=>{
        setUsers(response.data)
    })
    .catch((err)=>console.log('CAGADAAAAAAAA',err))
},[])
    return (
        <div>
        {users.map((user)=>(
            <ProfileCard key={user._id} profile={user}/>
        ))}
            
        </div>
    );
}

export default Users;