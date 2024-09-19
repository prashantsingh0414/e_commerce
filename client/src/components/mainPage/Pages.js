import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Cart } from './cart/Cart'
import Login from './login/Login'
import Register from './login/Register'
import { Product } from './products/Product'
import DetailProduct from './utils/DetailProducts/DetailProduct'
const Pages = () => {
  return (
    <div>
<Routes>

<Route path='/' element={<Product/>}/>
<Route path='/login' element={<Login/>}/>
<Route path='/register' element={<Register/>}/>
<Route path='/cart' element={<Cart/>}/>
<Route path='/detail/:id' element={<DetailProduct/>}/>
<Route path='/cart' element={<Cart/>}/>


</Routes>


    </div>

  )
}




 export default Pages;