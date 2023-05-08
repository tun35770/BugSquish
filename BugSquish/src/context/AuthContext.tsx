import React from 'react'
import { createContext, useReducer } from 'react'

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

    console.log('AuthContext state: ', state);

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            { children }
        </AuthContext.Provider>
    )
}