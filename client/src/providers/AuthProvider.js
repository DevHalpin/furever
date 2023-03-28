import { createContext, useState, useContext } from 'react';


const authContext = createContext();

function useAuthContext() {
  return useContext(authContext)
};

function AuthProvider(props) {
  const localStorageUser = JSON.parse(localStorage.getItem("userData"));
  const [auth, setAuth] = useState(!! localStorageUser);
  const [user, setUser] = useState(localStorageUser || null);

  // Perform login process for the user & save authID, etc
  const login = function (user) {
    setAuth(true);
    setUser(user);
    localStorage.setItem("userData",JSON.stringify(user))
    // console.log('set user',user)
  };

  const register = function ({id, username, email, first_name, last_name, password, passwordConfirmation}) {
    setAuth(true);
    setUser({ id, username, email, firstName: first_name, lastName: last_name });
    localStorage.setItem("userData",JSON.stringify({ id, username, email, firstName: first_name, lastName: last_name }))
  };

  const logout = function () {
    setAuth(false);
    setUser(null);
  };

  // authContext will show these items
  const userData = { auth, user, setUser, register, logout, login };

  // comonent to share context
  return (
    <authContext.Provider value={userData}>
      {props.children}
    </authContext.Provider>
  );
}

export { AuthProvider, useAuthContext };