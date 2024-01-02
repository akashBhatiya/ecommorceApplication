import React from 'react';
import style from './Navbar.module.css';
import logo from '../../assets/logo.png';
import { CiShoppingCart, CiUser } from "react-icons/ci";
import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';


const Navbar = () => {

  const {totalItems} = useCart();
  const {user} = useAuth();

  return (
    <>
      <div className={style.navbarContainer}>
        <div><Link to='/'><img src={logo} alt="" className={style.logo} /></Link></div>
        <div>
          <Link to='/signin' className={style.user}>{user ? <img src="https://lh3.googleusercontent.com/a/ACg8ocLMJhC2REXfYuCpPHXdXF-rbq_xOHpn4fIletFKEfvs7Go=s96-c" alt='user'/> : <CiUser className={style.icons}/> }</Link>
          <Link to='/cart' className={style.cart}><CiShoppingCart className={style.icons} /><span className={style.cartItemCount}>{totalItems}</span></Link>
        </div>
      </div>
    </>
  )
}

export default Navbar
