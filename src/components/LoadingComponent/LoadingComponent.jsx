import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { Navigate } from "react-router-dom";
import Spinner from "../Spinner/Spinner";

function LoadingComponent( { children } ) {
  
  const { isLoading } = useContext(AuthContext);

  // If the authentication is still loading 
  if (isLoading) return <Spinner />;

  if (!isLoading) {
  // If the user is not logged in 
    return <Navigate to="/login" />;
  } else {
  // If the user is logged in, allow to see the page 
    return children;
  }
}

export default LoadingComponent;
