// import { createContext, useContext, useState } from "react";
// const UserContext = createContext;
// export const useUserContext = () => {
//   return useContext(useContext);
// };
// export const UserProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const loginUser = (user) => {
//     setUser(user);
//   };
//   const logOutUser = () => {
//     setUser(null);
//   };
//   return (
//     <UserContext.Provider value={{ user, loginUser, logOutUser }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loginUser = (userData) => {
    setUser({ ...userData });
    setIsLoggedIn(true);
  };

  const logoutUser = () => {
    setUser({});
    setIsLoggedIn(false);
  };

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};
