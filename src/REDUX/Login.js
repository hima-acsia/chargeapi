
import React,{useState} from "react";
import axios from 'axios';
import './login.css';

const LoginForm = () =>
{
    const [username, setUsername] =useState();
    const [password, setPassword] =useState();
    const [message, setMessage]= useState();
    
    const url="https://onprem.digital.acsiatech.com/user/v8/user/token";
    const params= {

        //userName: 'krishna.balakrishnan@acsiatech.com',
       // password: 'Krishna@123',

        userName:username,
        password:password,
        grantType:'password',
        clientId: "admin_web_charging_lite",
        clientSecret:"CDPwYyOWnn3IwjJsCdc9M5Kjurm7GVC7",
    };

    const headers={                                     
        "Content-Type": "application/json",
        accountId : "100408",
      };

    const handlelogin= async(event) =>
    {
        event.preventDefault();
        try{

            if (username === 'krishna.balakrishnan@acsiatech.com' && password === 'Krishna@123') {
                setMessage('Login successful!');
              } else {
                setMessage('Invalid username or password');
              }
            const response= await axios.post(url,params,{headers})
           
            
            console.log('Login successful:', response.data);
           
        }catch (error) {
            console.error('Login error:', error);
        }
    }
    return(
        <div className="login">
          <form onSubmit= {handlelogin} >
          <input 
          type="text"
          id="username"
          value={username}
          onChange={(e)=> setUsername(e.target.value)}
          />

         <input 
          type="text"
          id="password"
          value={password}
          onChange={(e)=> setPassword(e.target.value)}
          />
      
          <button type="submit">Login</button> 
          <p>{message}</p>
          </form>
                
        </div>
    )

}
export default LoginForm;