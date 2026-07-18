import React,{useState,useContext} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext';
import '../styles/auth.css'

const Register = () => {
    const[name, setName] = useState('');
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const {login} = useContext(AuthContext);
    const navigate = useNavigate();

    const handlesubmit = async (e)=>{
        e.preventDefault();
        try {
            const res = await fetch('/api/auth/register',{
                method:'post',
                headers: {'Content-type':'application/json'},
                body: JSON.stringify({name,email,password})
            });
            const data = await res.json();
            if(res.ok){
                alert('registration successfull! please check your email for the welcome OTP.');
                login({...data.user,token:data.token});
                navigate('/');
            }
        } catch (error) {
            console.error(error);
        }

    }


  return (
    <div className='auth-container'>
      <form onSubmit={handlesubmit} className='auth-form'>
        <h2>Register</h2>
        <input type='text' placeholder='full name' value={name} onChange={(e)=>setName(e.target.value)} required/>
        <input type='email' placeholder='email' value={email} onChange={(e)=>setEmail(e.target.value)} required/>
        <input type='password' placeholder='enter password' value={password} onChange={(e)=>setPassword(e.target.value)} required/>
        <button type='submit' className='btn'>Register</button>
        <p>Already have an account? <Link to='/login'>Login</Link> </p>
      </form>
    </div>
  )
}

export default Register
