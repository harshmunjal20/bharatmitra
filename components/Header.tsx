import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AshokaChakraIcon } from './icons/AshokaChakraIcon';
import { TokenIcon } from './icons/TokenIcon';
import { UserContext } from '../contexts/UserContext';

const Header: React.FC = () => {
  const { tokenBalance, language, setLanguage } = useContext(UserContext);
  const linkStyle = "text-gray-600 hover:text-bharat-blue-700 transition-colors duration-200 px-3 py-2 rounded-md font-medium text-sm";
  const activeLinkStyle = "text-bharat-blue-700 bg-bharat-blue-100";

  return (
    <header className="bg-white/80 backdrop-blur-sm shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-4">
            <AshokaChakraIcon className="h-10 w-10 text-bharat-blue-800" />
            <h1 className="text-xl md:text-2xl font-bold text-bharat-blue-900">Bharat Mitra</h1>
          </div>
          <nav className="hidden md:flex items-center space-x-1">
            <NavLink to="/" className={({ isActive }) => `${linkStyle} ${isActive ? activeLinkStyle : ''}`}>Home</NavLink>
            <NavLink to="/chat" className={({ isActive }) => `${linkStyle} ${isActive ? activeLinkStyle : ''}`}>Chat</NavLink>
            <NavLink to="/voice-chat" className={({ isActive }) => `${linkStyle} ${isActive ? activeLinkStyle : ''}`}>Voice Chat</NavLink>
            <NavLink to="/benefits" className={({ isActive }) => `${linkStyle} ${isActive ? activeLinkStyle : ''}`}>Benefits</NavLink>
            <NavLink to="/scholarships" className={({ isActive }) => `${linkStyle} ${isActive ? activeLinkStyle : ''}`}>Scholarships</NavLink>
            <NavLink to="/leaderboard" className={({ isActive }) => `${linkStyle} ${isActive ? activeLinkStyle : ''}`}>Leaderboard</NavLink>
            <NavLink to="/redeem" className={({ isActive }) => `${linkStyle} ${isActive ? activeLinkStyle : ''}`}>Redeem</NavLink>
          </nav>
          <div className="flex items-center space-x-4">
            <div className="flex items-center bg-gray-200 rounded-full p-1">
                <button 
                    onClick={() => setLanguage('en')}
                    className={`px-3 py-1 text-sm font-semibold rounded-full transition-colors ${language === 'en' ? 'bg-white text-bharat-blue-800 shadow' : 'text-gray-600'}`}
                >
                    English
                </button>
                <button 
                    onClick={() => setLanguage('hi')}
                    className={`px-3 py-1 text-sm font-semibold rounded-full transition-colors ${language === 'hi' ? 'bg-white text-bharat-blue-800 shadow' : 'text-gray-600'}`}
                >
                    हिंदी
                </button>
            </div>
            <div className="flex items-center space-x-3 bg-bharat-green-100 border border-bharat-green-200 px-4 py-2 rounded-full shadow-sm">
              <TokenIcon className="h-6 w-6 text-bharat-green-600" />
              <span className="font-bold text-lg text-gray-900">{tokenBalance}</span>
              <span className="text-sm font-medium hidden sm:inline text-gray-700">{language === 'hi' ? 'टोकन' : 'Tokens'}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;