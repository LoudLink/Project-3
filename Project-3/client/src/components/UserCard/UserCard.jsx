import React from 'react';
import './UserCard.css'
function UserCard(props) {
    function capitalize(str){
        return str[0].toUpperCase()+str.slice(1)
    }

    return (
        
        <div className='UserCard'>
            <div className='card'>
                <h2>{capitalize(props.profile.username)}</h2>
                <img src={props.profile.image} alt='profile-pic'></img>
                <ul className='flex '>
                    {props.profile.tags.map((tag)=><li>{tag}</li>)}
                </ul>
            </div>
        </div>
        
    );
}

export default UserCard;