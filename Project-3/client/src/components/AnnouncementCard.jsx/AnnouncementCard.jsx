import React from 'react';

function AnnouncementCard(props) {
    return (
        <div>
            <div className='announcement'>
                <h2>{props.announcement.title}</h2>
                <img src={props.announcement.image} alt='announcement-pic'></img>
                <p>{props.announcement.description}</p>
                <p>{props.announcement.owner[0]}</p>
            </div>
        </div>
    );
}

export default AnnouncementCard;