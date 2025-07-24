import './App.css';
import { LogIn } from './LogIn/LogIn';
import { Register } from './Register/Register';
import { Recipient } from './Recipient/Recipient';
import { Donor } from './Donor/Donor';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './Navbar/Navbar';
import { Home } from './Home/Home';
import Contact from './Contact/Contact';
import { Statistics } from './Statistics/Statistics';
import { BloodBank } from './BloodBank/BloodBank';



function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/recipient" element={<Recipient />} />
          <Route path="/donor" element={<Donor />} />
          <Route path='/contact' element = {<Contact />} />
          <Route path='/statistics' element = {<Statistics />} />
          <Route path='/bloodbank' element = {<BloodBank />} />
          
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
