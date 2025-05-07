import React from 'react';
import { Link } from 'react-router-dom';
import { Map, Phone, Mail, Users, Star, Clock } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="pt-20 pb-16 bg-gray-50 min-h-screen">
      <div className="container-custom">
        {/* Hero Section */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-12">
          <div className="md:flex">
            <div className="md:w-1/2 p-6 md:p-10 flex flex-col justify-center">
              <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
                About SoleConnect
              </h1>
              <p className="text-gray-600 mb-6">
                SoleConnect is Florida's premier directory for shoe repair shops, connecting customers with skilled craftsmen who can extend the life of beloved footwear through expert repairs and restoration.
              </p>
              <p className="text-gray-600">
                Our mission is to promote sustainability by helping customers maintain and repair their footwear rather than replacing them, while supporting local artisans who keep the traditional craft of cobbling alive.
              </p>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://images.pexels.com/photos/4904563/pexels-photo-4904563.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Cobbler working on shoes" 
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
        
        {/* Our Story */}
        <div className="bg-white rounded-lg shadow-md p-6 md:p-10 mb-12">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Our Story</h2>
          
          <div className="space-y-6 text-gray-600">
            <p>
              SoleConnect was founded in 2025 by a group of Florida shoe enthusiasts who recognized the value of quality craftsmanship and the importance of extending the life of well-made footwear. After struggling to find comprehensive information about shoe repair services in Florida, we decided to create a solution.
            </p>
            <p>
              We began by visiting shoe repair shops across the state, meeting the skilled artisans who dedicate their lives to this craft. We were amazed by their expertise, many having learned their trade through generations of family tradition. Their stories and passion inspired us to create a platform that would connect these craftsmen with customers who need their services.
            </p>
            <p>
              Today, SoleConnect has grown to feature over 120 shoe repair businesses across Florida, with detailed information, authentic reviews, and essential resources to help both shoe owners and repair professionals. Our platform serves as a bridge between customers seeking quality repairs and the skilled cobblers who can provide them.
            </p>
            <p>
              Beyond just being a directory, we've become advocates for sustainable fashion and the preservation of traditional craftsmanship. Through our blog and educational resources, we encourage consumers to invest in quality footwear and maintain them properly, reducing waste and supporting local businesses.
            </p>
          </div>
        </div>
        
        {/* Directory Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard 
            icon={<Map className="h-8 w-8 text-amber-500" />}
            title="124"
            description="Shoe repair shops across Florida"
          />
          <StatCard 
            icon={<Users className="h-8 w-8 text-amber-500" />}
            title="1,000+"
            description="Satisfied customers helped"
          />
          <StatCard 
            icon={<Star className="h-8 w-8 text-amber-500" />}
            title="4.37"
            description="Average shop rating"
          />
          <StatCard 
            icon={<Clock className="h-8 w-8 text-amber-500" />}
            title="30+"
            description="Years average cobbler experience"
          />
        </div>
        
        {/* Our Values */}
        <div className="bg-white rounded-lg shadow-md p-6 md:p-10 mb-12">
          <h2 className="text-2xl font-bold text-slate-800 mb-8">Our Values</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-amber-50 rounded-lg">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-amber-800 text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Sustainability</h3>
              <p className="text-gray-600">
                We believe in extending the life of quality footwear through expert repair, reducing waste and environmental impact while preserving beloved shoes.
              </p>
            </div>
            
            <div className="p-6 bg-amber-50 rounded-lg">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-amber-800 text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Craftsmanship</h3>
              <p className="text-gray-600">
                We celebrate and support the skilled artisans who keep the traditional craft of cobbling alive, maintaining high standards of quality and expertise.
              </p>
            </div>
            
            <div className="p-6 bg-amber-50 rounded-lg">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-amber-800 text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Community</h3>
              <p className="text-gray-600">
                We foster connections between local businesses and customers, strengthening communities by encouraging support for neighborhood shoe repair shops.
              </p>
            </div>
          </div>
        </div>
        
        {/* Team Section */}
        <div className="bg-white rounded-lg shadow-md p-6 md:p-10 mb-12">
          <h2 className="text-2xl font-bold text-slate-800 mb-8">Our Team</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="mb-4 overflow-hidden rounded-full mx-auto" style={{width: '150px', height: '150px'}}>
                <img 
                  src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Michael Thompson" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-slate-800">Michael Thompson</h3>
              <p className="text-amber-600 mb-3">Founder & CEO</p>
              <p className="text-gray-600">
                Third-generation cobbler with a passion for preserving traditional craftsmanship in the digital age.
              </p>
            </div>
            
            <div className="text-center">
              <div className="mb-4 overflow-hidden rounded-full mx-auto" style={{width: '150px', height: '150px'}}>
                <img 
                  src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Sophia Rodriguez" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-slate-800">Sophia Rodriguez</h3>
              <p className="text-amber-600 mb-3">Director of Partnerships</p>
              <p className="text-gray-600">
                Former luxury footwear buyer who believes quality shoes deserve quality repairs.
              </p>
            </div>
            
            <div className="text-center">
              <div className="mb-4 overflow-hidden rounded-full mx-auto" style={{width: '150px', height: '150px'}}>
                <img 
                  src="https://images.pexels.com/photos/3190334/pexels-photo-3190334.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="David Chen" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-slate-800">David Chen</h3>
              <p className="text-amber-600 mb-3">Content Manager</p>
              <p className="text-gray-600">
                Sustainability advocate and writer dedicated to educating consumers about shoe care and repair.
              </p>
            </div>
          </div>
        </div>
        
        {/* Contact Section */}
        <div className="bg-white rounded-lg shadow-md p-6 md:p-10">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Connect With Us</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-600 mb-6">
                Have questions, suggestions, or want to list your shoe repair business in our directory? We'd love to hear from you!
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-amber-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-slate-800">Phone</h3>
                    <p className="text-gray-600">(800) 555-SOLE</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-amber-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-slate-800">Email</h3>
                    <p className="text-gray-600">info@soleconnect.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Map className="h-5 w-5 text-amber-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-slate-800">Location</h3>
                    <p className="text-gray-600">123 Directory Street<br />Tampa, FL 33602</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <Link to="/contact" className="btn-primary">
                  Contact Us
                </Link>
              </div>
            </div>
            
            <div className="h-64 md:h-auto bg-gray-200 rounded-lg relative overflow-hidden">
              <iframe 
                title="Office location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224444.53720273277!2d-82.5998189232959!3d27.996036916323765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88c2b782b3b9d1e1%3A0xa75f1389af96b463!2sTampa%2C%20FL!5e0!3m2!1sen!2sus!4v1646172407149!5m2!1sen!2sus"
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 text-center">
      <div className="flex justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default AboutPage;