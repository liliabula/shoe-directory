import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="pt-20 pb-16 bg-gray-50 min-h-screen flex items-center">
      <div className="container-custom">
        <div className="max-w-xl mx-auto text-center">
          <h1 className="text-6xl font-bold text-slate-800 mb-4">404</h1>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Page Not Found</h2>
          <p className="text-gray-600 mb-8">
            We're sorry, but the page you're looking for doesn't exist or has been moved.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/" className="flex items-center justify-center bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 px-6 rounded-md transition duration-300 ease-in-out">
              <Home size={18} className="mr-2" />
              Back to Home
            </Link>
            <Link to="/directory" className="flex items-center justify-center bg-white hover:bg-gray-100 text-gray-800 font-medium py-2 px-6 rounded-md border border-gray-300 transition duration-300 ease-in-out">
              <Search size={18} className="mr-2" />
              Search Directory
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;