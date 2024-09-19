import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'



const Register = () => {
  const [user,SetUser]=useState({
    name:'',
    email:'',
    password:''
  })


   const onChangeInput = e =>{
    const {name,value} =e.target;
    SetUser ({...user,[name]:value})
  }


  const registerSubmit =async e =>{
    e.preventDefault()
try{
await axios.post('/user/register',{...user})

localStorage.setItem('firstRegister',true)

window.location.href='/'
}
catch(err){
  alert(err.response.data.msg)
}

  }

  return (
    <div className='register-page'>

<form onSubmit={registerSubmit}>
<input type='text' name='name' required placeholder='Name' value={user.name} onChange={onChangeInput}/>
<input type='email' name='email' required placeholder='Email' value={user.email} onChange={onChangeInput}/>
<input type='password' name='password' required placeholder='Password' value={user.password} onChange={onChangeInput}/>
<div className='row'>

<button type='submit'>Register</button>
<Link to='/login'>Login Here</Link>
</div>
  
</form>

    </div>
  )
}

export default Register;