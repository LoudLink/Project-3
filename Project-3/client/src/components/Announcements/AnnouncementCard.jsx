import React from 'react';
import './Announcement.css'
import { Link } from 'react-router-dom';

function AnnouncementCard(props) {
    function capitalize(str){
        return str[0].toUpperCase()+str.slice(1)
    }
    return (
        <div className='announcementCard'>
            <div className='card'>
                <h2>{capitalize(props.announcement.title)}</h2>
                <img src={props.announcement.image} alt='announcement-pic'></img>
                <p>{props.announcement.description}</p>
                <p>{props.announcement.owner[0]}</p>
                <Link exact= "true" to={`/announcements/${props.announcement._id}`}>Read More</Link>
                
            </div>
        </div>
    );
}

export default AnnouncementCard;