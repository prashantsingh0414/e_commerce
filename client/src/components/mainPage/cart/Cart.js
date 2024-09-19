

import React, { useContext } from 'react';
import { GlobalState } from '../../../GlobalState';

export const Cart = () => {
  const { userApi } = useContext(GlobalState);
  const { cart } = userApi;

  if (!cart) {
    console.error('Cart is undefined');
    return <h2 style={{ textAlign: "center", fontSize: "5rem" }}>Error: Cart data is unavailable</h2>;
  }

  if (cart.length === 0) {
    return <h2 style={{ textAlign: "center", fontSize: "5rem" }}>Cart Empty</h2>;
  }

  return (
    <div className='detail'>
      {cart.map((product) => {
        
        const imageUrl = product.image || product.images;

        return (
          <div key={product._id} className='cart-item'>
            <img src={imageUrl} alt={product.title} /> 
            <div className='box-detail'>
              <h2>{product.title}</h2>
              <span>${product.price}</span>
              <p>{product.description}</p>
              <p>Quantity: {product.quantity}</p> 
            </div>
          </div>
        );
      })}
    </div>
  );
};

