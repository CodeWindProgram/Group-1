import React, { useState } from "react";
import "./Student.css";
import { useSpring, animated } from "react-spring";
import { useForm } from 'react-hook-form';
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {Link} from 'react-router-dom';

function Student() {
  const [registrationFormStatus, setRegistartionFormStatus] = useState(false);
  const loginProps = useSpring({ 
    left: registrationFormStatus ? -500 : 0, // Login form sliding positions
  });
  const registerProps = useSpring({
    left: registrationFormStatus ? 0 : 500, // Register form sliding positions 
  });

  const loginBtnProps = useSpring({
    borderBottom: registrationFormStatus 
      ? "solid 0px transparent"
      : "solid 2px #ffef10",  //Animate bottom border of login button
  });
  const registerBtnProps = useSpring({
    borderBottom: registrationFormStatus
      ? "solid 2px #ffef10"
      : "solid 0px transparent", //Animate bottom border of register button
  });

  function registerClicked() {
    setRegistartionFormStatus(true);
  }
  function loginClicked() {
    setRegistartionFormStatus(false);
  }


  return (
    <div className="login-register-wrapper">
      <div className="nav-buttons">
        <animated.button
          onClick={loginClicked}
          id="loginBtn"
          style={loginBtnProps}
        >
          Login
        </animated.button>
        <animated.button
          onClick={registerClicked}
          id="registerBtn"
          style={registerBtnProps}
        >
          Register
        </animated.button>
      </div>
      <div className="form-group">
        <animated.form action="" id="loginform" style={loginProps}>
          <LoginForm />
        </animated.form>
        <animated.form action="" id="registerform" style={registerProps}>
          <RegisterForm />
        </animated.form>
      </div>
      <animated.div className="forgot-panel" style={loginProps}>
       <Link to="/forgotpassword" class="forgetpassword"> Forgot Password?</Link>
       <br></br>
       <br></br>
      <Link to="/teacher"><h4>TEACHER LOGIN</ h4></Link>
      </animated.div>
    </div>
  );
}

  

function LoginForm() {
  const schema=yup.object().shape({
    UserName : yup.string().max(30).required(),
    Password : yup.string().required().max(20).min(8)
})

  const {register,handleSubmit,formState:{errors}}=useForm({
    resolver: yupResolver(schema)
});

const submitForm =(data)=>{
    console.log(data);
    
}
  return (
    <React.Fragment>
      <label for="username">Username</label>
      <input type="text" name="UserName"  {...register("UserName")}/>
      <p>{errors.UserName?.message}</p>
      <label for="password">Password</label>
      <input type="password" name="Password"  {...register("Password")}/>
      <p>{errors.Password?.message}</p>
      <input type="submit" value="submit" className="submit" onClick={handleSubmit(submitForm)}/>
      
    </React.Fragment>
  );
}

function RegisterForm() {
  const schema=yup.object().shape({
    Name : yup.string().max(30).required(),
    Email : yup.string().email().required(),
    Password : yup.string().min(8).max(20).required()
})

  const {register,handleSubmit,formState:{errors}}=useForm({
    resolver: yupResolver(schema)
});

const regForm =(data)=>{
    console.log(data);
}
  return (
    <React.Fragment>
      <div className="reg-container">
      <label for="fullname" >Name</label>
      <input type="text" name="Name" {...register("Name")}/>
      <p>{errors.Name?.message}</p>
      <label for="email">Email Id</label>
      <input type="text" name="Email" {...register("Email")}/>
      <p>{errors.Email?.message}</p>
      <label for="password">Password</label>
      <input type="password" name="Password" {...register("Password")}/>
      <p>{errors.Password?.message}</p>
      <input type="submit" value="submit" class="submit" onClick={handleSubmit(regForm)} />
      </div>
    </React.Fragment>
  );
}

export default Student;