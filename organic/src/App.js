import React from 'react';
import Header from './Comp/Header';
import About from './Comp/About';
import Footer from './Comp/Footer';
import ItemList from './Comp/ItemList';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cart from './Comp/Cart';
import Nav from './Comp/Nav';
import Payment from './Comp/Payment';
function App() {
  return (
    <>
      <BrowserRouter>
      <Nav/>
        <Routes>
          <Route path='/' element={<Header/>}/>
          <Route path='/about' element={<About />} />
          <Route path='/item' element={<ItemList />} />
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/Footer' element={<Footer/>}/>
          <Route path='/Payment' element={<Payment/>}/>
        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
