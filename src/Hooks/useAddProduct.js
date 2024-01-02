import { toast } from 'react-toastify';
import { db } from '../configs/firebase';
import { collection, addDoc } from 'firebase/firestore';

const useAddProduct = () => {
    
    const addProduct = async (product,setProduct) => {
        try{
            const productCollection = collection(db, 'products');
            const productRef =  await addDoc(productCollection,product);

            const productId = productRef.id;
            const typeCollection = collection(db, product.type);
            await addDoc(typeCollection, {productID : productId});

            setProduct({
                title: '',
                desc: '',
                type: '',
                sku: '',
                qty: 0,
                price: 0,
                mrp: 0,
                img : ''
            })
            toast.success("Product added successfully");

        }catch(error){
            toast.error("Error creating the Product");
        }
    }


  return {addProduct} ;
}

export default useAddProduct;
