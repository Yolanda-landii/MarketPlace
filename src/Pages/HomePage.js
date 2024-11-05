import React from 'react';
import ProductList from '../components/Products/ProductList';

const HomePage = () => {
  return (
    <div>
      <header className="header flex justify-between items-center p-4 bg-gray-900 text-white">
        <div className="logo">
          <img src="/images/logo.png" alt="Logo" className="w-24 h-auto" />
        </div>
        <nav className="nav">
          <ul className="flex space-x-6">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/profile" className="hover:underline">Profile</a></li>
            {/* <li><button onClick={handleLogout} className="hover:underline">Logout</button></li> */}
          </ul>
        </nav>
      </header>
      <h1>Marketplace</h1>
      <ProductList />
    </div>
  );
};

export default HomePage;