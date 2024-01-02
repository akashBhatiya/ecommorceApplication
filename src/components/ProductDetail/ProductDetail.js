import style from './ProductDetail.module.css';
import { useNavigate,useLocation } from 'react-router-dom';
import { CiDeliveryTruck } from "react-icons/ci";
import { FaCircle } from "react-icons/fa";
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';

const ProductDetail = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const product = location.state?.product;
    const {user} = useAuth();

    const {addToCart} = useCart();

    const handleBuyNow = () => {
        const newProduct = {
            ...product,
            cart: 1,
        }
        navigate('/checkout' ,{
            state:{cart : [newProduct], buyNow: true}
        })
    }

    const handleCart = () => {
        if(!user){
            navigate('/signin');
        }
        else{
            addToCart(product);
        }
    }

  return (
    <div className={style.productContainer}>
        {product && <div className={style.product}>
                <div className={style.productImageContainer}>
                    <img src={product.img} className={style.productImage} alt="" />
                </div>
                
                <div className={style.productDetailContainer}>
                    <h1 className={style.productTitle}>{product.title}</h1>
                    <p className={style.productDesc}>{product.desc.length > 200 ? `${product.desc.slice(0,200)}...` :product.desc}</p>
                    <p className={style.priceContainer}> <span className={style.mrp}>M.R.P. ₹{product.mrp} </span> &nbsp; <span className={style.price}> ₹{product.price}</span> </p>
                    <p className={style.sideText}><CiDeliveryTruck className={style.icon + ' ' + style.truck} /> All India Free Shipping</p>
                    <p className={style.sideText}><FaCircle className={style.icon + ' ' +style.dot} /> In stock, ready to ship</p>
                    <button className={style.addToCart} onClick={handleCart}>ADD TO CART</button> <br/>  
                    <button className={style.buyNow} onClick={handleBuyNow} >BUY NOW</button>
                </div>
            
            </div>}
    </div>
  )
}

export default ProductDetail;
