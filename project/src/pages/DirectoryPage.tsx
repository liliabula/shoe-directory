import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, MapPin, Phone, Star, Filter, X } from 'lucide-react';
import { getAllBusinesses, Business } from '../api/businessData';

const DirectoryPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [filteredBusinesses, setFilteredBusinesses] = useState<Business[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    city: '',
    minRating: 0,
    maxRating: 5,
  });
  const [showFilters, setShowFilters] = useState(false);
  const [uniqueCities, setUniqueCities] = useState<string[]>([]);
  
  const businessesPerPage = 10;

  useEffect(() => {
    // Get search params from URL
    const params = new URLSearchParams(location.search);
    const cityParam = params.get('city');
    const searchParam = params.get('search');
    
    if (cityParam) {
      setFilters(prev => ({ ...prev, city: cityParam }));
    }
    
    if (searchParam) {
      setSearchTerm(searchParam);
    }
    
    // Fetch all businesses
    const fetchBusinesses = async () => {
      try {
        const data = await getAllBusinesses();
        setBusinesses(data);
        
        // Extract unique cities
        const cities = Array.from(new Set(
          data
            .map(business => business.location.city)
            .filter(city => city && city.toLowerCase() !== 'nan')
        )).sort();
        
        setUniqueCities(cities);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching businesses:', error);
        setIsLoading(false);
      }
    };
    
    fetchBusinesses();
  }, [location.search]);
  
  useEffect(() => {
    // Apply filters and search
    let results = [...businesses];
    
    // Apply city filter
    if (filters.city) {
      results = results.filter(business => 
        business.location.city.toLowerCase() === filters.city.toLowerCase()
      );
    }
    
    // Apply rating filter
    results = results.filter(business => 
      business.business_info.rating >= filters.minRating && 
      business.business_info.rating <= filters.maxRating
    );
    
    // Apply search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(business => 
        business.name.toLowerCase().includes(term) || 
        (business.location.city.toLowerCase() !== 'nan' && business.location.city.toLowerCase().includes(term)) ||
        business.location.street.toLowerCase().includes(term) ||
        business.business_info.description.toLowerCase().includes(term)
      );
    }
    
    setFilteredBusinesses(results);
    setCurrentPage(1); // Reset to first page when filters change
  }, [businesses, filters, searchTerm]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Update URL with search params
    const params = new URLSearchParams(location.search);
    if (searchTerm) {
      params.set('search', searchTerm);
    } else {
      params.delete('search');
    }
    
    navigate(`${location.pathname}?${params.toString()}`);
  };
  
  const handleFilterChange = (name: string, value: string | number) => {
    setFilters(prev => {
      const newFilters = { ...prev, [name]: value };
      
      // Update URL with filter params
      const params = new URLSearchParams(location.search);
      if (name === 'city' && value) {
        params.set('city', value as string);
      } else if (name === 'city') {
        params.delete('city');
      }
      
      navigate(`${location.pathname}?${params.toString()}`);
      return newFilters;
    });
  };
  
  const clearFilters = () => {
    setFilters({
      city: '',
      minRating: 0,
      maxRating: 5,
    });
    setSearchTerm('');
    navigate(location.pathname);
  };
  
  // Pagination
  const totalPages = Math.ceil(filteredBusinesses.length / businessesPerPage);
  const indexOfLastBusiness = currentPage * businessesPerPage;
  const indexOfFirstBusiness = indexOfLastBusiness - businessesPerPage;
  const currentBusinesses = filteredBusinesses.slice(indexOfFirstBusiness, indexOfLastBusiness);
  
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="pt-20 pb-16 bg-gray-50 min-h-screen">
      <div className="container-custom">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-3">
          Florida Shoe Repair Directory
        </h1>
        <p className="text-center text-gray-600 mb-10 max-w-3xl mx-auto">
          Browse our comprehensive list of shoe repair shops across Florida, filter by city or rating, and find the perfect craftsman to restore your footwear.
        </p>
        
        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-8">
          <form onSubmit={handleSearch} className="mb-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search by name, city, or service..."
                  className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button type="submit" className="bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 px-6 rounded-md transition duration-300 ease-in-out">
                Search
              </button>
              <button 
                type="button" 
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md transition duration-300 ease-in-out flex items-center"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter size={18} className="mr-2" />
                Filters
              </button>
            </div>
          </form>
          
          {/* Filters Panel */}
          {showFilters && (
            <div className="bg-gray-50 p-4 rounded-md border border-gray-200 mt-2 mb-2">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-800">Filter Results</h3>
                <button 
                  className="text-gray-500 hover:text-gray-700" 
                  onClick={() => setShowFilters(false)}
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* City Filter */}
                <div>
                  <label htmlFor="cityFilter" className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <select
                    id="cityFilter"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    value={filters.city}
                    onChange={(e) => handleFilterChange('city', e.target.value)}
                  >
                    <option value="">All Cities</option>
                    {uniqueCities.map((city, index) => (
                      <option key={index} value={city}>{city}</option>
                    ))}
                  </select>
                </div>
                
                {/* Rating Filter */}
                <div>
                  <label htmlFor="ratingFilter" className="block text-sm font-medium text-gray-700 mb-1">
                    Minimum Rating
                  </label>
                  <select
                    id="ratingFilter"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    value={filters.minRating}
                    onChange={(e) => handleFilterChange('minRating', Number(e.target.value))}
                  >
                    <option value="0">Any Rating</option>
                    <option value="3">3+ Stars</option>
                    <option value="4">4+ Stars</option>
                    <option value="4.5">4.5+ Stars</option>
                    <option value="5">5 Stars Only</option>
                  </select>
                </div>
                
                {/* Clear Filters Button */}
                <div className="flex items-end">
                  <button 
                    className="text-amber-600 hover:text-amber-700 font-medium transition duration-300 ease-in-out"
                    onClick={clearFilters}
                  >
                    Clear all filters
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* Active Filters Display */}
          {(filters.city || filters.minRating > 0 || searchTerm) && (
            <div className="flex flex-wrap gap-2 mt-2">
              {filters.city && (
                <span className="bg-gray-100 text-gray-800 text-sm py-1 px-3 rounded-full flex items-center">
                  City: {filters.city}
                  <button 
                    className="ml-2 text-gray-500 hover:text-gray-700" 
                    onClick={() => handleFilterChange('city', '')}
                  >
                    <X size={14} />
                  </button>
                </span>
              )}
              
              {filters.minRating > 0 && (
                <span className="bg-gray-100 text-gray-800 text-sm py-1 px-3 rounded-full flex items-center">
                  Rating: {filters.minRating}+ stars
                  <button 
                    className="ml-2 text-gray-500 hover:text-gray-700" 
                    onClick={() => handleFilterChange('minRating', 0)}
                  >
                    <X size={14} />
                  </button>
                </span>
              )}
              
              {searchTerm && (
                <span className="bg-gray-100 text-gray-800 text-sm py-1 px-3 rounded-full flex items-center">
                  Search: {searchTerm}
                  <button 
                    className="ml-2 text-gray-500 hover:text-gray-700" 
                    onClick={() => setSearchTerm('')}
                  >
                    <X size={14} />
                  </button>
                </span>
              )}
            </div>
          )}
        </div>
        
        {/* Results Summary */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            {isLoading ? (
              <div className="bg-gray-200 animate-pulse h-8 w-64 rounded"></div>
            ) : (
              <>
                {filteredBusinesses.length} 
                {filteredBusinesses.length === 1 ? ' Shop' : ' Shops'} Found
                {filters.city && ` in ${filters.city}`}
              </>
            )}
          </h2>
        </div>
        
        {/* Business Listings */}
        {isLoading ? (
          <div className="space-y-6">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
                <div className="h-7 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-5 bg-gray-200 rounded w-1/4 mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {currentBusinesses.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No results found</h3>
                <p className="text-gray-600 mb-4">
                  We couldn't find any shoe repair shops matching your criteria.
                </p>
                <button 
                  className="text-amber-600 hover:text-amber-700 font-medium transition duration-300 ease-in-out"
                  onClick={clearFilters}
                >
                  Clear all filters and try again
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {currentBusinesses.map((business) => (
                  <Link 
                    key={business.id}
                    to={`/directory/${business.id}`}
                    className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="p-6">
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                        <div className="flex-grow">
                          <h3 className="text-xl font-bold text-slate-800 mb-2">{business.name}</h3>
                          <div className="flex items-center text-gray-500 mb-2">
                            <MapPin size={16} className="mr-2 flex-shrink-0" />
                            <span>
                              {business.location.street}, {" "}
                              {business.location.city !== 'nan' ? business.location.city : ""}, {business.location.state} {business.location.zip_code}
                            </span>
                          </div>
                          
                          {business.contact.phone && (
                            <div className="flex items-center text-gray-500 mb-3">
                              <Phone size={16} className="mr-2 flex-shrink-0" />
                              <span>{business.contact.phone}</span>
                            </div>
                          )}
                          
                          <p className="text-gray-600 mb-4 line-clamp-2">
                            {business.business_info.description !== "no data" 
                              ? business.business_info.description.substring(0, 150) + "..." 
                              : "This shoe repair business offers professional services in Florida. Contact them directly for more information about their specific offerings and expertise."}
                          </p>
                          
                          {business.reviews.length > 0 && (
                            <div className="text-gray-600 text-sm">
                              <span className="font-medium">{business.reviews.length} Review{business.reviews.length !== 1 ? 's' : ''}</span>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex flex-col items-end">
                          {business.business_info.rating > 0 && (
                            <div className="flex items-center mb-3">
                              <div className="flex items-center bg-amber-100 text-amber-800 px-3 py-2 rounded-lg">
                                <Star size={18} className={`${business.business_info.rating >= 4 ? 'fill-amber-500 text-amber-500' : 'text-amber-500'} mr-1`} />
                                <span className="font-bold">{business.business_info.rating.toFixed(1)}</span>
                              </div>
                            </div>
                          )}
                          
                          <div className="text-amber-600 font-medium mt-2">
                            View details →
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
            
            {/* Pagination */}
            {filteredBusinesses.length > businessesPerPage && (
              <div className="flex justify-center mt-10">
                <nav className="flex items-center space-x-2">
                  <button
                    onClick={() => paginate(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className={`px-3 py-1 rounded-md ${
                      currentPage === 1
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : 'bg-white text-gray-800 hover:bg-gray-100 border border-gray-300'
                    }`}
                  >
                    Previous
                  </button>
                  
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      // Show all pages if 5 or fewer
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      // Show first 5 pages
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      // Show last 5 pages
                      pageNum = totalPages - 4 + i;
                    } else {
                      // Show 2 before and 2 after current page
                      pageNum = currentPage - 2 + i;
                    }
                    
                    return (
                      <button
                        key={i}
                        onClick={() => paginate(pageNum)}
                        className={`px-3 py-1 rounded-md ${
                          currentPage === pageNum
                            ? 'bg-amber-500 text-white'
                            : 'bg-white text-gray-800 hover:bg-gray-100 border border-gray-300'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  
                  <button
                    onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-1 rounded-md ${
                      currentPage === totalPages
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : 'bg-white text-gray-800 hover:bg-gray-100 border border-gray-300'
                    }`}
                  >
                    Next
                  </button>
                </nav>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DirectoryPage;