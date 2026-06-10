"use client";

import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import axios from 'axios';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = '₹ ';
    const delivery_fee = 10;
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState('');
    const [userData, setUserData] = useState({ name: '', email: '' });

    const router = useRouter();
    const navigate = (path) => {
        router.push(path);
    };

    // Safely load initial userData from localStorage on mount
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedUser = localStorage.getItem('userData');
            if (savedUser) {
                try {
                    setUserData(JSON.parse(savedUser));
                } catch (e) {
                    console.error("Error parsing userData", e);
                }
            }
        }
    }, []);

    const addToCart = async (itemId, size) => {
        if (!size) {
            toast.error('Select Product Size');
            return;
        }

        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            }
            else {
                cartData[itemId][size] = 1;
            }
        }
        else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData);

        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/add', { itemId, size }, { headers: { token } })
            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }
    }

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item];
                    }
                } catch (error) {

                }
            }
        }
        return totalCount;
    }

    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;
        setCartItems(cartData)

        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/update', { itemId, size, quantity }, { headers: { token } })
            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }
    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items);
            if (!itemInfo) continue;
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        let itemPrice = itemInfo.price;
                        if (itemInfo.sizes && itemInfo.sizes.length > 0 && typeof itemInfo.sizes[0] === 'object' && itemInfo.sizes[0].size) {
                            const sizeData = itemInfo.sizes.find(s => s.size === item);
                            if (sizeData) {
                                itemPrice = sizeData.price;
                            }
                        }
                        totalAmount += itemPrice * cartItems[items][item];
                    }
                } catch (error) {

                }
            }
        }
        return totalAmount;
    }

    const [homepageConfig, setHomepageConfig] = useState(null);

    const getHomepageConfigData = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/homepage/get')
            if (response.data.success) {
                setHomepageConfig(response.data.config)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getProductsData = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/product/list')
            if (response.data.success) {
                setProducts(response.data.products.reverse())
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const getUserCart = async (authToken) => {
        try {
            const response = await axios.post(backendUrl + '/api/cart/get', {}, { headers: { token: authToken } })
            if (response.data.success) {
                setCartItems(response.data.cartData)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        getProductsData()
        getHomepageConfigData()
    }, [])

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const localToken = localStorage.getItem('token');
            if (!token && localToken) {
                setToken(localToken);
                getUserCart(localToken);
            }
        }
        if (token) {
            getUserCart(token);
        }
    }, [token])

    const value = {
        products, currency, delivery_fee,
        search, setSearch, showSearch, setShowSearch,
        cartItems, addToCart, setCartItems,
        getCartCount, updateQuantity,
        getCartAmount, navigate, backendUrl,
        setToken, token,
        userData, setUserData,
        homepageConfig, getHomepageConfigData
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;
