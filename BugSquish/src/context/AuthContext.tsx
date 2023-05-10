import React from 'react'
import { createContext, useReducer, useEffect } from 'react'

export const AuthContext = createContext(this)

export const authReducer = (state:any, action:any) => {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload };
            break;
        case 'LOGOUT':
            return { user:null };
            break;
        default:
            return state;
    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })

    useEffect(() => {
        const user = localStorage.getItem('user');

        if(user){
            const jsonUser = JSON.parse(user);
            dispatch({type: 'LOGIN', payload: jsonUser});
        }
    }, [])
    
    console.log('AuthContext state: ', state);

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            { children }
        </AuthContext.Provider>
    )
}