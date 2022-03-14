import "../App.css";
import { Link } from "react-router-dom";

function ErrorPage(){
    console.log("INCORRECT PAGE")

    return(
        <div>
        <h2> Oopsie! Where are you trying to go sneaky weasel? </h2>
        <h2>This page does not exist... at least for now!</h2>
        <button><Link exact to={"/"}>GO BACK</Link></button>
        </div>

    )

}

export default ErrorPage;