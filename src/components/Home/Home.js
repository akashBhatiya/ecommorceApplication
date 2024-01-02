import style from './Home.module.css';
import { useNavigate } from 'react-router-dom';
import { CiSearch } from "react-icons/ci";
import { useState, useEffect } from 'react';

const Home = ({products}) => {
  const navigate = useNavigate();
  const [allCategories, setAllCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [renderProducts, setRenderProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  
  const handleProductClick = (id, p) => {
    navigate(`/product/${id}`, {
      state : {product : p}
    } )
  }

  const handleCheckboxChange = (category) => {
    setSelectedCategories((prevCategories) => {
      const updatedCategories = prevCategories.includes(category) ? prevCategories.filter((cat) => cat !== category) : [...prevCategories, category];
      return updatedCategories;
    });
  }

  const handleFilterProducts = (e) => {
    e.preventDefault();
    const filterProducts = selectedCategories.length === 0 ? products : products.filter((product) => selectedCategories.includes(product.type));
    setRenderProducts(filterProducts);
  }

  const handleSearchProducts = (e) => {
    e.preventDefault();
    const filterProducts = searchQuery.length === "" ? products : products.filter((product) => product.title.toLowerCase().includes(searchQuery.toLowerCase()));
    setRenderProducts(filterProducts);
  }

  const handleClearFilter = (e) => {
    e.preventDefault();
    setSelectedCategories([]);
    setRenderProducts(products);
  }

  useEffect(() => {
    const catas = Array.from(new Set(products.map((p) => p.type)));
    setRenderProducts(products);
    setAllCategories(catas);
  },[products]);

  return (
    <section className={style.HomeContainer}>
      <div className={style.sidebar}>
        <form onSubmit={handleSearchProducts}>
          <input 
            type="text" 
            placeholder='Search product'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className={style.searchBtn} type='submit'><CiSearch className={style.searchIcon} /></button>
        </form>

        <h4>Select Categories</h4>
        <form>
          {allCategories.map((category,index) => (
            <div key={index}>
              <input 
                type="checkbox"
                id={category}
                checked={selectedCategories.includes(category)}
                onChange={() => handleCheckboxChange(category)}
              />
              <label htmlFor={category}>{category}</label>
            </div>
          ))}
          <button onClick={handleFilterProducts} className={style.btn}>Filter Products</button>
          <br />
          <button onClick={handleClearFilter} className={style.btn}>Clear Filter</button>
        </form>
        

      </div>

      <div className={style.productsContainer}>
        {renderProducts.map((p,index) => (
          <div key={index} className={style.productContainer} onClick={() => handleProductClick(p.id,p)}>
            <div className={style.productImageContainer} style={{
              backgroundImage:`url(${p.img})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              width: '100%',
              height: '300px'
              }}>
              
            </div>
            <div className={style.productDetailContainer}>
              <h3>{p.title.length > 20 ? `${p.title.slice(0,20)}...`:p.title}</h3>
              <p> <span className={style.price}>₹{p.price}</span> <span className={style.mrp}>M.R.P.{p.mrp} </span><span className={style.disc}>({Math.round((p.mrp - p.price)/p.mrp*100)}% OFF)</span></p>
            </div>
          </div>
        ))}
      </div>
    </section>

    
  )
}

export default Home;
