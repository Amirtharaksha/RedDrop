import { useState, useEffect } from "react";
import './Recipient.css';
import Swal from 'sweetalert2';

export const Recipient = () => {
  const [formData, setFormData] = useState({
    bloodType: '',
    age: '',
    gender: '',
    reason: '',
    contactNumber: '',
    userId: ''
  });

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setFormData(prev => ({ ...prev, userId: storedUserId }));
    } else {
      alert("User not logged in");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3030/checkBloodAvailability?bloodType=${formData.bloodType}`);
      const data = await response.json();

      if (data.available) {
        const registerResponse = await fetch("http://localhost:3030/getRecipientData", {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        });

        const registerData = await registerResponse.json();

        if (registerData.message === "Recipient registered successfully") {
          Swal.fire({
            icon: 'success',
            title: 'Registered!',
            text: 'Recipient registered successfully!',
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Registration Failed',
            text: 'There was an error during registration.',
          });
        }
      } else {
        Swal.fire({
          icon: 'warning',
          title: 'Not Available',
          text: 'Requested blood type is not available at the moment.',
        });
      }
    } catch (err) {
      console.error("Error:", err);
      Swal.fire({
        icon: 'error',
        title: 'Oops!',
        text: 'Something went wrong. Please try again later.',
      });
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Recipient Registration</h2>
      <form onSubmit={handleSubmit}>
        
        <div className="form-group">
          <label>Blood Type:</label>
          <select 
            name="bloodType" 
            value={formData.bloodType} 
            onChange={handleChange} 
            required
          >
            <option value="">Select Blood Type</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>

        <div className="form-group">
          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Gender:</label>
          <select 
            name="gender" 
            value={formData.gender} 
            onChange={handleChange} 
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label>Reason for Request:</label>
          <input
            type="text"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Contact Number:</label>
          <input
            type="tel"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            pattern="[0-9]{10}"
            placeholder="10-digit mobile number"
            required
          />
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
};
