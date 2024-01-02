import React,{useState} from 'react';
import style from './AddProduct.module.css';
import useAddProduct from '../../Hooks/useAddProduct';

const AddProduct = () => {

    const [product,setProduct] = useState({
        title: '',
        desc: '',
        type: '',
        sku: '',
        qty: 0,
        price: 0,
        mrp: 0,
        img : ''
    });

    const {addProduct} = useAddProduct();

    const handleInputChange = (e) => {
        const {name,value} = e.target;
        setProduct((prevState) => ({...prevState, [name] : value}));
    }
    
    const handleFormSubmit = (e) => {
        e.preventDefault();
        addProduct(product,setProduct);
    }

  return (
    <div>
        <form onSubmit={handleFormSubmit}>
            <div className={style.inputContainer}>
                <label htmlFor="title">Product Title</label><input type="text" name='title' value={product.title} onChange={handleInputChange} placeholder='title' required /> <br /> 
                <label htmlFor="desc">Product Description</label><input type="text" name='desc' value={product.desc} onChange={handleInputChange} placeholder='Description' required /> <br />
                <label htmlFor="type">Product Type</label><input type="text" name='type' value={product.type} onChange={handleInputChange} placeholder='Product type' /> <br />
                <label htmlFor="sku">SKU</label><input type="text" name='sku' value={product.sku} onChange={handleInputChange} placeholder='sku'/> <br />
                <label htmlFor="qty">Inventory</label><input type="number" name='qty' value={product.qty} onChange={handleInputChange} /> <br />
                <label htmlFor="price">Sell Price</label><input type="number" name='price' value={product.price} onChange={handleInputChange} /> <br />
                <label htmlFor="mrp">MRP</label><input type="number" name='mrp' value={product.mrp} onChange={handleInputChange} /> <br />
                <label htmlFor="img">Product Image Link</label><input type="text" name='img' value={product.img} onChange={handleInputChange} placeholder='image' /> <br />
                <button type='submit' >Add Product</button>
            </div>
        </form>
    </div>
  )
}

export default AddProduct
