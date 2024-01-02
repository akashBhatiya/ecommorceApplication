import React from 'react';
import style from './Cart.module.css';
import { useCart } from '../../contexts/CartContext';
import { CiCirclePlus, CiCircleMinus, CiTrash } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';


const Cart = () => {
    const {cart,addToCart, cartAmount, removeFromCart, minusFromCart } = useCart();
    const navigate = useNavigate();

    if(cart.length === 0){
        return (<h1>Cart is Empty</h1>)
    }

    const handleCheckout = () => {
        navigate('/checkout', {
            state: {cart : cart}
        })
    }

  return (
    <div className={style.sectionContainer}>
        <div className={style.cartItemsContainer}>
            {cart.map( (item,index) => (<div key={index} className={style.itemContainer}>
                <div>
                    <img src={item.img} alt="" />
                </div>

                <div className={style.titleContainer}>
                    <p>{item.title}</p>
                </div>

                <div className={style.itemPriceContainer}>
                    <p> <span className={style.icons + " " + style.plus}><CiCirclePlus onClick={() => addToCart(item)} /></span> {item.cart} x ₹{item.price} <span className={style.icons + " " + style.minus}><CiCircleMinus onClick={() => {minusFromCart(item)}} /> &nbsp; <CiTrash onClick={() => removeFromCart(item)} /></span> </p>
                </div>

            </div>))}
            <div className={style.itemContainer + " " + style.totalBillAmount} >Total: &nbsp; <span> ₹{cartAmount} </span></div>
            <div className={style.btnContainer}><button className={style.button} onClick={handleCheckout}>Checkout</button></div>
        </div>
    </div>
  )
}

export default Cart
