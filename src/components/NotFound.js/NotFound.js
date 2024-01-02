import React from 'react';
import style from "./NotFound.module.css";
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/');
    }

  return (
    <div className={style.notFoundConatainer}>
        <h1>Error 404: PAGE NOT FOUND</h1>
        <p>The page you are looking for does not exist.</p>
        <button onClick={handleNavigate}>Continue Shopping</button>
      
    </div>
  )
}

export default NotFound
