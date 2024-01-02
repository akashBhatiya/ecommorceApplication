import { createContext, useContext, useEffect, useState } from "react";

const cartContext = createContext();

export const useCart = () => {
    return useContext(cartContext);
}


const CartProvider = ({children}) => {

    const [cart,setCart] = useState([]);
    const [totalItems,setTotalItems] = useState(0);
    const [cartAmount,setCartAmount] = useState(0);

    useEffect(() => {
        let itemsCount = 0;
        let totalAmount = 0;

        cart.forEach( (item) => {
            itemsCount += item.cart;
            totalAmount += item.cart*item.price;
        } )
        setTotalItems(itemsCount);
        setCartAmount(totalAmount);
    },[cart]);

    const addToCart = (p) => {
        const existingProduct = cart.find((item) => item.id === p.id);

        if(existingProduct){
            const updateCart = cart.map((item) => item.id === p.id ? {...item, cart : item.cart+1} : item );
            setCart(updateCart);
        }else{
            setCart([...cart, {...p,cart : 1}])
        }
    }

    const minusFromCart = (p) => {
        const existingProduct = cart.find( item => item.id === p.id);
        if(existingProduct){
            const updateCart = cart.map((item) => {
                if(item.id === p.id ){
                    const updatedCart = item.cart - 1;
                    return updatedCart > 0 ? {...item,cart: updatedCart} :null;
                }
                return item;
            }).filter(Boolean);
            setCart(updateCart);
        }
    }

    const removeFromCart = (p) => {
        setCart(cart.filter(item => item.id !== p.id));
    }

    const emptyCart = () => {
        setCart([]);
    }

    const value={cart,addToCart,removeFromCart,totalItems,cartAmount, minusFromCart,emptyCart};

    return <cartContext.Provider value={value} >{children}</cartContext.Provider>

}

export default CartProvider;