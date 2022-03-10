import React from 'react';
import './Announcement.css'

function AnnouncementCard(props) {
    return (
        <div className='announcementCard'>
            <div className='card'>
                <h2>{props.announcement.title}</h2>
                <img src={props.announcement.image} alt='announcement-pic'></img>
                <p>{props.announcement.description}</p>
                <p>{props.announcement.owner[0]}</p>
            </div>
        </div>
    );
}

export default AnnouncementCard;