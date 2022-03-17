import React, { useContext } from 'react';
import {ScaleLoader} from "react-spinners"
import { AuthContext } from '../../context/auth.context';
import "./spinner.css";

function Spinner({children}) {

    const isLoading = useContext(AuthContext)

    if (isLoading) {
    return (
        <div className='spinner'>
            <ScaleLoader color='#b60303' radius="2px" margin="2px" speedMultiplier="3"/>
        </div>
    );
    } else return children;
}

export default Spinner;