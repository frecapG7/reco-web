import { createContext, useContext, useEffect, useState } from "react";
import { LoginDialog } from "../components/dialog/LoginDialog";

const AuthContext = createContext({
  session: {},
  login: () => {},
  logout: () => {},
  initialized: false,
  showLogin: () => {},
});

export const AuthContextProvider = ({ children }) => {
  const [session, setSession] = useState({
    loggedIn: false,
    user: null,
  });

  const [initialized, setInitialized] = useState(false);

  const [open, setOpen] = useState(false);

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

  const showLogin = () => {
    setOpen(true);
  };

  return (
    <AuthContext.Provider
      value={{ session, login, logout, initialized, showLogin }}
    >
      {children}
      <LoginDialog
        open={open}
        onClose={() => setOpen(false)}
        onSuccess={() => setOpen(false)}
      />
    </AuthContext.Provider>
  );
};

export const useAuthSession = () => {
  return useContext(AuthContext);
};
