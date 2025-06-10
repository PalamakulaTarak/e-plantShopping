import React, { useState } from 'react';
import './ProductList.css';
import CartItem from './CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice.jsx';

function ProductList() {
  const [showCart, setShowCart] = useState(false);
  const [showPlants, setShowPlants] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items); // Make sure this matches your store

  const plantsArray = [
    // your plantsArray from original code, unchanged
    {
      category: "Air Purifying Plants",
      plants: [
        {
          name: "Snake Plant",
          image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg",
          description: "Produces oxygen at night, improving air quality.",
          cost: "$15"
        },
        // ... other plants
      ]
    },
    // ... other categories
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart((prev) => ({
      ...prev,
      [plant.name]: true,
    }));
  };

  const handleShowCart = () => setShowCart(true);
  const handleShowPlants = () => setShowPlants(true);
  const handleContinueShopping = () => {
    setShowCart(false);
    setShowPlants(false);
    setAddedToCart({});
  };

  return (
    <div className="App">
      <div className="header" style={{
        backgroundColor: '#4CAF50',
        color: '#fff',
        padding: '15px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '20px',
      }}>
        <div><h1>My Green Thumb</h1></div>
        <ul style={{
          display: 'flex',
          justifyContent: 'space-between',
          listStyleType: 'none',
          padding: 0,
          margin: 0,
          width: '300px',
        }}>
          <li style={{ flex: 1, margin: '0 10px', cursor: 'pointer' }} onClick={handleShowPlants}>Plants</li>
          <li style={{ flex: 1, margin: '0 10px', cursor: 'pointer' }} onClick={handleShowCart}>Cart ({items.length})</li>
          <li style={{ flex: 1, margin: '0 10px', cursor: 'pointer' }}>Profile</li>
        </ul>
      </div>

      {showPlants && !showCart ? (
        <div className="product-grid">
          {plantsArray.map((category, index) => (
            <div key={index}>
              <br />
              <center><h1><u>{category.category}</u></h1></center>
              <br />
              <div className="product-list">
                {category.plants.map((plant, plantIndex) => (
                  <div className="product-card" key={plantIndex}>
                    <img
                      className="product-image"
                      src={plant.image}
                      alt={plant.name}
                    />
                    <div className="product-title">{plant.name}</div>
                    <div className="product-description">{plant.description}</div>
                    <h2 className="product-cost" style={{ color: 'red' }}>
                      {plant.cost}
                    </h2>
                    <button
                      className="product-button"
                      style={addedToCart[plant.name] ? { backgroundColor: 'grey' } : { backgroundColor: 'green' }}
                      onClick={() => handleAddToCart(plant)}
                      disabled={addedToCart[plant.name]}
                    >
                      {addedToCart[plant.name] ? 'Added' : 'Add to Cart'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : showCart ? (
        <CartItem onContinueShopping={handleContinueShopping} />
      ) : null}
    </div>
  );
}

export default ProductList;
