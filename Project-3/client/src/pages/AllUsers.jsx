import React, { useState,useEffect } from 'react';
import Searchbar from '../components/Searchbar/Searchbar';
import UserCard from '../components/UserCard/UserCard'
import axios from 'axios';
import ScrollUpBtn from '../components/ScrollUpBtn/ScrollUpBtn';
import { Link } from 'react-router-dom';

function AllProfiles(props) {
    const[users,setUsers]=useState([]);
    const[filteredUsers,setFilteredUsers]=useState([]);

    useEffect(()=>{
    axios.get(`${process.env.REACT_APP_SERVER_URL}/api/users`)
    .then((response)=>{
        setUsers(response.data)
        setFilteredUsers(response.data)
    })
    .catch((err)=>console.log('CAGADAAAAAAAA',err))
},[])

    function search(str){
        const newList=users.filter((user)=>{
            return user.username.toLowerCase().includes(str.toLowerCase())
    })
    setFilteredUsers(newList)
    }

    return (
        <div>
            <div className="flex-center">
                <img src="../../ios-arrow-back-logo-icon-png-svg (1).png" alt="arrow back" className="goBackBtn"/>
                <Link exact to="/main"> Go back</Link>
            </div>
            <h1>Check all the profiles</h1>
            <Searchbar filter={search}/>
            <ScrollUpBtn />
            <div>
                {filteredUsers.map((user)=>(
                    <UserCard key={user._id} profile={user}/>
                ))}
            </div>
        </div>
    );
}

export default AllProfiles;