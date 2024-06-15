import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthToken";
import axios from "axios";
import { summaryAPI } from "../../common";

const Allusers = () => {
  const { token, role } = useAuth();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (role === 'admin') {
      axios.get(summaryAPI.Allusers.url, { headers: { 'auth-token': token } })
        .then(response => {
          setUsers(response.data);
        })
        .catch(error => {
          console.error("Error fetching users:", error);
        });
    }
  }, [token, role]);

  if (role !== 'admin') {
    return <div>Access denied</div>;
  }

  return (
    <div>
      <h1>All Users</h1>
      <ul>
        {users.map(user => (
          <li key={user._id}>{user.name} - {user.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default Allusers;
