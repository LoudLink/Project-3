import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';

function EditProfilePage(props) {
    
    const[user,setUser]=useState({})
    const {id} = useParams();

function handleSubmit(event){
    event.preventDefault();
    axios.put(`${process.env.REACT_APP_SERVER_URL}/api/users/${id}`,user)
        .then((response)=>{
            setUser(user=>({...user,username:'',email:'',description:'',tags:''}))
        })
        .catch((err)=>console.log(err))
}

function handleChange(event){
    const key= event.target.name;
    const value= event.target.value
    setUser((user)=>({...user,[key]:value}))
}

    
    return (
        <div>
            <form onSubmit={handleSubmit}>
            <div>
                <label>Username:</label>
                <input type='text' name='username' value={user.username} onChange={handleChange}></input>
            </div>
            <div>
                <label>E-mail:</label>
                <input type='email' name='email' value={user.email} onChange={handleChange}></input>
            </div>
            <div>
                <label>Image:</label>
                <input type='text' name='image' value={user.image} onChange={handleChange}></input>
            </div>
            <div>
                <label>Description:</label>
                <input type='text' name='description' value={user.description} onChange={handleChange}></input>
            </div>
            <div>
                <label>Tags:</label>
                <input type='text' name='tags' value={user.tags} onChange={handleChange}></input>
            </div>
            <div>
                <label>Location:</label>
                <input type='text' name='location' value={user.location} onChange={handleChange}></input>
            </div>
            <div>
                <label>Videos:</label>
                {user.videos}
            </div>
            <div>
                <label>Your Announcements:</label>
                {user.ownAnnouncements}
            </div>
            <div>
                <label>Announcements:</label>
                {user.announcements}
            </div>
            <div>
                <label>Events:</label>
                {user.events}
            </div>
                <button type="submit">Submit</button>
            </form>
            <Navbar/>
        </div>

    );
}

export default EditProfilePage;
