import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from './firebase';
import Navbar from '../components/Navbar';
import emailjs from 'emailjs-com';
import Footer from '../components/Footer';

const About = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isLoggedIn, setIsLoggedIn] = useState(!!auth.currentUser);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        navigate('/login');
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    emailjs.send(
      'service_k7sdigm',           // your Service ID
      'template_kuw46ag',          // your Template ID
      {
        from_name: formData.name,
        reply_to: formData.email,
        message: formData.message,
      },
      'NlILcOjVoG2JjtQpD'          // your Public Key
    )
    .then((response) => {
      console.log('SUCCESS!', response.status, response.text);
      alert('Thanks for your message!');
      setFormData({ name: '', email: '', message: '' });
    })
    .catch((err) => {
      console.error('FAILED...', err);
      alert('Failed to send message. Please try again.');
    });
  };

  const navLinks = [
    { path: '/dashboard', name: 'MyDashboard', show: isLoggedIn },
    { path: '/mealmatch', name: 'MealMatch', show: true },
    { path: '/favourites', name: 'Favourites', show: isLoggedIn },
    { path: '/about', name: 'About Us', show: true },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <Navbar links={navLinks} isLoggedIn={isLoggedIn} />
      <div className="px-6 py-12 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-red-500 italic mb-4">About Cravo ....</h1>
        <p className="text-center text-gray-700 max-w-2xl mb-6 italic">
          <span className="font-semibold text-orange-400">Cravo</span> is a simple and smart meal planning webpage.
          You just enter your calorie goal, and Cravo gives you a full day meal plan. It's made to help you
          eat healthy, save time, and reach your fitness goals easily.
        </p>
        <p className="text-center text-gray-600 max-w-2xl mb-10 italic">
          You can also save your favorite meals and view the nutrition details just as you want. Whether you're trying to lose weight,
          stay fit, or just eat better — Cravo is here to guide you every day. A companion you crave forever.
        </p>
        <h2 className="text-2xl font-semibold text-orange-500 mb-4">Contact Us</h2>
        <form
          onSubmit={handleFormSubmit}
          className="w-full max-w-md bg-orange-50 p-6 rounded-lg shadow-md"
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full mb-4 px-4 py-2 border border-orange-300 rounded-md"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full mb-4 px-4 py-2 border border-orange-300 rounded-md"
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleInputChange}
            className="w-full mb-4 px-4 py-2 border border-orange-300 rounded-md"
            rows={4}
            required
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-500 to-red-400 text-white font-semibold py-2 rounded-md"
          >
            Send Message
          </button>
        </form>
      </div>
      <Footer/>
    </div>
  );
};

export default About;
