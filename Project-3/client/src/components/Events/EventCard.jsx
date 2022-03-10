import React from 'react';
import './Event.css'

function EventCard(props) {
    function capitalize(str){
        return str[0].toUpperCase()+str.slice(1)
    }
    return (
        <div className='eventCard'>
            <div className='card'>
                <h2>{capitalize(props.event.title)}</h2>
                <img src={props.event.image} alt='event-pic'></img>
                <p>{props.event.description}</p>
                <p>{props.event.owner[0]}</p>
            </div>
        </div>
    );
}

export default EventCard;