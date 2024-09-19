import axios from 'axios';
import React, { useContext } from 'react';
import { FaCartPlus } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import { RxCross2 } from 'react-icons/rx';
import { Link } from 'react-router-dom';
import { GlobalState } from '../../GlobalState';

const Header = () => {
  const { userApi = {}, token } = useContext(GlobalState);

  const isLogged = userApi.isLogged || false;
  const isAdmin = userApi.isAdmin || false;
  const cart = Array.isArray(userApi.cart) ? userApi.cart : [];

  const logoutUser = async () => {
    try {
      await axios.get('/user/logout', {
        headers: { Authorization: token }
      });
      localStorage.clear();
      if (userApi.setIsAdmin && typeof userApi.setIsAdmin === 'function') userApi.setIsAdmin(false);
      if (userApi.setIsLogged && typeof userApi.setIsLogged === 'function') userApi.setIsLogged(false);
    } catch (error) {
      console.error("Failed to logout:", error.response ? error.response.data : error.message);
    }
  };

  const adminRouter = () => (
    <>
      <li><Link to="/create_product">Create Product</Link></li>
      <li><Link to="/category">Categories</Link></li>
    </>
  );

  const loggedRouter = () => (
    <>
      <li><Link to="/history">History</Link></li>
      <li><Link to="/" onClick={logoutUser}>Logout</Link></li>
    </>
  );

  return (
    <header>
      <div className="menu">
        <GiHamburgerMenu width={30} />
      </div>
      <div className="logo">
        <h1><Link to="/">{isAdmin ? "Admin" : "Shop"}</Link></h1>
      </div>
      <ul>
        <li><Link to="/">{isAdmin ? "Products" : "Shop"}</Link></li>
        {isAdmin && adminRouter()}
        {isLogged ? loggedRouter() : (
          <li><Link to="/login">Login or Register</Link></li>
        )}
        <li><RxCross2 width={30} className="menu" /></li>
      </ul>
      {!isAdmin && (
        <div className="cart-icon">
          <span>{cart.length }</span>
          <Link to="/cart">
            <FaCartPlus size={30} />
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
