import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [ok, setOk] = useState<boolean | undefined>(undefined)
    const { dispatch } = useAuthContext();

    const signup = async (username:string, email:string, password:string) => {
        setIsLoading(true);
        setError(null);

        const response = await fetch('http://44.199.215.98:5000/users/signup', {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username, email, password})
        });

        const json = await response.json();

        if (!response.ok){
            setOk(false);
            setIsLoading(false);
            setError(json.error);
        }
        if (response.ok){
            // save user to localStorage
            localStorage.setItem('user', JSON.stringify(json));

            // update authContext
            dispatch({type: 'LOGIN', payload: json});

            setOk(true);
            setIsLoading(false);
        }
    }

    return { signup, ok, isLoading, error };
};