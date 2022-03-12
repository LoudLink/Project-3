import React from 'react';
import { Link } from 'react-router-dom';
import './Event.css'

function EventCard(props) {

    function capitalize(str){
        return str[0].toUpperCase()+str.slice(1)
    }

    console.log(props.event)

    return (
        <div className='eventCard'>
            <div className='card'>
                <h2>{capitalize(props.event.title)}</h2>
                <img src={props.event.image} alt='event-pic'></img>
                <p>{props.event.description}</p>
                <p>{props.event.owner[0]}</p>
                <Link exact to={`/events/${props.event._id}`}>Read More</Link>
            </div>
        </div>
    );
}

export default EventCard;