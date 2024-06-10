import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthToken";
import axios from "axios";
import { summaryAPI } from "../../common";

const Profile = () => {
  const { token } = useAuth();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
        console.log("Fetching profile with token:", token);
        try {
          const response = await axios.get(summaryAPI.profile.url, {
            headers: {
              'auth-token': token
            }
          });
          console.log("Profile fetched successfully:", response.data);
          setUser(response.data);
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      };

    if (token) {
      fetchProfile();
    }
  }, [token]);

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h1>-----------------Profile----------------</h1>
      <p>Name: {user.username}</p>
      <p>Email: {user.email}</p>
      {/* Aur bhi user details yahaan display kar sakte hain */}
    </div>
  );
};

export default Profile;
