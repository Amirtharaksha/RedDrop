import { useState  } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Login.css';
import axios from 'axios';

export const LogIn = ()=>{

    const navigate = useNavigate();

    const [formData , setFormData] = useState({
        firstName:'',
        lastName: '',
        email: '',
        password: '',
        role: 'donor',
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      };

      const handleLogin = (e) => {
        e.preventDefault();
      
        axios.post('http://localhost:3030/checkData', formData)
          .then(result => {
            console.log(result);
            if (result.data.success === true) {
              localStorage.setItem('userId', result.data.userId);
              localStorage.setItem('role', formData.role);
      
              if (formData.role === 'recipient') {
                navigate('/recipient');
              } else {
                navigate('/donor');
              }
            } else {
              alert(result.data.message); // show clear error
            }
          })
          .catch(err => {
            console.error("Login request failed:", err);
            alert("Something went wrong during login");
          });
      };
      

      const handleCreateAccount = () => {
         navigate('/register');
      };

    return (
        <div className="login-container">
          <h2 className="login-title">Login</h2>
          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <label>First Name:</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Last Name:</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Role:</label>
              <select name="role" value={formData.role} onChange={handleChange}>
                <option value="donor">Donor</option>
                <option value="recipient">Recipient</option>
              </select>
            </div>
            <button type="submit" className="login-button">Login</button>
          </form>
          <p className="create-account">
            Don’t have an account?{' '}
            <Link to='/register'>
            <button onClick={handleCreateAccount} className="create-account-button">
              Create Account
            </button>
            </Link>
            
          </p>
        </div>
      );
}