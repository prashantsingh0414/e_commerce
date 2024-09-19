
import axios from 'axios';
import { useEffect, useState } from 'react';

const UserApi = (token) => {
    const [isLogged, setIsLogged] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        if (token) {
            const getUser = async () => {
                try {
                    const res = await axios.get('/user/info', {
                        headers: { Authorization: token }
                    });

                    setIsLogged(true);
                    setIsAdmin(res.data.role === 1);
                    console.log('User data:', res.data);
                } catch (err) {
                    console.error('Error fetching user data:', err.response ? err.response.data : err.message);
                    alert(err.response?.data?.msg || 'An error occurred');
                }
            };
            getUser();
        }
    }, [token]);

    const addCart = async (product) => {
        if (!isLogged) return alert("Please Log In");

        const check = cart.every(item => item._id !== product._id);

        if (check) {
            setCart([...cart, { ...product, quantity: 1 }]);
           
        } else {
            alert("This product already exists in cart");
        }
    };

    return { isLogged, setIsLogged, isAdmin, setIsAdmin, addCart ,cart ,setCart};
};

export default UserApi;
