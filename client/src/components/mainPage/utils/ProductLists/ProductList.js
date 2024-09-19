
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { GlobalState } from '../../../../GlobalState';

const ProductList = ({ product }) => {
  const { userApi } = useContext(GlobalState);

  const { isAdmin } = userApi ? userApi.isAdmin : false;
  const addCart = userApi.addCart;

  console.log(product); 

  
  const imageUrl = product.image || product.images;

  return (
    <div className='product_card'>
      {isAdmin && <input type='checkbox' checked={product.checked} readOnly />}
      <img src={imageUrl} alt={product.title} /> 
      <div className='product_box'>
        <h2 title={product.title}>{product.title}</h2>
        <span>${product.price}</span>
        <p>{product.description}</p>
      </div>

      <div className='row_btn'>
        {isAdmin ? (
          <>
            <Link id='btn_buy' to={`#!`}>
              Delete
            </Link>
            <Link id='btn_view' to={`detail/${product._id}`}>
              Edit
            </Link>
          </>
        ) : (
          <>
            <Link id='btn_buy' to={`#!`} onClick={() => addCart(product)}>
              Buy
            </Link>
            <Link id='btn_view' to={`detail/${product._id}`}>
              View
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductList;
