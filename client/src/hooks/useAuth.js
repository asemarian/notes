import { useContext } from 'react';
import { AuthContext } from '../context/auth';

export default function useAuth() {
    const { token, setToken } = useContext(AuthContext);
    const saveToken = (token) => {
        setToken(token);
        localStorage.setItem("token", token);
    }

    return { token, setToken: saveToken };
}