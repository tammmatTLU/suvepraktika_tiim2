import { useState, FormEvent, useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import "../Login.css"
import { useAuth } from '../context/AuthContext';
import ResetColors from '../components/TaastaVarv';


function Login() {

  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const { login, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      if (user.role === "admin") {
        navigate("/admin");

      } else if (user.role === "user") {
        navigate(`/user/${username}`);
      }
    }
  }, [user, navigate]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const success = await login(username, password);
    if (success) {
      const storedCount = localStorage.getItem(`${username}-Login:`);
      const count = storedCount ? parseInt(storedCount) + 1 : 1;
      localStorage.setItem(`${username}-Login:`, String(count));
    }
  };


  return (
    <>
    <ResetColors />
    <form className='login-form' onSubmit={handleSubmit}>
        <input type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setusername(e.target.value)}/>
        <input type="password"
          placeholder="password"
          value={password} 
          onChange={(e)=>setPassword(e.target.value)}/>
        <button>Logi sisse</button>
    </form>
    </>
  )
}

export default Login