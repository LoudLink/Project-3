import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserCard from '../UserCard/UserCard'

function Users(props) {
    const[users,setUsers]=useState([]);

    useEffect(()=>{
    axios.get(`${process.env.REACT_APP_SERVER_URL}/api/users`)
    .then((response)=>{
        setUsers(response.data)
    })
    .catch((err)=>console.log('CAGADAAAAAAAA',err))
},[])
    return (
        <div>
        {users.map((user)=>(
            <UserCard key={user._id} profile={user}/>
        ))}
            
        </div>
    );
}

export default Users;