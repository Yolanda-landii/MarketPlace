import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart, removeItemFromCart, clearCart } from '../../Redux/Slices/cartSlice';
import { db } from '../../config/firebase';
import { collection, doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import { auth } from '../../config/firebase';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const totalAmount = useSelector(state => state.cart.totalAmount);

  useEffect(() => {
    const fetchCart = async () => {
      const user = auth.currentUser;
      if (user) {
        const cartRef = doc(collection(db, 'carts'), user.uid);
        const cartSnap = await getDoc(cartRef);
        
        if (cartSnap.exists()) {
          const cartData = cartSnap.data();
          cartData.items.forEach(item => dispatch(addItemToCart(item)));
        }
      }
    };
    fetchCart();
  }, [dispatch]);

  const handleRemoveItem = async (id) => {
    dispatch(removeItemFromCart(id));
    // Update Firestore to reflect changes
    const user = auth.currentUser;
    if (user) {
      const cartRef = doc(db, 'carts', user.uid);
      await updateDoc(cartRef, {
        items: cartItems.filter(item => item.id !== id),
      });
    }
  };

  const handleClearCart = async () => {
    dispatch(clearCart());
    const user = auth.currentUser;
    if (user) {
      const cartRef = doc(db, 'carts', user.uid);
      await setDoc(cartRef, { items: [] }); // Clear the cart in Firestore
    }
  };

  return (
    <div>
      <h2>Your Cart</h2>
      <ul>
        {cartItems.map(item => (
          <li key={item.id}>
            <h3>{item.title}</h3>
            <p>Quantity: {item.quantity}</p>
            <p>Total Price: ${item.totalPrice}</p>
            <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <h3>Total Amount: ${totalAmount}</h3>
      <button onClick={handleClearCart}>Clear Cart</button>
    </div>
  );
};

export default Cart;
