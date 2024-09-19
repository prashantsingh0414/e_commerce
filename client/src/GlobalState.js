

import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import ProductApi from './api/ProductApi';
import UserApi from './api/UserApi';

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
    const [token, setToken] = useState(false);
    

    const refreshToken = async () => {
        try {
            const res = await axios.get('/user/refresh_token');
            setToken(res.data.accesstoken);
        } catch (error) {
            console.error('Error refreshing token:', error.response ? error.response.data : error.message);
        }
    };

    useEffect(() => {
        const firstLogin = localStorage.getItem('firstLogin');
        if (firstLogin) refreshToken();
    }, []);

    const userApi = UserApi(token);
    

    const state = {
        token: [token, setToken],
        productsApi: ProductApi(),
        userApi: userApi
    };

    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    );
};
