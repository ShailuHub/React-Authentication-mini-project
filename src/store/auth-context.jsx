import React, { useState } from "react";

//Create context object and declare default value;
const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
  autologout: () => {},
});

//Named export
export const AuthContextProvider = (props) => {
  const initilaToken = localStorage.getItem("token");
  const [token, setToken] = useState(initilaToken);
  const userIsLoggedIn = !!token;
  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
    autologoutHandler();
  };
  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
  };
  const autologoutHandler = () => {
    setTimeout(() => {
      logoutHandler();
    }, 50000);
  };
  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    autologout: autologoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

//Default export
export default AuthContext;
