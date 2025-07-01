import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AshokaChakraIcon } from './icons/AshokaChakraIcon';
import { TokenIcon } from './icons/TokenIcon';
import { UserContext } from '../contexts/UserContext';

const Header: React.FC = () => {
  const { tokenBalance, language, setLanguage } = useContext(UserContext);

  const linkStyle =
    'text-gray-600 hover:text-bharat-blue-700 px-3 py-2 rounded-lg font-medium text-sm transition-all duration-200';
  const activeLinkStyle =
    'text-bharat-blue-800 bg-bharat-blue-100 shadow-inner';

  return (
    <header className="bg-white/80 backdrop-blur-sm shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo + Title */}
          <div className="flex items-center space-x-3">
            <AshokaChakraIcon className="h-10 w-10 text-bharat-blue-800" />
            <h1 className="text-xl md:text-2xl font-extrabold text-bharat-blue-900 tracking-tight">
              Bharat Mitra
            </h1>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            {[
              ['/', 'Home'],
              ['/chat', 'Chat'],
              ['/voice-chat', 'Voice Chat'],
              ['/benefits', 'Benefits'],
              ['/scholarships', 'Scholarships'],
              ['/leaderboard', 'Leaderboard'],
              ['/redeem', 'Redeem'],
            ].map(([to, label]) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `${linkStyle} ${isActive ? activeLinkStyle : ''}`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Language Toggle + Token Balance */}
          <div className="flex items-center gap-4">
            {/* Language Toggle */}
            <div className="flex items-center bg-gray-200 rounded-full px-1 py-1 transition shadow-sm">
              {['en', 'hi'].map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-3 py-1 text-sm font-semibold rounded-full transition-all duration-150 ${
                    language === lang
                      ? 'bg-white text-bharat-blue-800 shadow-sm'
                      : 'text-gray-600'
                  }`}
                >
                  {lang === 'en' ? 'English' : 'हिंदी'}
                </button>
              ))}
            </div>

            {/* Token Display */}
            <div className="flex items-center gap-2 bg-bharat-green-100 border border-bharat-green-200 px-4 py-2 rounded-full shadow-sm animate-fade-in">
              <TokenIcon className="h-5 w-5 text-bharat-green-600" />
              <span className="font-bold text-lg text-gray-900">
                {tokenBalance}
              </span>
              <span className="text-sm font-medium hidden sm:inline text-gray-700">
                {language === 'hi' ? 'टोकन' : 'Tokens'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
