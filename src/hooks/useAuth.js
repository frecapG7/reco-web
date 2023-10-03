import { useContext } from "react";
import { useUser } from "./useUser";
import { AuthContext } from "../context/AuthContext";


//https://docs.pmnd.rs/zustand/getting-started/comparison ??

export const useAuth = () => {

    const {user, setUser} = useContext(AuthContext);


    const login = (user) => {
        setUser(user);
    }

    const logout = () => {
        setUser(null);
    }

    return {user, login, logout};
}
