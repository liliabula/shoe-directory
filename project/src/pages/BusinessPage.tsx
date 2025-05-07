import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Phone, Globe, Star, ThumbsUp, ThumbsDown, ChevronRight } from 'lucide-react';
import { getBusinessById, getAllBusinesses, Business } from '../api/businessData';

const BusinessPage: React.FC = () => {
  const { businessId } = useParams<{ businessId: string }>();
  const [business, setBusiness] = useState<Business | null>(null);
  const [relatedBusinesses, setRelatedBusinesses] = useState<Business[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBusinessData = async () => {
      if (!businessId) return;
      
      setIsLoading(true);
      try {
        const businessData = await getBusinessById(businessId);
        setBusiness(businessData);

        if (businessData && businessData.location.city.toLowerCase() !== 'nan') {
          // Get related businesses in the same city
          const allBusinesses = await getAllBusinesses();
          const related = allBusinesses
            .filter(b => 
              b.id !== businessId && 
              b.location.city.toLowerCase() === businessData.location.city.toLowerCase()
            )
            .slice(0, 3);
          
          setRelatedBusinesses(related);
        }
      } catch (error) {
        console.error('Error fetching business data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBusinessData();
  }, [businessId]);

  if (isLoading) {
    return (
      <div className="pt-20 pb-16 bg-gray-50 min-h-screen">
        <div className="container-custom">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8 animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-6"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-1/3 mb-8"></div>
            <div className="h-32 bg-gray-200 rounded w-full mb-6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!business) {
    return (
      <div className="pt-20 pb-16 bg-gray-50 min-h-screen">
        <div className="container-custom">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Business Not Found</h1>
            <p className="text-gray-600 mb-6">
              The shoe repair shop you're looking for doesn't exist or may have been removed.
            </p>
            <Link to="/directory" className="btn-primary">
              Return to Directory
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-16 bg-gray-50 min-h-screen">
      <div className="container-custom">
        {/* Breadcrumb */}
        <nav className="flex text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-amber-600 transition-colors">Home</Link>
          <ChevronRight size={16} className="mx-2" />
          <Link to="/directory" className="hover:text-amber-600 transition-colors">Directory</Link>
          <ChevronRight size={16} className="mx-2" />
          <span className="text-gray-700">{business.name}</span>
        </nav>

        {/* Business Header */}
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-800 mb-3">{business.name}</h1>
              
              {business.business_info.rating > 0 && (
                <div className="flex items-center mb-4">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star 
                        key={star} 
                        size={20} 
                        className={`${
                          star <= Math.round(business.business_info.rating) 
                            ? 'fill-amber-500 text-amber-500' 
                            : 'text-gray-300'
                        } mr-1`} 
                      />
                    ))}
                  </div>
                  <span className="ml-2 font-semibold text-gray-700">
                    {business.business_info.rating.toFixed(1)}
                    <span className="text-gray-500 font-normal ml-1">
                      ({business.reviews.length} {business.reviews.length === 1 ? 'review' : 'reviews'})
                    </span>
                  </span>
                </div>
              )}
              
              <div className="space-y-3 mb-6">
                {/* Location */}
                <div className="flex items-start">
                  <MapPin size={18} className="mr-2 text-gray-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">
                    {business.location.street}<br />
                    {business.location.city !== 'nan' ? business.location.city + ', ' : ''}{business.location.state} {business.location.zip_code}
                  </span>
                </div>
                
                {/* Phone */}
                {business.contact.phone && (
                  <div className="flex items-center">
                    <Phone size={18} className="mr-2 text-gray-500 flex-shrink-0" />
                    <a 
                      href={`tel:${business.contact.phone.replace(/[^0-9]/g, '')}`} 
                      className="text-gray-700 hover:text-amber-600 transition-colors"
                    >
                      {business.contact.phone}
                    </a>
                  </div>
                )}
                
                {/* Website */}
                {business.contact.website && (
                  <div className="flex items-center">
                    <Globe size={18} className="mr-2 text-gray-500 flex-shrink-0" />
                    <a 
                      href={business.contact.website.startsWith('http') ? business.contact.website : `http://${business.contact.website}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-amber-600 hover:text-amber-700 transition-colors"
                    >
                      Visit Website
                    </a>
                  </div>
                )}
              </div>
            </div>
            
            {/* Map Placeholder */}
            <div className="w-full md:w-1/3 h-48 bg-gray-200 rounded-lg relative overflow-hidden">
              <iframe 
                title={`Map location of ${business.name}`}
                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyAznQrNqi-QOFnyBBYb2nxKRUEkUU8XBT4&q=${encodeURIComponent(
                  `${business.name}, ${business.location.street}, ${business.location.city !== 'nan' ? business.location.city : ''}, ${business.location.state} ${business.location.zip_code}`
                )}`}
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
        
        {/* Business Description */}
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">About {business.name}</h2>
          <div className="prose max-w-none text-gray-700">
            {business.business_info.description !== "no data" ? (
              <p>{business.business_info.description}</p>
            ) : (
              <p>This shoe repair business offers professional services in Florida. Contact them directly for more information about their specific offerings and expertise.</p>
            )}
          </div>
        </div>
        
        {/* Photos */}
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Photo Gallery</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <img 
              src="https://images.pexels.com/photos/5214139/pexels-photo-5214139.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Shoe repair craftsman working" 
              className="rounded-lg h-64 w-full object-cover"
            />
            <img 
              src="https://images.pexels.com/photos/6046183/pexels-photo-6046183.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Leather shoes being repaired" 
              className="rounded-lg h-64 w-full object-cover"
            />
            <img 
              src="https://images.pexels.com/photos/5214173/pexels-photo-5214173.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Shoe repair tools" 
              className="rounded-lg h-64 w-full object-cover"
            />
          </div>
        </div>
        
        {/* Reviews */}
        {business.reviews.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Customer Reviews</h2>
            
            <div className="space-y-8">
              {business.reviews.map((review, index) => (
                <div key={index} className="border-b border-gray-200 last:border-0 pb-6 last:pb-0">
                  <div className="flex items-center mb-3">
                    <div className="bg-gray-200 rounded-full h-10 w-10 flex items-center justify-center mr-3">
                      <span className="text-gray-600 font-medium">
                        {review.type === 'positive' ? 'P' : 'N'}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star 
                            key={star} 
                            size={16} 
                            className={`${
                              star <= review.rating 
                                ? 'fill-amber-500 text-amber-500' 
                                : 'text-gray-300'
                            } mr-1`} 
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">Customer Review</span>
                    </div>
                    <div className="ml-auto">
                      <span className={`flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        review.type === 'positive' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {review.type === 'positive' ? (
                          <ThumbsUp size={14} className="mr-1" />
                        ) : (
                          <ThumbsDown size={14} className="mr-1" />
                        )}
                        {review.type.charAt(0).toUpperCase() + review.type.slice(1)}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-700 whitespace-pre-line">{review.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Related Businesses */}
        {relatedBusinesses.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Other Shoe Repair Shops in {business.location.city}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedBusinesses.map((relatedBusiness) => (
                <Link 
                  key={relatedBusiness.id}
                  to={`/directory/${relatedBusiness.id}`}
                  className="card hover-lift"
                >
                  <div className="p-5">
                    <h3 className="font-bold text-slate-800 mb-2">{relatedBusiness.name}</h3>
                    
                    {relatedBusiness.business_info.rating > 0 && (
                      <div className="flex items-center mb-3">
                        <Star size={16} className="fill-amber-500 text-amber-500 mr-1" />
                        <span className="text-gray-700">{relatedBusiness.business_info.rating.toFixed(1)}</span>
                      </div>
                    )}
                    
                    <div className="flex items-center text-gray-500 mb-3">
                      <MapPin size={14} className="mr-1 flex-shrink-0" />
                      <span className="text-sm">{relatedBusiness.location.street}</span>
                    </div>
                    
                    <span className="text-amber-600 font-medium text-sm">
                      View details →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BusinessPage;