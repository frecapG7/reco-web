import { createContext, useEffect, useState } from "react";

const AuthContext = createContext({
  session: {},
  login: () => {},
  logout: () => {},
});

export const useAuthSession = () => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const session = localStorage.getItem("sessions");
    if (session) {
      session(JSON.parse(session));
    }
  }, []);

  const login = (session) => {
    setSession(session);

    localStorage.setItem("session", JSON.stringify(session));
  };

  const logout = () => {
    setSession(null);
    localStorage.removeItem("session");
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
