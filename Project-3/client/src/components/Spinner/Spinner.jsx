import React from 'react';
import {ScaleLoader} from "react-spinners"
import "./spinner.css";

function Spinner(props) {
    return (
        <div className='spinner'>
            <ScaleLoader color='#b60303' radius="2px" margin="2px" speedMultiplier="3"/>
        </div>
    );
}

export default Spinner;