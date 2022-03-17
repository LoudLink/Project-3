import "../App.css";
import { Link } from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import Spinner from "../components/Spinner/Spinner";

function ErrorPage(){
    const { isLoading } = useContext(AuthContext);

    if (isLoading) return <Spinner />;

    return(
        <div>
        <div className="m-5 text-justify">
        <h2> Oopsie! Where are you trying to go sneaky weasel? </h2>
        <br></br>
        <h2>This page does not exist... at least for now!</h2>
        </div>
        
        <button className="btn btn-warning mt-5"><Link exact= "true" to={"/"}>GO BACK</Link></button>
        </div>
    )

}

export default ErrorPage;