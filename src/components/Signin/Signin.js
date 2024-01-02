import React,{useState, useEffect} from 'react';
import logo from '../../assets/logo.png';
import style from './Signin.module.css';
import sideVideo from "../../assets/v1.mp4";
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../../configs/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';


const Signin = () => {

    const {user,signOutUser, signInWithGoogle} = useAuth();
    const navigate = useNavigate();
    const [orders,setOrders] = useState([]);
    useEffect(()=>{
      const fetchOrders = async () => {
        try{
          const ordersCollection = collection(db,'orders');
          const ordersQuery = query(ordersCollection, where('mail','==',user.email ));
          const ordersSnapshot = await getDocs(ordersQuery);
          const ordersData = ordersSnapshot.docs.map((doc) => ({id:doc.id, ...doc.data()}));
          setOrders(ordersData);
        }catch(error){
          console.log(error);
        }
      }

      if(user){
        fetchOrders();
      }
    },[user]);

  return (
    <div className={style.signInContainer}>
          <div className={style.popupImageContainer}>
            <video src={sideVideo} type="video/mp4" className={style.authSidebarVideo} loop autoPlay muted />
          </div>
          <div className={style.popupTextContainer}>
            <Link to='/'><img src={logo} width={"80px"}  alt="Archittam" /></Link>
            {user ? <>
              <h4>Hi {user.displayName},</h4>
              <p>You are already loged in, are you sure you want to sign out?</p>
              <button onClick={signOutUser} className={style.signInButton} >Sign Out</button>
            </> : <>
              <h1>Welcome to Archittam</h1>
              <p style={{fontSize:'0.8rem'}}>(Click below button to sign in or sign up with google)</p>
              <button onClick={signInWithGoogle} className={style.signInButton} >Continue with Google</button>
            </>}

            <p onClick={() => navigate(-1)} style={{cursor:"pointer", fontSize: "0.9rem"}}>Go Back</p>

            {user && <div className={style.ordersCont}>
                <h3>Previous Orders</h3>

                <div className={style.orderContainer}>
                  <div className={style.idCont}><b>Order ID</b></div>
                  <div className={style.cartCont}><b>Order Cart Items & Qty</b></div>
                  <div className={style.totalCont}><b>Total Amount</b></div>
                </div>

                {orders.map((order,index) => (<div key={index} className={style.orderContainer}>
                  <div className={style.idCont}>{order.id}</div>
                  <div className={style.cartCont}>
                    {order.cart.map((item,inIndex) => (<div key={inIndex} >
                      <div className={style.titleCont}>
                        {item.title}
                      </div>
                      <div className={style.qtyCont}>
                        {item.cart} x ₹{item.price}
                      </div>        
                    </div>))}
                  </div>
                  <div className={style.totalCont}>
                    ₹{order.amount}
                  </div>
                </div>))}

              </div>}

          </div>
    </div>
  )
}

export default Signin;
