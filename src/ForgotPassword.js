import React,{useState} from "react";
import { useForm } from 'react-hook-form';
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./style.css";
import showPwdImg from './show-password.svg';
import hidePwdImg from './hide-password.svg';
  

function ForgotPassword() {
  const schema=yup.object().shape({
    UserName : yup.string().max(30).required(),
    
    NewPassword:yup.string().required().min(8).max(20),
    ConfirmPassword:yup.string().required().oneOf([yup.ref('NewPassword'),null],"Paswords Mismatch")
})

const [setCPwd, setPwd] = useState('');
const [isRevealCPwd, setIsRevealCPwd] = useState(false);

const [isRevealPwd, setIsRevealPwd] = useState(false);

  const {register,handleSubmit,formState:{errors}}=useForm({
    resolver: yupResolver(schema)
});

const submitForm =(data)=>{
    console.log(data);
    
}
  return (
    <div className="login-register-wrapper">
    <p className="login-title">Reset Password</p>
    <div className="form-group">
    <React.Fragment>
      <label for="username">Username</label>
      <input type="text" name="UserName" placeholder="Enter your Username"  {...register("UserName")}/>
      <p id='error'>{errors.UserName?.message}</p>

      <label for="password">New Password</label>
      <div className='pwd-container'>

      <input type={isRevealPwd ? "text" : "password"}
      name="Password"
      id='info'
      onChange={e => setPwd(e.target.value)}
      placeholder="Enter your Password" {...register("NewPassword")}/>
      <img
      title={isRevealPwd ? "Hide password" : "Show password"}
      src={isRevealPwd ? hidePwdImg : showPwdImg}
      alt=''
      onClick={() => setIsRevealPwd(prevState => !prevState)}
    />
      <p id='error'>{errors.NewPassword?.message}</p>

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
      <p id='error'>{errors.ConfirmPassword?.message}</p>
      </div>
      <input type="submit" value="Reset" id='submit' onClick={handleSubmit(submitForm)}/>
      
      <h5><a href="/teacher" className="a-link">Login</a></h5>
    </React.Fragment>
    </div>
    </div>
  );
}  


export default ForgotPassword;