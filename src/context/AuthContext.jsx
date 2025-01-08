import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({
  session: {},
  login: () => {},
  logout: () => {},
  initialized: false,
});

export const AuthContextProvider = ({ children }) => {
  const [session, setSession] = useState({
    loggedIn: false,
    user: null,
  });

  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const storage = sessionStorage.getItem("session");
    if (storage) {
      setSession({
        loggedIn: true,
        user: JSON.parse(storage),
      });
    }
    setInitialized(true);
  }, []);

  const login = (data) => {
    setSession({
      loggedIn: true,
      user: data.user,
    });

    sessionStorage.setItem("session", JSON.stringify(data.user));
    sessionStorage.setItem("token", data.access_token);
  };

  const logout = () => {
    setSession({
      loggedIn: false,
      user: null,
    });
    sessionStorage.removeItem("session");
    sessionStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ session, login, logout, initialized }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthSession = () => {
  return useContext(AuthContext);
};
