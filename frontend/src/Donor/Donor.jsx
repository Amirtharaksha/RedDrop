import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';  // Imported SweetAlert2
import './Donor.css'; 

export const Donor = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    bloodType: '',
    customBloodType: '',
    age: '',
    gender: '',
    weight: '',
    height: '',
    lastDonation: '',
    donationCount: '',
    contactNumber: '',
    userId: ''
  });

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'Other'];

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      setFormData(prev => ({ ...prev, userId }));
    } else {
      Swal.fire("Error", "User not logged in. Please login again.", "error");
      navigate('/login');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.age < 18) {
      Swal.fire("Warning", "You must be at least 18 years old to donate.", "warning");
      return;
    }

    if (formData.weight < 50) {
      Swal.fire("Warning", "Your weight must be at least 50 kg to be eligible for donation.", "warning");
      return;
    }

    const finalBloodType = formData.bloodType === 'Other' ? formData.customBloodType : formData.bloodType;

    fetch("http://localhost:3030/getDonorData", {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, bloodType: finalBloodType })
    })
      .then(response => response.json())
      .then(data => {
        console.log("Success", data);
        Swal.fire({
          title: "Success!",
          text: "Donor registered successfully!",
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Go to Home"
        }).then(() => {
          navigate('/');
        });
      })
      .catch(err => {
        console.error("Error:", err);
        Swal.fire("Error", "Something went wrong. Please try again.", "error");
      });
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Donor Registration</h2>
      <form onSubmit={handleSubmit}>
        
        <div className="form-group">
          <label>Blood Type:</label>
          <select
            name="bloodType"
            value={formData.bloodType}
            onChange={handleChange}
            required
          >
            <option value="">Select Blood Group</option>
            {bloodGroups.map(group => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
        </div>

        {formData.bloodType === "Other" && (
          <div className="form-group">
            <label>Specify Blood Group:</label>
            <input
              type="text"
              name="customBloodType"
              value={formData.customBloodType}
              onChange={handleChange}
              placeholder="Enter your blood group"
              required
            />
          </div>
        )}

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
          <label>Weight (kg):</label>
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Height (cm):</label>
          <input
            type="number"
            name="height"
            value={formData.height}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Last Donation Date:</label>
          <input
            type="date"
            name="lastDonation"
            value={formData.lastDonation}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Total Donations Made:</label>
          <input
            type="number"
            name="donationCount"
            value={formData.donationCount}
            onChange={handleChange}
            min="0"
          />
        </div>

        <div className="form-group">
          <label>Contact Number:</label>
          <input
            type="tel"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="register-button">Register</button>
      </form>
    </div>
  );
};
