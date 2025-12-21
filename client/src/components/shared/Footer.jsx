import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-20">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* Left side: Branding */}
        <div className="mb-4 md:mb-0">
          <h2 className="text-xl font-bold">CampusConnect</h2>
          <p className="text-sm text-gray-400">
            Connecting students with their dream colleges
          </p>
        </div>

        {/* Middle: Links */}
        <div className="flex space-x-6 mb-4 md:mb-0">
          <a href="/" className="hover:text-primary transition">
            Home
          </a>
          <a href="/colleges" className="hover:text-primary transition">
            Colleges
          </a>
          <a href="/admission" className="hover:text-primary transition">
            Admission
          </a>
          <a href="/my-college" className="hover:text-primary transition">
            My College
          </a>
        </div>

        {/* Right side: Socials */}
        <div className="flex space-x-4">
          <a href="#" className="hover:text-primary transition">
            <i className="fab fa-facebook-f"></i> Facebook
          </a>
          <a href="#" className="hover:text-primary transition">
            <i className="fab fa-twitter"></i> Twitter
          </a>
          <a href="#" className="hover:text-primary transition">
            <i className="fab fa-instagram"></i> Instagram
          </a>
        </div>
      </div>

      <div className="text-center text-gray-500 text-sm mt-6">
        &copy; {new Date().getFullYear()} CampusConnect. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
