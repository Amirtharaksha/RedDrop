import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Register.css';

export const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    fetch("http://localhost:3030/getData",{
      method:'POST',
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data =>{
      console.log("Success" , data);
      navigate('/login');
    })
    .catch(err => console.error("Error: " , err));
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Register</h2>
      <form onSubmit={handleRegister} className="login-form">
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
        <button type="submit" className="login-button">Register</button>
      </form>
      <p className="create-account">
        Already have an account?{' '}
        <Link to='/login'><button className="create-account-button">
          Login
        </button></Link>
        
      </p>
    </div>
  );
};
