import React from 'react';
import './Announcement.css'
import { Link } from 'react-router-dom';

function AnnouncementCard(props) {

    function capitalize(str){
        return str? str[0].toUpperCase()+str.slice(1) : ""
    }

    

    return (
        
        <div  className="card m-3 shadow rounded" style={{width: 286, height:500 }}>
        
        <Link exact= "true" to={`/announcements/${props.announcement._id}`}>
            <div>
                <img src={props.announcement.image} alt='announcement-pic' className='card-img-top' style={{width: 286, height: 286,backgroundColor: 'black'}}></img>
            </div>
            <div className="card-body text-start">
                <h2 className='card-title display-6' id="annoCard"><b>{capitalize(props.announcement.title)}</b></h2>
                <p className='card-text lead'>{props.announcement.location}&nbsp;</p> 
                <p><b>Created by:</b> {capitalize(props.announcement.owner[0].username)}</p>
            </div>    
        </Link>
            
        </div>
    );
}

export default AnnouncementCard;