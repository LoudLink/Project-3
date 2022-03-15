import React from 'react';
import './Announcement.css'
import { Link } from 'react-router-dom';

function AnnouncementCard(props) {
    function capitalize(str){

        return str[0].toUpperCase()+str.slice(1)

    }

    console.log(props.announcement.owner[0])

    return (
        <div className='announcementCard'>
        <Link exact= "true" to={`/announcements/${props.announcement._id}`}>
            <div>
                <img src={props.announcement.image} alt='announcement-pic' className='miAnuncio'></img>
            </div>
            <div>
                <h2>&nbsp;{capitalize(props.announcement.title)}&nbsp;</h2>
                <p>{props.announcement.location}&nbsp;<b>Created by:</b> {capitalize(props.announcement.owner[0].username)}</p>
            </div>    
                </Link>
            
        </div>
    );
}

export default AnnouncementCard;