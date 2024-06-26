import React, { useState, useEffect, useCallback, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState("");

  const checkToken = useCallback(() => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("role");
    if (userRole) {
      setRole(userRole);
    }
    setLoggedIn(!!token);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.clear();
    setRole("");
    setLoggedIn(false);
    navigate("/");
  }, [navigate]);

  useEffect(() => {
    checkToken();
  }, [checkToken]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, role, checkToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
