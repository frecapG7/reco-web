import { createContext, useEffect, useState } from "react";

const AuthContext = createContext({
  session: {},
  login: () => {},
  logout: () => {},
});

export const useAuthSession = () => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const session = sessionStorage.getItem("session");
    if (session) {
      setSession(JSON.parse(session));
    }
  }, []);

  const login = (session) => {
    setSession(session);

    sessionStorage.setItem("token", session.access_token);
  };

  const logout = () => {
    setSession(null);
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
