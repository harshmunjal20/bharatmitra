import React, { useState, useEffect } from 'react';

// Mock AshokaChakraIcon component since it's not available
const AshokaChakraIcon = ({ className }) => (
  <div className={`${className} border-4 border-current rounded-full flex items-center justify-center`}>
    <div className="text-2xl">☸</div>
  </div>
);

const testimonials = [
  {
    name: 'Anjali, B.Tech Student',
    message: 'Bharat Mitra helped me find a scholarship I never knew existed. It made a real difference!',
  },
  {
    name: 'Rajeev, Farmer from MP',
    message: 'I got info on PM-KISAN easily. The chatbot spoke in Hindi and made it simple!',
  },
  {
    name: 'Meena, Homemaker',
    message: 'I found health schemes for my family with just one question. Great work!',
  },
];

const HomePage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* 🔹 Background Video Section */}
      <div className="relative min-h-screen overflow-hidden text-center text-white">
        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          onError={(e) => console.error('Video loading error:', e)}
        >
          <source src="videonew.mp4" type="video/mp4" />
          <source src="videonew.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>

        {/* Fallback Background */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-900 via-purple-800 to-red-700 z-0"></div>

        <div className="relative z-10 px-6 py-12 backdrop-blur-sm bg-black/20 min-h-screen flex flex-col justify-center">
          {/* Ashoka Chakra */}
          <div className="flex justify-center items-center mb-6 animate-spin-slow">
            <AshokaChakraIcon className="h-20 w-20 text-white" />
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-md">
            🇮🇳 Welcome to Bharat Mitra
          </h1>

          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8">
            Your trusted AI assistant for navigating Indian government schemes. Ask in your own language and get clear answers about scholarships, farmer support, and citizen benefits.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12">
            <button className="bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-blue-800 transform hover:scale-105 transition-all shadow-lg">
              Start Asking Questions
            </button>
            <button className="bg-orange-500 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-orange-600 transform hover:scale-105 transition-all shadow-lg">
              View Recommended Benefits
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left mb-16">
            {[
              {
                title: '🎓 For Students',
                description: 'Find scholarships, educational loans, and skill development programs tailored for you.',
                border: 'border-blue-500',
              },
              {
                title: '🌾 For Farmers',
                description: 'Get crop insurance, subsidies for equipment, and income support schemes like PM-KISAN.',
                border: 'border-green-500',
              },
              {
                title: '🏠 For All Citizens',
                description: 'Learn about Ayushman Bharat, housing schemes, and social welfare benefits for everyone.',
                border: 'border-orange-500',
              },
            ].map((info, idx) => (
              <div
                key={idx}
                className={`bg-white/90 p-6 rounded-2xl shadow-xl border-t-4 ${info.border}`}
              >
                <h3 className="text-xl font-bold text-blue-900 mb-2">{info.title}</h3>
                <p className="text-gray-700">{info.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 🔸 Remaining Page Section (Testimonial + Marquee + FAQ) */}
      <div className="bg-red-50 px-6 py-16">
        {/* ✨ Testimonials */}
        <div className="bg-white bg-opacity-90 p-8 rounded-xl shadow-lg max-w-3xl mx-auto">
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
                <div className="bg-blue-50 border-l-4 border-orange-600 text-left p-6 rounded shadow-md h-full flex flex-col justify-center">
                  <p className="text-lg text-gray-800 italic mb-2">"{t.message}"</p>
                  <p className="text-sm text-gray-600 font-semibold">- {t.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 🌐 Bharat Knowledge Hub */}
        <div className="mt-24">
          <h2 className="text-3xl font-extrabold text-blue-900 mb-8 text-center flex items-center justify-center gap-2">
            📚 Bharat Knowledge Hub <span className="text-xl">🔍📖🧠</span>
          </h2>
          <div className="overflow-hidden">
            <div className="flex animate-marquee gap-6 px-6">
              {[
                {
                  title: 'National Scholarship Portal',
                  description: 'Find and apply for various scholarships with ease.',
                  image: 'https://via.placeholder.com/280x160/4F46E5/FFFFFF?text=NSP',
                },
                {
                  title: 'PM-KISAN Yojana',
                  description: 'Receive ₹6,000 annually in 3 installments directly in your bank.',
                  image: 'https://via.placeholder.com/280x160/059669/FFFFFF?text=PM-KISAN',
                },
                {
                  title: 'Ayushman Bharat',
                  description: "Free treatment up to ₹5 lakhs under the world's largest health scheme.",
                  image: 'https://via.placeholder.com/280x160/DC2626/FFFFFF?text=Ayushman',
                },
                {
                  title: 'Beti Bachao Beti Padhao',
                  description: 'Support for girl child education and safety.',
                  image: 'https://via.placeholder.com/280x160/7C2D12/FFFFFF?text=BBBP',
                },
              ].map((entry, idx) => (
                <div
                  key={idx}
                  className="relative min-w-[280px] max-w-xs rounded-xl overflow-hidden shadow-md hover:grayscale-0 transform hover:scale-105 transition-all duration-300 group bg-white"
                >
                  <img src={entry.image} alt={entry.title} className="w-full h-40 object-cover" />
                  <div className="p-4 flex flex-col justify-between h-40">
                    <h3 className="text-lg md:text-xl font-bold text-blue-900">{entry.title}</h3>
                    <p className="text-sm text-gray-600 mt-2">{entry.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ❓ FAQ Section */}
        <div className="mt-24 max-w-6xl mx-auto px-4">
          <h3 className="text-3xl font-bold text-red-700 mb-8 flex items-center gap-2">
            🤔 Frequently Asked Questions <span className="animate-ping text-lg">❓</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: '💬',
                title: 'Is this chatbot free?',
                answer: '🤖 Yes! Bharat Mitra is free for everyone and helps you access real schemes.',
              },
              {
                icon: '🔍',
                title: 'How accurate is the advice?',
                answer: '💬 We use trusted government APIs & datasets to answer your questions.',
              },
              {
                icon: '🇮🇳',
                title: 'Can I ask in Hindi?',
                answer: '✅ Absolutely! Speak or type in Hindi, and the chatbot will respond in Hindi.',
              },
              {
                icon: '📚',
                title: 'What kind of schemes can I ask about?',
                answer: '🎯 You can ask about education, farming, health, housing, employment and more.',
              },
              {
                icon: '🖥️',
                title: 'Do I need to install any app?',
                answer: '🌐 No installation needed — just open the website and start chatting!',
              },
              {
                icon: '🔒',
                title: 'Is my data safe?',
                answer: '🛡️ Absolutely. We don't collect any personal data or store your queries.',
              },
            ].map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 group hover:brightness-105 hover:shadow-red-200 transition-all duration-500"
              >
                <div className="text-3xl mb-2">{faq.icon}</div>
                <h4 className="font-semibold text-blue-900 text-lg">{faq.title}</h4>
                <p className="text-gray-600 text-sm mt-1">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
        
        .animate-spin-slow {
          animation: spin 3s linear infinite;
        }
        
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  );
};

export default HomePage;
