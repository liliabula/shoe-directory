import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, MapPin, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <Link to="/" className="inline-block mb-4">
              <span className="text-2xl font-bold">Sole<span className="text-amber-500">Connect</span></span>
            </Link>
            <p className="text-gray-300 mb-4">
              Connecting customers with Florida's finest shoe repair experts since 2025.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-gray-300 hover:text-amber-500 transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" className="text-gray-300 hover:text-amber-500 transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="https://instagram.com" className="text-gray-300 hover:text-amber-500 transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-amber-500 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/directory" className="text-gray-300 hover:text-amber-500 transition-colors">Directory</Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-300 hover:text-amber-500 transition-colors">Blog</Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-amber-500 transition-colors">FAQ</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-amber-500 transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-amber-500 transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Popular Cities */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Popular Cities</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/directory?city=Miami" className="text-gray-300 hover:text-amber-500 transition-colors">Miami</Link>
              </li>
              <li>
                <Link to="/directory?city=Orlando" className="text-gray-300 hover:text-amber-500 transition-colors">Orlando</Link>
              </li>
              <li>
                <Link to="/directory?city=Tampa" className="text-gray-300 hover:text-amber-500 transition-colors">Tampa</Link>
              </li>
              <li>
                <Link to="/directory?city=Jacksonville" className="text-gray-300 hover:text-amber-500 transition-colors">Jacksonville</Link>
              </li>
              <li>
                <Link to="/directory?city=Lakeland" className="text-gray-300 hover:text-amber-500 transition-colors">Lakeland</Link>
              </li>
              <li>
                <Link to="/directory?city=Fort+Lauderdale" className="text-gray-300 hover:text-amber-500 transition-colors">Fort Lauderdale</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={20} className="mr-2 text-amber-500 mt-1 flex-shrink-0" />
                <span className="text-gray-300">123 Directory Street, Tampa, FL 33602</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-2 text-amber-500 flex-shrink-0" />
                <span className="text-gray-300">(800) 555-SOLE</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-2 text-amber-500 flex-shrink-0" />
                <span className="text-gray-300">info@soleconnect.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 mt-8 border-t border-gray-700 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm">
              &copy; {currentYear} SoleConnect. All rights reserved.
            </p>
            <div className="mt-4 sm:mt-0">
              <ul className="flex space-x-4 text-sm">
                <li>
                  <Link to="/privacy" className="text-gray-300 hover:text-amber-500 transition-colors">Privacy Policy</Link>
                </li>
                <li>
                  <Link to="/terms" className="text-gray-300 hover:text-amber-500 transition-colors">Terms of Service</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;