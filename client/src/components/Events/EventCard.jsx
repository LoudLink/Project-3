import React from 'react';
import { Link } from 'react-router-dom';
import './Event.css'

function EventCard(props) {

    function capitalize(str){
        return str[0].toUpperCase()+str.slice(1)
    }

    return (

        <div className="card m-3 shadow rounded" style={{width: 288, height: 545}}>
            <Link exact= "true" to={`/events/${props.event._id}`}>
            <div>
                <img src={props.event.image} alt='event-pic' className='card-img-top' style={{width: 286, height: 300, backgroundColor:'black'}}></img>
            </div>
            <div className="card-body text-start">
                <h2 className='card-title display-6'><b>{capitalize(props.event.title)}</b></h2>
                <p className='card-text lead'>{props.event.description}</p>
                <p className='card-text lead'>{new Date(props.event.date).toDateString()}</p>
                <p className='card-text lead'><b>Hosted by: </b>{props.event.owner[0].username}</p>
            </div>
            </Link>
        </div>

    );
}

export default EventCard;