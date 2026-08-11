import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import config from '../config';
import '../styles/auth.css'

const Verify = () => {
    const [otp, setOtp] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    // email pass from register page
    const email = location.state?.email;

    const handleverify = async(e)=>{
        e.preventDefault();

        if(!otp || otp.length !== 6){
            alert('please enter valid otp');
            return;
        }
        if(!email){
            alert('email not found register again');
            navigate('/register');
        }

        try {
            const res = await fetch(`${config.API_URL}/auth/verify-otp`,{
                method:'post',
                headers:{"Content-type":"application/json"},
                body:JSON.stringify({email,otp})
            });
            const data = await res.json();
            if(res.ok){
                alert('otp verified successfully');
                navigate('/login');
            }
            else{
                alert(data.message);
            }

        } catch (error) {
            console.log(error);
            alert("Something went wrong");
        }
    }



  return (
    <div className='verify-container'>
        <div className='verify-box'>
            <h2>Verify OTP</h2> 
            <p>OTP sent to: {email}</p> 
            <form onSubmit={handleverify}> 
            <input type="text" placeholder="Enter 6 digit OTP" value={otp} onChange={(e) => setOtp(e.target.value)} maxLength="6" required /> 
            <button type="submit"> Verify OTP </button> 
        </form>
        </div>
    </div>
  )
}

export default Verify
