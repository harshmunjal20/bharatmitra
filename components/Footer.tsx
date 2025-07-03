import React from 'react';
import { FaFacebookF, FaXTwitter, FaLinkedinIn, FaYoutube, FaInstagram } from 'react-icons/fa6';

const Footer: React.FC = () => {
  return (
    <footer className="bg-bharat-blue-800 text-white mt-8">
      <div className="container mx-auto px-4 py-6  text-center">
        <div className="flex justify-center gap-4 mb-4  ">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:text-[#1877F2] transition duration-300 text-xl"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:text-black transition duration-300 text-xl"
          >
            <FaXTwitter />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:text-[#0A66C2] transition duration-300 text-xl"
          >
            <FaLinkedinIn />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:text-[#FF0000] transition duration-300 text-xl"
          >
            <FaYoutube />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:text-[#C13584] transition duration-300 text-xl"
          >
            <FaInstagram />
          </a>
        </div>

        <p>&copy; {new Date().getFullYear()} Bharat Mitra. All Rights Reserved.</p>
        <p className="text-sm text-bharat-blue-300 mt-1">Jai Hind! 🇮🇳</p>
      </div>
    </footer>
  );
};

export default Footer;
