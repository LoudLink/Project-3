import React from 'react';
import './UserCard.css'
import { Link } from 'react-router-dom';

function UserCard(props) {
    function capitalize(str){
        return str[0].toUpperCase()+str.slice(1)
    }

    return (
        
        <div style={{width: 130}}>
        <Link exact= "true" to={`/users/${props.profile._id}`}>
            
                <img src={props.profile.image} alt='profile-pic' className='img-thumbnail' style={{width: 100, height: 100, borderRadius: 50, borderColor: 'black'}}></img>
                <h4 className='lead'>{capitalize(props.profile.username)}</h4>
            
            </Link>
        </div>
        
    );
}

export default UserCard;