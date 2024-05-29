import { createContext, useEffect, useState } from "react";

const AuthContext = createContext({
  session: {},
  login: () => {},
  logout: () => {},
});

export const useAuthSession = () => {
  const [session, setSession] = useState({
    loggedIn: false,
    user: null,
  });

  // TODO: sync session with refresh token
  useEffect(() => {
    const session = sessionStorage.getItem("session");
    if (session) {
      setSession({
        loggedIn: true,
        user: JSON.parse(session),
      });
    }
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

  return { session, login, logout };
};

export const AuthContextProvider = ({ children }) => {
  const { session, login, logout } = useAuthSession();

  return (
    <AuthContext.Provider value={{ session, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
