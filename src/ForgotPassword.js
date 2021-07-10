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

  

function ForgotPassword() {
  const schema=yup.object().shape({
    UserName : yup.string().max(30).required(),
    
    NewPassword:yup.string().required().min(8).max(20),
    ConfirmPassword:yup.string().required().oneOf([yup.ref('NewPassword'),null],"Paswords mismatch")
        
})

  const {register,handleSubmit,formState:{errors}}=useForm({
    resolver: yupResolver(schema)
});

const submitForm =(data)=>{
    console.log(data);
    
}
  return (
    <div className="login-register-wrapper">
    <p className="login-title">RESET PASSWORD</p>
    <div className="form-group">
    <React.Fragment>
      <label for="username">Username</label>
      <input type="text" name="UserName"  {...register("UserName")}/>
      <p className="msg">{errors.UserName?.message}</p>     

      <label for="password">New Password</label>
      <input type="password" name="Password"  {...register("NewPassword")}/>
      <p className="msg">{errors.Password?.message}</p>

      <label for="password">Confirm Password</label>
      <input type="password" name="ConfirmPassword"  {...register("ConfirmPassword")}/>
      <p className="msg">{errors.ConfirmPassword?.message}</p>
      <input type="submit" value="submit" className="submit" onClick={handleSubmit(submitForm)}/>
      
      <Link to="/" ><h4  style={{alignItems:"center"}}>Login</h4></Link>
    </React.Fragment>
    </div>
    </div>
  );
}  


export default ForgotPassword;