import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setProducts } from '../../Redux/Slices/productSlice';

const ProductForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products.items);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('price', price);
    
    if (image) {
      formData.append('image', image);
    }
  
    try {
      const token = localStorage.getItem('token'); 
      if (!token) throw new Error('No token found. Please log in again.');
  
      const response = await axios.post('http://localhost:5000/api/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });
      
      dispatch(setProducts([...products, response.data]));
      setTitle('');
      setDescription('');
      setPrice('');
      setImage(null);
    } catch (error) {
      console.error('Error adding product:', error);
      alert(`Error: ${error.message}`); 
    }
  };
  


  return (
    <form onSubmit={handleSubmit} className="product-form">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <button type="submit">Add Product</button>
    </form>
  );
};

export default ProductForm;
