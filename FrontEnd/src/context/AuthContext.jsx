import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );
const login = (token, userData) => {

  localStorage.setItem("token", token);

  localStorage.setItem(
    "user",
    JSON.stringify(userData)
  );

  setUser(userData);

  setIsLoggedIn(true);

};

const logout = () => {

  localStorage.removeItem("token");

  localStorage.removeItem("user");

  setUser(null);

  setIsLoggedIn(false);

};
const [user, setUser] = useState(() => {
  const savedUser = localStorage.getItem("user");
  return savedUser ? JSON.parse(savedUser) : null;
});

  return (
    <AuthContext.Provider
     value={{
  user,
  isLoggedIn,
  login,
  logout,
}}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () =>
  useContext(AuthContext);