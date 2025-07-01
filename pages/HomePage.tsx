import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AshokaChakraIcon } from '../components/icons/AshokaChakraIcon';

const testimonials = [
  {
    name: 'Anjali, B.Tech Student',
    message:
      'Bharat Mitra helped me find a scholarship I never knew existed. It made a real difference!',
  },
  {
    name: 'Rajeev, Farmer from MP',
    message:
      'I got info on PM-KISAN easily. The chatbot spoke in Hindi and made it simple!',
  },
  {
    name: 'Meena, Homemaker',
    message:
      'I found health schemes for my family with just one question. Great work!',
  },
];

const HomePage: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen px-6 py-12 bg-fixed bg-[url('https://www.transparenttextures.com/patterns/flower.png')] bg-red-50 bg-blend-overlay bg-opacity-90 text-center">
      {/* Ashoka Chakra */}
      <div className="flex justify-center items-center mb-6 animate-fade-in">
        <AshokaChakraIcon className="h-24 w-24 text-bharat-blue-800 animate-spin-slow" />
      </div>

      {/* Headline */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-bharat-blue-900 mb-4 drop-shadow-md animate-fade-in-up">
        🇮🇳 Welcome to Bharat Mitra
      </h1>

      {/* Subheading */}
      <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-8 animate-fade-in-up delay-200">
        Your trusted AI assistant for navigating Indian government schemes. Ask in your own language and get clear answers about scholarships, farmer support, and citizen benefits.
      </p>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12 animate-fade-in-up delay-300">
        <Link
          to="/chat"
          className="bg-bharat-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-bharat-blue-800 transform hover:scale-105 transition-all shadow-lg"
        >
          Start Asking Questions
        </Link>
        <Link
          to="/benefits"
          className="bg-bharat-saffron-500 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-bharat-saffron-600 transform hover:scale-105 transition-all shadow-lg"
        >
          View Recommended Benefits
        </Link>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left animate-fade-in-up delay-500 mb-16">
        <div className="bg-white p-6 rounded-2xl shadow-xl border-t-4 border-bharat-blue-500 transition hover:scale-[1.02] hover:shadow-red-200">
          <h3 className="text-xl font-bold text-bharat-blue-900 mb-2">🎓 For Students</h3>
          <p className="text-gray-600">
            Find scholarships, educational loans, and skill development programs tailored for you.
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-xl border-t-4 border-bharat-green-500 transition hover:scale-[1.02] hover:shadow-red-200">
          <h3 className="text-xl font-bold text-bharat-blue-900 mb-2">🌾 For Farmers</h3>
          <p className="text-gray-600">
            Get crop insurance, subsidies for equipment, and income support schemes like PM-KISAN.
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-xl border-t-4 border-bharat-saffron-500 transition hover:scale-[1.02] hover:shadow-red-200">
          <h3 className="text-xl font-bold text-bharat-blue-900 mb-2">🏠 For All Citizens</h3>
          <p className="text-gray-600">
            Learn about Ayushman Bharat, housing schemes, and social welfare benefits for everyone.
          </p>
        </div>
      </div>

      {/* Testimonials Slider */}
      <div className="bg-white bg-opacity-90 p-8 rounded-xl shadow-lg max-w-3xl mx-auto animate-fade-in-up delay-700">
        <h2 className="text-2xl font-bold text-red-700 mb-6">✨ What People Are Saying</h2>
        <div className="relative h-32 overflow-hidden">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${
                idx === currentIndex
                  ? 'opacity-100 translate-x-0 scale-100'
                  : 'opacity-0 translate-x-full scale-95'
              }`}
            >
              <div className="bg-bharat-blue-50 border-l-4 border-bharat-saffron-600 text-left p-6 rounded shadow-md h-full flex flex-col justify-center">
                <p className="text-lg text-gray-800 italic mb-2">"{t.message}"</p>
                <p className="text-sm text-gray-600 font-semibold">- {t.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;