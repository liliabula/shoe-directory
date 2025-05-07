import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, User, ChevronLeft, ChevronRight, Share2 } from 'lucide-react';

interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  readTime: string;
  category: string;
  content?: string;
  author?: string;
}

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real application, this would be an API call to fetch the blog post
    const fetchBlogPost = () => {
      setIsLoading(true);
      
      // Mocked blog posts data
      const allPosts: BlogPost[] = [
        {
          id: 1,
          slug: 'how-to-make-your-shoes-last-longer',
          title: 'How to Make Your Shoes Last Longer',
          excerpt: 'Learn the essential care techniques that can extend the life of your favorite shoes by years, saving you money and reducing waste.',
          image: 'https://images.pexels.com/photos/6046226/pexels-photo-6046226.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          date: 'May 12, 2025',
          readTime: '5 min read',
          category: 'Shoe Care',
          author: 'Maria Rodriguez',
          content: `
# How to Make Your Shoes Last Longer

Your shoes are an investment, and with proper care, you can extend their lifespan significantly. Whether you have expensive designer shoes or everyday favorites, these tips will help keep them looking great for years to come.

## Regular Cleaning

One of the most important aspects of shoe care is regular cleaning. Different materials require different approaches:

### Leather Shoes
- Wipe with a damp cloth to remove surface dirt
- Use a leather cleaner for deeper cleaning
- Apply leather conditioner every 1-2 months
- Polish dress shoes regularly to maintain appearance

### Suede and Nubuck
- Use a suede brush to remove dirt and restore nap
- Apply suede protector before first wear
- Use erasers designed for suede to remove scuffs
- Never use water-based cleaning methods

### Canvas and Fabric
- Spot clean with mild soap and water
- For white canvas, use baking soda paste on stains
- Machine wash only when absolutely necessary (and air dry)

## Proper Storage

How you store your shoes when not in use can dramatically affect their lifespan:

- Keep shoes in a cool, dry place away from direct sunlight
- Use shoe trees for leather shoes to maintain shape
- Store boots upright with boot shapers
- Don't stack shoes on top of each other
- Allow athletic shoes to fully dry between uses

## Rotation is Key

Wearing the same pair of shoes every day is one of the fastest ways to wear them out. The moisture from your feet needs time to fully evaporate, and materials need time to recover their shape.

- Aim to rotate between at least 2-3 pairs for daily wear
- Give leather shoes 24-48 hours to rest between wears
- Keep special occasion shoes in protective bags

## Preemptive Reinforcement

Taking preventative measures before signs of wear appear can save your shoes:

- Add protective rubber soles to leather-soled shoes
- Replace heel tips at the first sign of wear
- Install toe and heel taps on dress shoes
- Use water and stain repellent on new shoes

## Address Issues Promptly

Small problems become big ones if ignored:

- Fix loose stitching immediately
- Repair small sole separations before they expand
- Address squeaky shoes while the fix is simple
- Don't ignore bent or broken shanks

## When to See a Professional

While many shoe care tasks can be done at home, some repairs are best left to professionals:

- Resoling
- Major structural repairs
- Restoration of expensive or cherished shoes
- Color restoration or dyeing

Florida's humid climate presents special challenges for shoe care. The high humidity can lead to mildew, while salt water and beach sand can be particularly damaging. Be especially vigilant about drying and cleaning shoes in these conditions.

Remember that quality shoes, when properly cared for, can last for decades. The small investment of time in regular maintenance pays off many times over in extended shoe life.
          `
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
          author: 'James Thompson',
          content: 'This is the full content of the "When to Repair vs. Replace Your Shoes" article.'
        },
        // Add more blog posts with content as needed
      ];
      
      // Find the current post and related posts
      const currentPost = allPosts.find(p => p.slug === slug) || null;
      
      // Get related posts from the same category
      const related = currentPost 
        ? allPosts.filter(p => p.category === currentPost.category && p.id !== currentPost.id).slice(0, 3)
        : [];
      
      setPost(currentPost);
      setRelatedPosts(related);
      setIsLoading(false);
    };
    
    fetchBlogPost();
    window.scrollTo(0, 0);
  }, [slug]);
  
  if (isLoading) {
    return (
      <div className="pt-20 pb-16 bg-gray-50 min-h-screen">
        <div className="container-custom">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="h-96 bg-gray-200 rounded mb-8"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!post) {
    return (
      <div className="pt-20 pb-16 bg-gray-50 min-h-screen">
        <div className="container-custom">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Blog Post Not Found</h1>
            <p className="text-gray-600 mb-6">
              The article you're looking for doesn't exist or may have been removed.
            </p>
            <Link to="/blog" className="btn-primary">
              Return to Blog
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
          <Link to="/blog" className="hover:text-amber-600 transition-colors">Blog</Link>
          <ChevronRight size={16} className="mx-2" />
          <span className="text-gray-700">{post.title}</span>
        </nav>
        
        {/* Blog Post Header */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="h-96 relative">
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
              <div className="mb-3">
                <span className="inline-block bg-amber-500 text-white text-sm font-semibold px-3 py-1 rounded-full">
                  {post.category}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-3">{post.title}</h1>
              <div className="flex flex-wrap items-center text-sm text-gray-200 gap-4">
                {post.author && (
                  <div className="flex items-center">
                    <User size={16} className="mr-2" />
                    <span>{post.author}</span>
                  </div>
                )}
                <div className="flex items-center">
                  <Calendar size={16} className="mr-2" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center">
                  <Clock size={16} className="mr-2" />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Blog Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          <div className="lg:col-span-8">
            <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
              <div className="prose prose-lg max-w-none">
                {/* In a real application, you'd render the HTML content here */}
                {post.content ? (
                  <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n## /g, '<br><h2>').replace(/\n### /g, '<br><h3>').replace(/\n# /g, '<br><h1>').replace(/\n/g, '<br>') }} />
                ) : (
                  <p>Content not available.</p>
                )}
              </div>
              
              {/* Tags */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex flex-wrap gap-2">
                  <span className="text-gray-700 font-medium">Tags:</span>
                  <a href="#" className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded-full transition-colors">Shoe Care</a>
                  <a href="#" className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded-full transition-colors">Maintenance</a>
                  <a href="#" className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded-full transition-colors">Leather</a>
                  <a href="#" className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded-full transition-colors">DIY</a>
                </div>
              </div>
              
              {/* Share */}
              <div className="mt-6 flex items-center">
                <span className="text-gray-700 font-medium mr-4">Share:</span>
                <div className="flex space-x-3">
                  <a href="#" className="text-gray-500 hover:text-amber-600 transition-colors">
                    <Share2 size={18} />
                  </a>
                  {/* Add more social sharing icons as needed */}
                </div>
              </div>
              
              {/* Author Bio */}
              {post.author && (
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex items-start">
                    <div className="bg-gray-200 rounded-full h-12 w-12 flex-shrink-0 flex items-center justify-center mr-4">
                      <User size={24} className="text-gray-500" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800">{post.author}</h3>
                      <p className="text-gray-600 text-sm">
                        Shoe care expert with over 10 years of experience in the industry. Passionate about extending the life of quality footwear through proper maintenance and repair.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Post Navigation */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row justify-between">
                  <a href="#" className="group flex items-center text-gray-700 hover:text-amber-600 transition-colors mb-4 sm:mb-0">
                    <ChevronLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                    <span>Previous Post</span>
                  </a>
                  <a href="#" className="group flex items-center text-gray-700 hover:text-amber-600 transition-colors">
                    <span>Next Post</span>
                    <ChevronRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-4">
            {/* About Section */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-xl font-bold text-slate-800 mb-4">About Our Blog</h3>
              <p className="text-gray-600 mb-4">
                The SoleConnect blog is dedicated to helping Floridians care for their footwear and find the best repair services in the state.
              </p>
              <Link to="/about" className="text-amber-600 font-medium inline-flex items-center">
                Learn More
                <ChevronRight size={16} className="ml-1" />
              </Link>
            </div>
            
            {/* Categories */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-xl font-bold text-slate-800 mb-4">Categories</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="flex items-center justify-between text-gray-700 hover:text-amber-600 transition-colors">
                    <span>Shoe Care</span>
                    <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">12</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center justify-between text-gray-700 hover:text-amber-600 transition-colors">
                    <span>DIY Repairs</span>
                    <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">8</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center justify-between text-gray-700 hover:text-amber-600 transition-colors">
                    <span>Sustainability</span>
                    <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">5</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center justify-between text-gray-700 hover:text-amber-600 transition-colors">
                    <span>Expert Advice</span>
                    <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">10</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center justify-between text-gray-700 hover:text-amber-600 transition-colors">
                    <span>Industry Features</span>
                    <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">7</span>
                  </a>
                </li>
              </ul>
            </div>
            
            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-slate-800 mb-4">Related Posts</h3>
                <div className="space-y-4">
                  {relatedPosts.map((relatedPost) => (
                    <Link 
                      key={relatedPost.id}
                      to={`/blog/${relatedPost.slug}`}
                      className="flex items-start group"
                    >
                      <div className="h-16 w-16 flex-shrink-0 rounded overflow-hidden mr-3">
                        <img 
                          src={relatedPost.image} 
                          alt={relatedPost.title} 
                          className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800 group-hover:text-amber-600 transition-colors">
                          {relatedPost.title}
                        </h4>
                        <div className="text-xs text-gray-500">{relatedPost.date}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* CTA Banner */}
        <div className="bg-slate-900 rounded-lg shadow-md p-8 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to give your shoes new life?</h2>
            <p className="text-gray-300 mb-6">
              Find the perfect shoe repair shop near you with our comprehensive directory of Florida cobblers.
            </p>
            <Link to="/directory" className="bg-amber-500 hover:bg-amber-600 text-white font-medium py-3 px-8 rounded-md transition duration-300 ease-in-out inline-block">
              Explore Shoe Repair Directory
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostPage;