import "../App.css";
import { Link } from "react-router-dom";

function ErrorPage(){
    console.log("INCORRECT PAGE")

    return(
        <div>
        <h1> This page does not exist</h1>
        <button><Link exact to={"/main"}>GO BACK</Link></button>
        </div>

    )

}

export default ErrorPage;