import React, { useState } from 'react';
import { MapPin, Phone, Mail, Send, Clock } from 'lucide-react';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // In a real app, you would send this data to a server
    setSubmitted(true);
  };

  return (
    <div className="pt-20 pb-16 bg-gray-50 min-h-screen">
      <div className="container-custom">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-slate-800 mb-4">
          Contact Us
        </h1>
        <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          Have questions about shoe repair, want to list your business, or need help finding a cobbler? We're here to help.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Contact Form */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
              {submitted ? (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                    <Send size={24} className="text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">Thank You!</h2>
                  <p className="text-gray-600 mb-6">
                    Your message has been sent successfully. We'll get back to you as soon as possible.
                  </p>
                  <button
                    className="btn-primary"
                    onClick={() => {
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        subject: '',
                        message: '',
                      });
                      setSubmitted(false);
                    }}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-slate-800 mb-6">Send Us a Message</h2>
                  
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Your Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:outline-none"
                          value={formData.name}
                          onChange={handleChange}
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:outline-none"
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:outline-none"
                          value={formData.phone}
                          onChange={handleChange}
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                          Subject <span className="text-red-500">*</span>
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:outline-none"
                          value={formData.subject}
                          onChange={handleChange}
                        >
                          <option value="">Select a subject</option>
                          <option value="Business Listing">List My Business</option>
                          <option value="Find a Cobbler">Help Finding a Cobbler</option>
                          <option value="Shoe Repair Advice">Shoe Repair Advice</option>
                          <option value="Website Feedback">Website Feedback</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Message <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:outline-none"
                        value={formData.message}
                        onChange={handleChange}
                      ></textarea>
                    </div>
                    
                    <div>
                      <button
                        type="submit"
                        className="bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 px-6 rounded-md transition duration-300 ease-in-out"
                      >
                        Send Message
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
          
          {/* Contact Info */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-6">
              <h3 className="text-xl font-bold text-slate-800 mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-amber-100 rounded-full p-2 mr-4 flex-shrink-0">
                    <MapPin className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800">Our Office</h4>
                    <p className="text-gray-600">
                      123 Directory Street<br />
                      Tampa, FL 33602
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-amber-100 rounded-full p-2 mr-4 flex-shrink-0">
                    <Phone className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800">Phone</h4>
                    <p className="text-gray-600">
                      (800) 555-SOLE
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-amber-100 rounded-full p-2 mr-4 flex-shrink-0">
                    <Mail className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800">Email</h4>
                    <p className="text-gray-600">
                      info@soleconnect.com
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-amber-100 rounded-full p-2 mr-4 flex-shrink-0">
                    <Clock className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800">Business Hours</h4>
                    <p className="text-gray-600">
                      Monday - Friday: 9am - 6pm<br />
                      Saturday: 10am - 4pm<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-800 rounded-lg shadow-md p-6 md:p-8 text-white">
              <h3 className="text-xl font-bold mb-4">List Your Business</h3>
              <p className="text-gray-300 mb-4">
                Own a shoe repair shop in Florida? Get listed in our directory to reach new customers.
              </p>
              <a href="#" className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 px-4 rounded-md transition duration-300 ease-in-out">
                Learn More
              </a>
            </div>
          </div>
        </div>
        
        {/* Map */}
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Visit Our Office</h2>
          <div className="h-96 bg-gray-200 rounded-lg relative overflow-hidden">
            <iframe 
              title="Office location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224444.53720273277!2d-82.5998189232959!3d27.996036916323765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88c2b782b3b9d1e1%3A0xa75f1389af96b463!2sTampa%2C%20FL!5e0!3m2!1sen!2sus!4v1646172407149!5m2!1sen!2sus"
              className="absolute inset-0 w-full h-full border-0"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
        
        {/* FAQ Section */}
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Frequently Asked Questions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-slate-800 mb-2">How do I list my shoe repair business in your directory?</h3>
              <p className="text-gray-600">
                To list your business, simply fill out our contact form selecting "List My Business" as the subject. We'll get back to you with all the necessary information to get your business listed.
              </p>
            </div>
            
            <div>
              <h3 className="font-bold text-slate-800 mb-2">Is there a fee to be listed in your directory?</h3>
              <p className="text-gray-600">
                Basic listings are free of charge. We also offer premium listing options with additional features for a small monthly fee. Contact us for more details.
              </p>
            </div>
            
            <div>
              <h3 className="font-bold text-slate-800 mb-2">How can I update my business information?</h3>
              <p className="text-gray-600">
                If you need to update your business information, please contact us with the changes you'd like to make, and we'll update your listing promptly.
              </p>
            </div>
            
            <div>
              <h3 className="font-bold text-slate-800 mb-2">Can customers leave reviews for my business?</h3>
              <p className="text-gray-600">
                Yes, verified customers can leave reviews for your business. Reviews help potential customers make informed decisions and improve your visibility in our directory.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;