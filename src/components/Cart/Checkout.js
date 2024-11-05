import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { db } from '../../config/firebase';
import { auth } from '../../config/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { clearCart } from '../../Redux/Slices/cartSlice';

const Checkout = () => {
  const cartItems = useSelector(state => state.cart.items);
  const totalAmount = useSelector(state => state.cart.totalAmount);
  const dispatch = useDispatch();

  const handleCheckout = async () => {
    const user = auth.currentUser;
    if (user) {
      const orderData = {
        userId: user.uid,
        items: cartItems,
        totalAmount,
        createdAt: new Date(),
      };
      await addDoc(collection(db, 'orders'), orderData);
      dispatch(clearCart()); // Clear cart after checkout
      alert('Checkout successful!');
    }
  };

  return (
    <div>
      <h2>Checkout</h2>
      <ul>
        {cartItems.map(item => (
          <li key={item.id}>
            <h3>{item.title}</h3>
            <p>Quantity: {item.quantity}</p>
            <p>Total Price: ${item.totalPrice}</p>
          </li>
        ))}
      </ul>
      <h3>Total Amount: ${totalAmount}</h3>
      <button onClick={handleCheckout}>Confirm Checkout</button>
    </div>
  );
};

export default Checkout;
