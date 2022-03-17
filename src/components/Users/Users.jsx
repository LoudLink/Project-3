import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import UserCard from "../UserCard/UserCard";
import { AuthContext } from "../../context/auth.context.js";

function Users(props) {
  const [users, setUsers] = useState([]);
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/users`)
      .then((response) => {
        setUsers(response.data.filter((user) => user._id !== currentUser?._id));
      })
      .catch((err) => console.log("CAGADAAAAAAAA", err));
  }, [currentUser?._id]);

  return (
    <div>
      {users.map((user) => (
        <div key={user._id}>
          <UserCard profile={user} />
        </div>
      ))
      }
    </div>
  );
}

export default Users;
