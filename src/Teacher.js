import React, { useState } from "react";
import "./style.css";
import { useSpring, animated } from "react-spring";
import { useForm } from 'react-hook-form';
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import showPwdImg from './show-password.svg';
import hidePwdImg from './hide-password.svg';

function Teacher() {
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
      : "solid 2px #FFEF33",  //Animate bottom border of login button
  });
  const registerBtnProps = useSpring({
    borderBottom: registrationFormStatus
      ? "solid 2px #FFEF33"
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
          id="nav-btn"
          style={loginBtnProps}
        >
          Login
        </animated.button>
        <animated.button
          onClick={registerClicked}
          id="nav-btn"
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
        <p>Not registered? <button onClick={registerClicked} id="sregister">Register</button><a href="/forgotpassword">Forgot Password?</a></p>
        <h5><a href="/" className="a-link">Student Login</a></h5>
      </animated.div>
      
    </div>
  );
}

  

function LoginForm() {
  const schema=yup.object().shape({
    UserName : yup.string().max(15).required(),
    Password : yup.string().min(8).max(20).required(),
    ConfirmPassword:yup.string().required().oneOf([yup.ref('NewPassword'),null],"Paswords Mismatch")
})

const [setPwd] = useState('');
const [isRevealPwd, setIsRevealPwd] = useState(false);

  const {register,handleSubmit,formState:{errors}}=useForm({
    resolver: yupResolver(schema)
});

const submitForm =(data)=>{
    console.log(data);
    
}
  return (
    <React.Fragment>
      <label for="username" id='info'>Username</label>
      <input type="text" name="UserName" placeholder="Enter your Username" {...register("UserName")}/>
      <p id='error'>{errors.UserName?.message}</p>
      <label for="password" id='info'>Password</label>
      <div className='pwd-container'>
      
      <input type={isRevealPwd ? "text" : "password"}
      name="Password"
      id='info'
      onChange={e => setPwd(e.target.value)}
      placeholder="Enter your Password" {...register("Password")}/>
      
      <img
      title={isRevealPwd ? "Hide password" : "Show password"}
      src={isRevealPwd ? hidePwdImg : showPwdImg}
      alt=''
      onClick={() => setIsRevealPwd(prevState => !prevState)}
    />
    <p id="error">{errors.Password?.message}</p>
    </div>
      <p id='error'>{errors.Password?.message}</p>
      <input type="submit" value="Login" id="submit" onClick={handleSubmit(submitForm)} />
      
    </React.Fragment>
  );
}

function RegisterForm() {
  const schema=yup.object().shape({
    UserName : yup.string().max(15).required(),
    Email : yup.string().email().required(),
    Password : yup.string().min(8).max(20).required(),
    ConfirmPassword:yup.string().required().oneOf([yup.ref('NewPassword'),null],"Paswords Mismatch")
})

const [setCPwd, setPwd] = useState('');
const [isRevealCPwd, setIsRevealCPwd] = useState(false);

const [isRevealPwd, setIsRevealPwd] = useState(false);

  const {register,handleSubmit,formState:{errors}}=useForm({
    resolver: yupResolver(schema)
});

const regForm =(data)=>{
    console.log(data);
}
  return (
    <React.Fragment>
      <label for="fullname" id='info'>Name</label>
      <input type="text" name="UserName" placeholder="Enter your Name" {...register("UserName")}/>
      <p id="error">{errors.UserName?.message}</p>
      <label for="email" id='info'>Email</label>
      <input type="text" name="Email" placeholder="Enter your Email" {...register("Email")} />
      <p id="error">{errors.Email?.message}</p>
      <label for="password" id='info'>Password</label>
      <div className='pwd-container'>
      <input type={isRevealPwd ? "text" : "password"}
      name="Password"
      id='info'
      onChange={e => setPwd(e.target.value)}
      placeholder="Enter your Password" {...register("Password")}/>
      <img
      title={isRevealPwd ? "Hide password" : "Show password"}
      src={isRevealPwd ? hidePwdImg : showPwdImg}
      alt=''
      onClick={() => setIsRevealPwd(prevState => !prevState)}
    />
      <p id="error">{errors.Password?.message}</p>
      </div>
      
      <label for="password">Confirm Password</label>
      <div className='pwd-container'>
      <input type={isRevealCPwd ? "text" : "password"}
      name="ConfirmPassword"
      id='info'
      placeholder="Enter Password Again"
      onChange={d => setCPwd(d.target.value)}
      {...register("ConfirmPassword")}/>
      
      <img
      title={isRevealCPwd ? "Hide password" : "Show password"}
      src={isRevealCPwd ? hidePwdImg : showPwdImg}
      alt=''
      onClick={() => setIsRevealCPwd(prevState => !prevState)}
    />
     
      <p id="error">{errors.ConfirmPassword?.message}</p>
      </div>
      <input type="submit" value="Register" id="submit" onClick={handleSubmit(regForm)} />
    </React.Fragment>
  );
}

export default Teacher;