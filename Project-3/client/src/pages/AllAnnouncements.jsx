import React from 'react';
import Announcements from '../components/Announcements/Announcements';
import Searchbar from '../components/Searchbar/Searchbar';

function AllAnnouncements(props) {
    return (
        <div>
            <h1>Check all the announcements</h1>
            <Searchbar />
            <Announcements />
        </div>
    );
}

export default AllAnnouncements;