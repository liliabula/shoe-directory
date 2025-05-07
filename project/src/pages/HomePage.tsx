import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Star, ChevronRight } from 'lucide-react';
import { getTopRatedBusinesses, getCitiesWithCount, Business } from '../api/businessData';

const HomePage: React.FC = () => {
  const [topBusinesses, setTopBusinesses] = useState<Business[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [topCities, setTopCities] = useState<{city: string; count: number}[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [businesses, cities] = await Promise.all([
          getTopRatedBusinesses(6),
          getCitiesWithCount()
        ]);
        
        setTopBusinesses(businesses);
        setTopCities(cities.filter(city => city.city.toLowerCase() !== 'nan').slice(0, 6));
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      window.location.href = `/directory?search=${encodeURIComponent(searchTerm)}`;
    }
  };

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section 
        className="relative bg-slate-900 text-white pt-20 pb-24"
        style={{
          backgroundImage: 'linear-gradient(rgba(15, 23, 42, 0.85), rgba(15, 23, 42, 0.95)), url(https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=1600)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-[fadeIn_0.6s_ease-in-out]">
              Find The Best Shoe Repair Shops In Florida
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 animate-[fadeIn_0.8s_ease-in-out]">
              Connect with skilled craftsmen who can breathe new life into your favorite footwear
            </p>

            {/* Search Form */}
            <form 
              onSubmit={handleSearch}
              className="max-w-xl mx-auto animate-[fadeIn_1s_ease-in-out]"
            >
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search by city, service, or business name..."
                    className="pl-10 pr-4 py-3 w-full rounded-md text-gray-800 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button type="submit" className="bg-amber-500 hover:bg-amber-600 text-white font-medium py-3 px-6 rounded-md transition duration-300 ease-in-out">
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Featured Cities */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">
            Popular Cities in Florida for Shoe Repair
          </h2>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="bg-gray-100 animate-pulse h-36 rounded-lg"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {topCities.map((cityData, index) => (
                <Link 
                  key={index}
                  to={`/directory?city=${encodeURIComponent(cityData.city)}`}
                  className="card hover-lift overflow-hidden"
                >
                  <div 
                    className="h-36 bg-gray-200 relative"
                    style={{
                      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.4)), url(https://images.pexels.com/photos/${3000000 + index * 53}/pexels-photo-${3000000 + index * 53}.jpeg?auto=compress&cs=tinysrgb&w=800)`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  >
                    <div className="absolute inset-0 flex flex-col justify-end p-4 text-white">
                      <h3 className="text-xl font-bold">{cityData.city}</h3>
                      <p className="flex items-center">
                        <MapPin size={16} className="mr-1" />
                        {cityData.count} shoe repair shops
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className="text-center mt-10">
            <Link 
              to="/directory" 
              className="inline-flex items-center text-amber-600 font-medium hover:text-amber-700 transition duration-300"
            >
              View all cities
              <ChevronRight size={16} className="ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Top Rated Shops */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-4">
            Top-Rated Shoe Repair Shops
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            Discover the highest-rated shoe repair professionals in Florida, known for their exceptional craftsmanship and service
          </p>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="bg-gray-100 animate-pulse h-64 rounded-lg"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {topBusinesses.map((business) => (
                <Link 
                  key={business.id}
                  to={`/directory/${business.id}`}
                  className="card hover-lift h-full"
                >
                  <div className="p-6 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-slate-800">{business.name}</h3>
                      <div className="flex items-center bg-amber-100 text-amber-800 px-2 py-1 rounded-md">
                        <Star size={16} className="fill-amber-500 text-amber-500 mr-1" />
                        <span className="font-medium">{business.business_info.rating.toFixed(1)}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-gray-500 mb-3">
                      <MapPin size={16} className="mr-1 flex-shrink-0" />
                      <span>
                        {business.location.city !== 'nan' 
                          ? `${business.location.city}, FL` 
                          : 'Florida'
                        }
                      </span>
                    </div>

                    <p className="text-gray-600 mb-4 flex-grow line-clamp-3">
                      {business.business_info.description.substring(0, 120)}...
                    </p>

                    <div className="mt-auto">
                      <span className="text-amber-600 font-medium inline-flex items-center">
                        View details
                        <ChevronRight size={16} className="ml-1" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className="text-center mt-10">
            <Link 
              to="/directory" 
              className="btn-primary"
            >
              View All Shoe Repair Shops
            </Link>
          </div>
        </div>
      </section>

      {/* Services & Info */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                Quality Shoe Repair Services in Florida
              </h2>
              <p className="text-gray-600 mb-6">
                Your favorite shoes deserve a second chance. Florida's skilled cobblers can restore worn soles, repair broken heels, replace worn insoles, and bring your beloved footwear back to life with expert craftsmanship.
              </p>
              <ul className="space-y-4 mb-8">
                <ServiceItem title="Sole Replacement & Repair">
                  From simple gluing to complete sole replacement, extend the life of your shoes.
                </ServiceItem>
                <ServiceItem title="Heel Repair & Replacement">
                  Fix broken heels or replace worn ones to restore comfort and stability.
                </ServiceItem>
                <ServiceItem title="Leather Care & Restoration">
                  Professional cleaning, conditioning, and color restoration for leather shoes.
                </ServiceItem>
                <ServiceItem title="Custom Orthotic Fitting">
                  Many shops offer specialized orthotic services for added comfort.
                </ServiceItem>
              </ul>
              <div className="flex flex-wrap gap-4">
                <Link to="/directory" className="btn-primary">
                  Find A Repair Shop
                </Link>
                <Link to="/blog" className="btn-secondary">
                  Read Our Shoe Care Tips
                </Link>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/4904563/pexels-photo-4904563.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Cobbler working on shoes" 
                className="rounded-lg shadow-xl w-full"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg hidden md:block">
                <div className="flex items-center">
                  <div className="bg-amber-500 rounded-full p-2 mr-3">
                    <Star size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="text-slate-800 font-bold">Expert Craftsmen</p>
                    <p className="text-gray-600 text-sm">Decades of experience</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        className="py-20 bg-slate-900 text-white"
        style={{
          backgroundImage: 'linear-gradient(rgba(15, 23, 42, 0.9), rgba(15, 23, 42, 0.9)), url(https://images.pexels.com/photos/5214139/pexels-photo-5214139.jpeg?auto=compress&cs=tinysrgb&w=1600)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Revitalize Your Favorite Footwear?
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
            Don't replace your beloved shoes — repair them! Find expert cobblers near you who can restore your footwear to like-new condition.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/directory" className="btn-primary px-8 py-3 text-lg">
              Browse All Repair Shops
            </Link>
            <Link to="/blog" className="bg-transparent text-white hover:bg-white hover:text-slate-900 border border-white font-medium px-8 py-3 rounded-md transition duration-300 ease-in-out text-lg">
              Read Our Blog
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

interface ServiceItemProps {
  title: string;
  children: React.ReactNode;
}

const ServiceItem: React.FC<ServiceItemProps> = ({ title, children }) => {
  return (
    <li className="flex">
      <div className="mr-3 mt-1 text-amber-500">
        <div className="w-5 h-5 rounded-full border-2 border-amber-500 flex items-center justify-center">
          <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
        </div>
      </div>
      <div>
        <h3 className="font-bold text-slate-800">{title}</h3>
        <p className="text-gray-600">{children}</p>
      </div>
    </li>
  );
};

export default HomePage;