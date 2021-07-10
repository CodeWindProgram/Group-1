import React, { useState } from "react";
// import "./Student.css";
import { useSpring, animated } from "react-spring";
import { useForm } from 'react-hook-form';
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./Teacher.css";
import {Link} from 'react-router-dom';


// function Teacher() {
  
  
 
  

//   return (
    // <div className="login-register-wrapper">
      
          
      
    //   <div className="form-group">
         {/* <animated.form action="" id="loginform" >
          <LoginForm />
        </animated.form>
        
      </div>
      <animated.div className="forgot-panel" >
        <a herf="#">Forgot your password</a>
      </animated.div>  */}
    {/* </div>
  ); */}
{/* } */} 

function Teacher() {
  const schema=yup.object().shape({
    UserName : yup.string().max(15).required(),
    Password : yup.string().required().max(20).min(8)
})

  const {register,handleSubmit,formState:{errors}}=useForm({
    resolver: yupResolver(schema)
});

const submitForm =(data)=>{
    console.log(data);
    
}
  return (
    <div className="login-register-wrapper">
    <p className="login-title">Teacher Login</p>
    <div className="form-group">
    <React.Fragment>
      <label for="username">Username</label>
      <input type="text" name="UserName"  {...register("UserName")}/>
      <p>{errors.UserName?.message}</p>
      <label for="password">Password</label>
      <input type="password" name="Password"  {...register("Password")}/>
      <p>{errors.Password?.message}</p>
      <input type="submit" value="submit" className="submit" onClick={handleSubmit(submitForm)} />
      <div >
      <Link to="/forgotpassword">Forgot Your Password?</Link>
      <br></br>
      <br></br>
      <Link to="/"><h4 >STUDENT LOGIN</h4></Link>
      </div>
    </React.Fragment>
    </div>
    </div>
  );
}
export default Teacher;