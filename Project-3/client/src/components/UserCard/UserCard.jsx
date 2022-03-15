import React from 'react';
import './UserCard.css'
import { Link } from 'react-router-dom';

function UserCard(props) {
    function capitalize(str){
        return str[0].toUpperCase()+str.slice(1)
    }

    return (
        
        <div className='UserCard'>
            <div className='card'>
                <h2>{capitalize(props.profile.username)}</h2>
                <img src={props.profile.image} alt='profile-pic' className='miAnuncio'></img>
                <Link exact= "true" to={`/users/${props.profile._id}`}>Read More</Link>
            </div>
        </div>
        
    );
}

export default UserCard;