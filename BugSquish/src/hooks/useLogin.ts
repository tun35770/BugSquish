import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useAuthContext();

    const login = async (username:string, password:string) => {
        setIsLoading(true);
        setError(null);

        const response = await fetch('http://localhost:5000/users/login', {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username, password})
        });

        const json = await response.json();

        if (!response.ok){
            setIsLoading(false);
            setError(json.error);
        }
        if (response.ok){
            // save user to localStorage
            localStorage.setItem('user', JSON.stringify(json));

            // update authContext
            dispatch({type: 'LOGIN', payload: json});

            setIsLoading(false);
        }
    }

    return { login, isLoading, error };
};