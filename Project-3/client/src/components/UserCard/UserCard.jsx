import React from 'react';
import './UserCard.css'
function ProfileCard(props) {
    return (
        
        <div className='ProfileCard'>
            <div className='card'>
                <h2>{props.profile.username}</h2>
                <img src={props.profile.image} alt='profile-pic'></img>
                <ul>
                    {props.profile.tags.map((tag)=><li>{tag}</li>)}
                </ul>
            </div>
        </div>
        
    );
}

export default ProfileCard;