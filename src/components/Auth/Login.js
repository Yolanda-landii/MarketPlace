import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest, loginSuccess, loginFailure } from '../../Redux/Slices/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import { checkAdminStatus } from '../../Utils/FirebaseUtils';
import { RingLoader } from 'react-spinners'; 
import { auth } from '../../config/firebase';
import { signInWithCustomToken } from 'firebase/auth';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector(state => state.user);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginRequest());

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      if (response.data && response.data.customToken) {
        const { customToken } = response.data;

        // Sign in with Firebase to get the ID token
        const userCredential = await signInWithCustomToken(auth, customToken);
        const idToken = await userCredential.user.getIdToken(true); 

        // Store ID token in local storage
        localStorage.setItem('token', idToken);

        // Check if the user is an admin
        const isAdmin = await checkAdminStatus(idToken);

        dispatch(loginSuccess({
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          role: isAdmin ? 'admin' : 'user',
        }));

        navigate(isAdmin ? '/' : '/');
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'An error occurred. Please try again.';
      dispatch(loginFailure(errorMessage));
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-md text-white font-bold ${loading ? 'bg-blue-300' : 'bg-blue-500'} hover:bg-blue-600`}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
          {loading && <RingLoader size={30} color="#000" />}
          {error && <p className="text-red-500">{error}</p>}
        </form>
        <p className="mt-4 text-center">
          Don't have an account? <Link to="/register" className="text-blue-500 hover:underline">Register here</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
