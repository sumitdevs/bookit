import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/Homepage';
import ProductDetailPage from './pages/ProductDetailPage';
import CheckoutPage from './pages/CheckoutPage';
import BookingConfirmed from './pages/BookingConfirmed';
import './App.css';

const App = () => {
  // shared search query for Header + HomePage
  const [query, setQuery] = useState('');

  return (
    <Router>
      <Header searchValue={query} onSearch={setQuery} />
      <main className='max-w-[1440px] w-full mx-auto px-5 sm:px-10 md:px-20 xl:px-30 bg-white'>
        <Routes>
          <Route path="/" element={<HomePage query={query} />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/confirmed" element={<BookingConfirmed />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
