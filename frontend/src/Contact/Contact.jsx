import './Contact.css';
import { useState } from 'react';

const Contact = () => {
  const [statusMessage, setStatusMessage] = useState("");
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    const dataToSend = {
      ...formData,
      access_key: "24a3cf4e-1e6f-4fb3-866d-d8c70129ff0e"
    };

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(dataToSend)
    }).then((res) => res.json());

    if (res.success) {
      setStatusMessage("Message sent successfully!");
      setFormData({ name: '', email: '', message: '' }); 
    } else {
      setStatusMessage("Failed to send message. Please try again.");
    }
  };

  return (
    <>
      <div className="contact-container">
        <form onSubmit={onSubmit} className="contact-left">
          <h2>Any Queries</h2>
          <input
            type="text"
            name="name"
            placeholder='Your name'
            className='contact-inputs'
            required
            value={formData.name}
            onChange={onChange}
          />
          <input
            type="email"
            name="email"
            placeholder='Your email'
            className='contact-inputs'
            required
            value={formData.email}
            onChange={onChange}
          />
          <textarea
            name="message"
            placeholder='Your message'
            rows='10'
            className='contact-input'
            required
            value={formData.message}
            onChange={onChange}
          ></textarea>
          <div className='btn'>
            <button type="submit">Submit</button>
          </div>
          {statusMessage && <p className="status-message">{statusMessage}</p>}
        </form>
      </div>
    </>
  );
};

export default Contact;
