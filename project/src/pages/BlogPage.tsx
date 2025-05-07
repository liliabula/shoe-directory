import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

const BlogPage: React.FC = () => {
  const blogPosts = [
    {
      id: 1,
      slug: 'how-to-make-your-shoes-last-longer',
      title: 'How to Make Your Shoes Last Longer',
      excerpt: 'Learn the essential care techniques that can extend the life of your favorite shoes by years, saving you money and reducing waste.',
      image: 'https://images.pexels.com/photos/6046226/pexels-photo-6046226.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      date: 'May 12, 2025',
      readTime: '5 min read',
      category: 'Shoe Care',
    },
    {
      id: 2,
      slug: 'when-to-repair-vs-replace-your-shoes',
      title: 'When to Repair vs. Replace Your Shoes',
      excerpt: 'Not sure if your worn shoes need repairs or replacement? This guide helps you make the right decision based on various factors.',
      image: 'https://images.pexels.com/photos/5214107/pexels-photo-5214107.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      date: 'May 5, 2025',
      readTime: '7 min read',
      category: 'Advice',
    },
    {
      id: 3,
      slug: 'the-art-of-cobbling-floridas-shoe-repair-experts',
      title: "The Art of Cobbling: Florida's Shoe Repair Experts",
      excerpt: 'Meet the skilled artisans who are keeping the traditional craft of shoe repair alive across Florida and preserving this valuable skill.',
      image: 'https://images.pexels.com/photos/4904563/pexels-photo-4904563.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      date: 'April 28, 2025',
      readTime: '8 min read',
      category: 'Feature',
    },
    {
      id: 4,
      slug: 'best-shoe-materials-for-florida-climate',
      title: 'Best Shoe Materials for Florida Climate',
      excerpt: 'Discover which shoe materials hold up best in Florida\'s hot, humid climate and how proper care can extend their lifespan.',
      image: 'https://images.pexels.com/photos/267301/pexels-photo-267301.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      date: 'April 21, 2025',
      readTime: '6 min read',
      category: 'Tips',
    },
    {
      id: 5,
      slug: 'diy-shoe-repair-tips-every-floridian-should-know',
      title: 'DIY Shoe Repair Tips Every Floridian Should Know',
      excerpt: 'Learn simple at-home repairs for common shoe problems before deciding to visit a professional cobbler.',
      image: 'https://images.pexels.com/photos/12568501/pexels-photo-12568501.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      date: 'April 14, 2025',
      readTime: '9 min read',
      category: 'DIY',
    },
    {
      id: 6,
      slug: 'sustainable-footwear-repair-and-recycling-options',
      title: 'Sustainable Footwear: Repair and Recycling Options',
      excerpt: 'Explore how shoe repair contributes to sustainability and learn about eco-friendly options for your worn footwear.',
      image: 'https://images.pexels.com/photos/6044266/pexels-photo-6044266.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      date: 'April 7, 2025',
      readTime: '7 min read',
      category: 'Sustainability',
    },
  ];

  const featuredPost = blogPosts[0];
  const regularPosts = blogPosts.slice(1);

  return (
    <div className="pt-20 pb-16 bg-gray-50 min-h-screen">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Shoe Repair & Care Blog</h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Expert tips, guides, and insights to help you care for your shoes and find the best repair services in Florida.
          </p>
        </div>

        {/* Featured Post */}
        <div className="mb-12">
          <Link 
            to={`/blog/${featuredPost.slug}`}
            className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="md:flex">
              <div className="md:w-1/2">
                <img 
                  src={featuredPost.image} 
                  alt={featuredPost.title} 
                  className="h-64 md:h-full w-full object-cover"
                />
              </div>
              <div className="p-6 md:w-1/2 md:p-8 flex flex-col">
                <div className="mb-2">
                  <span className="inline-block bg-amber-100 text-amber-800 text-xs font-semibold px-3 py-1 rounded-full">
                    {featuredPost.category}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-slate-800 mb-4">{featuredPost.title}</h2>
                <p className="text-gray-600 mb-6 flex-grow">{featuredPost.excerpt}</p>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <div className="flex items-center mr-4">
                    <Calendar size={16} className="mr-1" />
                    <span>{featuredPost.date}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock size={16} className="mr-1" />
                    <span>{featuredPost.readTime}</span>
                  </div>
                </div>
                <div className="text-amber-600 font-medium inline-flex items-center">
                  Read Article
                  <ArrowRight size={16} className="ml-1" />
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Regular Posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularPosts.map(post => (
            <Link 
              key={post.id}
              to={`/blog/${post.slug}`}
              className="card hover-lift flex flex-col h-full"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="mb-2">
                  <span className="inline-block bg-amber-100 text-amber-800 text-xs font-semibold px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">{post.title}</h3>
                <p className="text-gray-600 mb-4 flex-grow">{post.excerpt}</p>
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <div className="flex items-center mr-4">
                    <Calendar size={14} className="mr-1" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock size={14} className="mr-1" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                <div className="text-amber-600 font-medium inline-flex items-center mt-auto">
                  Read Article
                  <ArrowRight size={16} className="ml-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Categories Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Browse By Category</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {['Shoe Care', 'Advice', 'DIY', 'Feature', 'Tips', 'Sustainability'].map((category, index) => (
              <Link 
                key={index}
                to={`/blog?category=${category.toLowerCase()}`}
                className="bg-white shadow-sm hover:shadow-md border border-gray-200 rounded-lg p-4 text-center transition-shadow duration-300"
              >
                <span className="font-medium text-slate-800">{category}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Newsletter Sign Up */}
        <div className="mt-16 bg-amber-50 rounded-lg p-8 shadow-md">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-slate-800 mb-3">Join Our Newsletter</h2>
            <p className="text-gray-600 mb-6">
              Get the latest shoe care tips, repair advice, and Florida industry news delivered directly to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                required
              />
              <button 
                type="submit"
                className="bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 px-6 rounded-md transition duration-300 ease-in-out"
              >
                Subscribe
              </button>
            </form>
            <p className="text-xs text-gray-500 mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;