import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import './style.css';

export default function ItemList() {
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [key, setKey] = useState('Fruit');
  const [itemQuantities, setItemQuantities] = useState({});

  const item = async () => {
    try {
      const ress = await axios.get('http://localhost:8877/getdata');
      if (ress && ress.data) {
        const itemsWithIds = ress.data.map((item, index) => {
          if (!item._id) {
            // If an item doesn't have an _id, create a unique ID based on its index
            return { ...item, _id: `generatedId_${index}` };
          }
          return item;
        });
        setItems(itemsWithIds);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const findCartItem = (itemId) => {
    return cart.find((item) => item._id === itemId);
  };

  const addToCart = (data) => {
    const quantity = itemQuantities[data._id] || 1;

    const existingItem = findCartItem(data._id);

    if (existingItem) {
      const updatedCart = cart.map((item) =>
        item._id === data._id ? { ...item, Quantity: item.Quantity + quantity } : item
      );
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    } else {
      const updatedCart = [...cart, { ...data, Quantity: quantity }];
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }

    // Update itemQuantities to reflect the cart's added items
    const updatedQuantities = { ...itemQuantities };
    updatedQuantities[data._id] = quantity;
    setItemQuantities(updatedQuantities);
  };

  const decreaseQuantity = (itemId) => {
    const updatedQuantities = { ...itemQuantities };
    if (updatedQuantities[itemId] && updatedQuantities[itemId] > 1) {
      updatedQuantities[itemId] -= 1;
      setItemQuantities(updatedQuantities);
    }
  };

  const increaseQuantity = (itemId) => {
    const updatedQuantities = { ...itemQuantities };
    updatedQuantities[itemId] = (updatedQuantities[itemId] || 0) + 1;
    setItemQuantities(updatedQuantities);
  };

  useEffect(() => {
    item();
  }, []);

  return (
    <>
      <div className='about-text' style={{ textAlign: 'center', width: '100vw', marginTop: '5rem' }}>
        <h3>Fresh<font>Products</font></h3>
        <div className='searchbox'>
          {/* ... (your select box code) */}
          <select
            name=''
            id=''
            onChange={(e) => {
              setKey(e.target.value);
            }}
            style={{ border: '1px solid black', padding: '0.51rem 0.5rem', margin: '1rem', background: 'transparent' }}
          >
            <option value='Fruit' selected>
              Fruits
            </option>
            <option value='Vegetables'>Vegetables</option>
            <option value='Animal Produce'>Animal Produce</option>
            <option value='Dairy Products'>Dairy Products</option>
            <option value='Bakery Products'>Bakery Products</option>
            <option value='Condiments'>Condiments</option>
            <option value='Best Seller'>Best Seller</option>
          </select>
        </div>
      </div>
      <div className='ItemCards'>
        {items
          .filter((data) => {
            if (key === null) {
              return data;
            } else if (data.Category.toLowerCase().includes(key.toLowerCase())) {
              return data;
            }
          })
          .map((data) => (
            <div className='itemCard' key={data._id}>
              <img src={data.imageUrl} alt={data.Item} className='itemImage' />
              <div className='itemDetails'>
                <h4>{data.Item}</h4>
                <p>Category: {data.Category}</p>
                <p>Rate: {data.Rate}</p>
                <div>
                  <button onClick={() => decreaseQuantity(data._id)}>-</button>
                  <span>{itemQuantities[data._id] || 0}</span>
                  <button onClick={() => increaseQuantity(data._id)}>+</button><br />
                  <button onClick={() => addToCart(data)}>Add to Cart</button>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="text-center mt-4">
      <NavLink to='/'> {/* This will navigate back to the Home page */}
        <button style={{"background-color":"green", color:"white"}}>Home</button>
      </NavLink>
      </div>
    </>
  );
}
