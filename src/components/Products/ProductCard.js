// src/components/Products/ProductCard.js
import React, { useEffect, useState } from 'react';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../../config/firebase';

const ProductCard = ({ product }) => {
  const [imageURL, setImageURL] = useState(null);

  useEffect(() => {
    if (product.imagePath) {
      const fetchImage = async () => {
        const imageRef = ref(storage, product.imagePath);
        const url = await getDownloadURL(imageRef);
        setImageURL(url);
      };
      fetchImage();
    }
  }, [product.imagePath]);

  return (
    <div className="product-card">
      {imageURL && <img src={imageURL} alt={product.title} />}
      <h3>{product.title}</h3>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
    </div>
  );
};

export default ProductCard;
