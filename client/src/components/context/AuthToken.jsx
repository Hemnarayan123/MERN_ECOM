import { createContext, useState, useContext } from "react";
import {toast } from "react-hot-toast";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(localStorage.getItem("role"));

  const tokenGetLocalStorage = (serverToken, serverRole) => {
    localStorage.setItem("token", serverToken);
    localStorage.setItem("role", serverRole);
    setToken(serverToken);
    setRole(role);
    // toast.success("Sign In Success", {
    //   duration: 3000,
    // });
  };

  const isSignIn = !!token;

  const SignoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setToken(null);
    setRole(null);
    toast.error("You have been logged out",{
        duration: 3000,
      });
  };

  return (
    <AuthContext.Provider value={{token, tokenGetLocalStorage, isSignIn, SignoutUser, role }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
