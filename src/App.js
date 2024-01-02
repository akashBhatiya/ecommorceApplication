import './App.css';
import "./assets/style.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import AddProduct from './components/AddProducts/AddProduct';
import ProductDetail from './components/ProductDetail/ProductDetail';
import Signin from './components/Signin/Signin';
import NotFound from './components/NotFound.js/NotFound';
import Checkout from './components/Checkout/Checkout';
import Cart from './components/Cart/Cart';
import AuthProvider from './contexts/AuthContext';
import CartProvider from './contexts/CartContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState,useEffect } from 'react';
import { db } from './configs/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { toast } from 'react-toastify';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try{
        const productsCollection = await getDocs(collection(db,'products'));
        const productsData = productsCollection.docs.map((doc) => ({id:doc.id, ...doc.data()}));
        setProducts(productsData);
      }catch(err){  
        toast.error("Error fatching products");
        console.log(err);
      }
    }
    fetchProducts();
  },[setProducts]);


  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="App" >
            <ToastContainer/>
            <Navbar />
            <Routes>
              <Route exact path='/' element={<Home products={products}/>} />
              <Route path='/signin' element={<Signin/>} />
              <Route path='/add-product' element={<AddProduct/>} />
              <Route path='/product/:id' element={<ProductDetail/>} />
              <Route path='/checkout' element={<Checkout/>} />
              <Route path='/cart' element={<Cart/>} />
              <Route path='*' element={<NotFound/>}  />
            </Routes>
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
