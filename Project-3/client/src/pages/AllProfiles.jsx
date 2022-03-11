import React from 'react';
import Searchbar from '../components/Searchbar/Searchbar';
import Users from '../components/Users/Users';

function AllProfiles(props) {
    return (
        <div>
            <h1>Check all the profiles</h1>
            <Searchbar/>
            <Users/>
        </div>
    );
}

export default AllProfiles;