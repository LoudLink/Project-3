import React from 'react';
import './ProfileCard.css'
function ProfileCard(props) {
    return (
        
        <div className='ProfileCard'>
            <h2>{props.profile.username}</h2>
            <img src={props.profile.image} alt='profile-pic'></img>
            <ul>
                {props.profile.tags.map((tag)=><li>{tag}</li>)}
            </ul>
        </div>
        
    );
}

export default ProfileCard;