import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './Home.css';
import axios from "axios";

export const Home = () => {
  const [counts, setCounts] = useState({ donors: 0, recipients: 0 });
  const [donors, setDonors] = useState([]);  // Ensure donors is initialized as an array
  const [recipients, setRecipients] = useState([]);  // Ensure recipients is initialized as an array
  const [showDetails, setShowDetails] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3030/countStats")
      .then(res => {
        setCounts(res.data);
      });
  }, []);

  const fetchDetails = (type) => {
    if (type === 'donor') {
      axios.get("http://localhost:3030/allDonors")
        .then(res => {
          // Ensure that res.data is an array
          if (Array.isArray(res.data)) {
            setDonors(res.data);
            setShowDetails('donor');
          } else {
            console.error("Expected an array, but got", res.data);
          }
        })
        .catch(error => {
          console.error("Error fetching donors:", error);
        });
    } else {
      axios.get("http://localhost:3030/allRecipients")
        .then(res => {
          // Ensure that res.data is an array
          if (Array.isArray(res.data)) {
            setRecipients(res.data);
            setShowDetails('recipient');
          } else {
            console.error("Expected an array, but got", res.data);
          }
        })
        .catch(error => {
          console.error("Error fetching recipients:", error);
        });
    }
  };

  return (
    <div className="homepage-container">
      <header className="banner">
        <h1>We value every drop ❤️</h1>
        <p>Your donation can save lives.</p>
      </header>

      <div className="stats-boxes">
        <div className="stat" onClick={() => fetchDetails('donor')}>
          <h2>{counts.donors}</h2>
          <p>Donors</p>
        </div>
        <div className="stat" onClick={() => fetchDetails('recipient')}>
          <h2>{counts.recipients}</h2>
          <p>Recipients</p>
        </div>
      </div>

      <div className="btn-box">
        <button onClick={() => navigate("/register")}>Register</button>
        <button onClick={() => navigate("/login")}>Login</button>
      </div>

      <div className="details-box">
        {showDetails === 'donor' && (
          <>
            <h3>Donor Details</h3>
            <ul className="donor-details">
              {donors.length > 0 ? (
                donors.map((donor, index) => (
                  <li key={index}>
                    <h4>Blood Type: {donor.bloodType}</h4>
                    <p>Age: {donor.age}, Gender: {donor.gender}</p>
                  </li>
                ))
              ) : (
                <p>No donor data available.</p>
              )}
            </ul>
          </>
        )}
        {showDetails === 'recipient' && (
          <>
            <h3>Recipient Details</h3>
            <ul className="recipient-details">
              {recipients.length > 0 ? (
                recipients.map((rec, index) => (
                  <li key={index}>
                    <h4>Blood Type: {rec.bloodType}</h4>
                    <p>Age: {rec.age}, Reason: {rec.reason}</p>
                  </li>
                ))
              ) : (
                <p>No recipient data available.</p>
              )}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};
