// API file to handle all business data related operations

// Types
export interface Business {
  id: string;
  name: string;
  contact: {
    phone: string;
    website: string;
  };
  location: {
    street: string;
    city: string;
    state: string;
    zip_code: string;
    country: string;
  };
  business_info: {
    description: string;
    rating: number;
  };
  reviews: Array<{
    type: string;
    text: string;
    rating: number;
  }>;
}

export interface Metadata {
  total_businesses: number;
  generated_at: string;
  source: string;
  average_rating: number;
  total_rated_businesses: number;
}

export interface BusinessDataResponse {
  metadata: Metadata;
  businesses: Business[];
}

// Import the JSON data directly
import businessData from '../data/businessData.json';

// Get all businesses
export const getAllBusinesses = async (): Promise<Business[]> => {
  // Add IDs to businesses for easier reference
  const businesses = businessData.businesses.map((business, index) => ({
    ...business,
    id: index.toString(),
  }));
  
  return businesses;
};

// Get business by ID
export const getBusinessById = async (id: string): Promise<Business | null> => {
  const businesses = await getAllBusinesses();
  const business = businesses.find(b => b.id === id) || null;
  return business;
};

// Get businesses by city
export const getBusinessesByCity = async (city: string): Promise<Business[]> => {
  const businesses = await getAllBusinesses();
  const filteredBusinesses = businesses.filter(business => 
    business.location.city.toLowerCase() === city.toLowerCase()
  );
  
  return filteredBusinesses;
};

// Get top rated businesses
export const getTopRatedBusinesses = async (limit: number = 5): Promise<Business[]> => {
  const businesses = await getAllBusinesses();
  
  // Sort by rating (highest first) and filter out businesses with no rating
  const sortedBusinesses = businesses
    .filter(business => business.business_info.rating > 0)
    .sort((a, b) => b.business_info.rating - a.business_info.rating)
    .slice(0, limit);
  
  return sortedBusinesses;
};

// Get metadata
export const getMetadata = async (): Promise<Metadata> => {
  return businessData.metadata;
};

// Get cities with business counts
export const getCitiesWithCount = async (): Promise<{city: string, count: number}[]> => {
  const businesses = await getAllBusinesses();
  
  const cityMap = new Map<string, number>();
  
  businesses.forEach(business => {
    const city = business.location.city;
    if (city && city.toLowerCase() !== 'nan') {
      cityMap.set(city, (cityMap.get(city) || 0) + 1);
    }
  });
  
  // Convert map to array and sort by count descending
  const citiesCounts = Array.from(cityMap.entries())
    .map(([city, count]) => ({ city, count }))
    .sort((a, b) => b.count - a.count);
  
  return citiesCounts;
};

// Search businesses by term
export const searchBusinesses = async (term: string): Promise<Business[]> => {
  const businesses = await getAllBusinesses();
  
  if (!term.trim()) return businesses;
  
  const lowerTerm = term.toLowerCase().trim();
  
  const filteredBusinesses = businesses.filter(business => {
    return (
      business.name.toLowerCase().includes(lowerTerm) ||
      (business.location.city.toLowerCase() !== 'nan' && business.location.city.toLowerCase().includes(lowerTerm)) ||
      business.location.street.toLowerCase().includes(lowerTerm) ||
      business.business_info.description.toLowerCase().includes(lowerTerm)
    );
  });
  
  return filteredBusinesses;
};