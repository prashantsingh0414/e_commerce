import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { GlobalState } from '../../../GlobalState'


const Login = () => {
  const [user,SetUser]=useState({
    email:'',
    password:''
  })

  const { token } = useContext(GlobalState);
  const [, setToken] = token;



   const onChangeInput = e =>{
    const {name,value} =e.target;
    SetUser ({...user,[name]:value})
  }


  const loginSubmit =async e =>{
    e.preventDefault()
try{
  
   const res =await axios.post('/user/login',{...user})
  const { accesstoken } = res.data;
  
localStorage.setItem('firstLogin',true)

setToken(accesstoken);
window.location.href='/'
}
catch(err){
  alert(err.response.data.msg)
}

  }

  return (
    <div className='login-page'>

<form onSubmit={loginSubmit}>
<input type='email' name='email' required placeholder='Email' value={user.email} onChange={onChangeInput}/>

<input type='password' name='password' required placeholder='Password' value={user.password} onChange={onChangeInput}/>
<div className='row'>

<button type='submit'>Login</button>
<Link to='/register'>Register Here</Link>
</div>
  
</form>



    </div>
  )
}

export default Login;