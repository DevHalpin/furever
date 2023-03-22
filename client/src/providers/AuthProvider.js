import { createContext, useState, useContext } from 'react';

const authContext = createContext();

function useAuthContext() {
  return useContext(authContext)
};

function AuthProvider(props) {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState(null);

  // Perform login process for the user & save authID, etc
  // const login = function (email, password) {
  //   setAuth(true);
  //   setUser({});
  // };

  const register = function (username, email, firstName, lastName, password, passwordConfirmation) {
    setAuth(true);
    setUser({ username, email, firstName, lastName });
    
  };

  const logout = function () {
    setAuth(false);
    setUser(null);
  };

  // authContext will show these items
  const userData = { auth, user, register, logout };

  // comonent to share context
  return (
    <authContext.Provider value={userData}>
      {props.children}
    </authContext.Provider>
  );
}

export { AuthProvider, useAuthContext };