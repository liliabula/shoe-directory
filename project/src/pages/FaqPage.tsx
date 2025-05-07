import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';

// FAQ Types
type FAQCategory = {
  id: string;
  name: string;
  description: string;
  faqs: FAQ[];
};

type FAQ = {
  id: string;
  question: string;
  answer: string;
};

const FaqPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('general');
  const [expandedFaqs, setExpandedFaqs] = useState<Set<string>>(new Set(['general-1']));
  const [searchQuery, setSearchQuery] = useState('');

  // FAQ Data
  const faqCategories: FAQCategory[] = [
    {
      id: 'general',
      name: 'General Questions',
      description: 'Common questions about shoe repair services',
      faqs: [
        {
          id: 'general-1',
          question: 'How do I know if my shoes can be repaired?',
          answer: 'Most quality shoes can be repaired, but the feasibility depends on factors like material condition, extent of damage, and shoe construction. High-quality shoes with welted or stitched construction are typically more repairable than cheaply made ones. If the upper part of your shoe is in good condition, resoling and other repairs are usually possible. Bring your shoes to a professional cobbler for assessment – most offer free evaluations to determine if repair is worthwhile.'
        },
        {
          id: 'general-2',
          question: 'How much does shoe repair typically cost?',
          answer: 'Shoe repair costs vary widely based on the service needed, materials required, and the complexity of the repair. Basic services like heel replacement might range from $15-40, while complete resoling could cost $50-100+ for quality shoes. High-end or specialty footwear often costs more to repair due to the craftsmanship involved. Many repair shops offer free estimates, and it\'s worth getting one before deciding whether repair is economically sensible compared to replacement.'
        },
        {
          id: 'general-3',
          question: 'How long does shoe repair usually take?',
          answer: 'Most standard shoe repairs take between 3-7 days to complete, though this can vary based on the shop\'s workload and the complexity of the repair. Simple services like heel replacement might be done while you wait or within 1-2 days, while complete rebuilds could take 1-2 weeks. Many shops offer rush services for an additional fee if you need your shoes back quickly. Always ask for a time estimate when dropping off your shoes.'
        },
        {
          id: 'general-4',
          question: 'Is it worth repairing inexpensive shoes?',
          answer: 'For inexpensive shoes (under $50-75), repairs like resoling might not be economically sensible since the repair could cost as much as replacement. However, minor repairs like regluing a sole or replacing heel tips can be cost-effective even for less expensive footwear. The environmental benefit of extending a shoe\'s life is also worth considering. Quality shoes, regardless of initial price, are generally worth repairing if you find them comfortable and they\'re in otherwise good condition.'
        }
      ]
    },
    {
      id: 'services',
      name: 'Services & Repairs',
      description: 'Information about specific repair services',
      faqs: [
        {
          id: 'services-1',
          question: 'What types of shoe repairs are most common?',
          answer: 'The most common shoe repairs include heel replacement, sole replacement or resoling, stitching repairs, stretching tight shoes, and patching or repairing uppers. Heel tip replacement is particularly common for women\'s heels, while sole replacement is frequent for well-loved dress shoes and work boots. Many shops also offer cleaning, reconditioning, and waterproofing services to extend shoe life.'
        },
        {
          id: 'services-2',
          question: 'Can cobblers repair other leather items besides shoes?',
          answer: 'Yes, most cobblers repair a variety of leather goods beyond shoes. Common additional services include purse and handbag repairs (handles, zippers, linings), belt shortening and repair, luggage fixes, and leather jacket repairs. Some even work with other specialized leather items like saddles, holsters, or musical instrument cases. If you have any leather item needing repair, ask your local cobbler if they can help.'
        },
        {
          id: 'services-3',
          question: 'Can athletic shoes be repaired?',
          answer: 'Modern athletic shoes can be more challenging to repair than traditional footwear due to their complex construction and materials. However, many repairs are still possible, including regluing separated soles, patching small tears, replacing insoles, and reconditioning. Specialized athletic shoe repair is available at some shops, particularly for high-end running or athletic shoes. Ask shoe repair shops if they have experience with athletic footwear before proceeding.'
        },
        {
          id: 'services-4',
          question: 'How do I know if my shoes need to be resoled?',
          answer: 'Signs your shoes need resoling include visible wear through the sole material (especially if you can see the inner layers of the sole), uneven wear that affects your gait, cracks in the sole material, or if the sole is separating from the upper. For leather-soled shoes, resoling is typically recommended when the sole becomes thin enough that you can feel the ground too easily. Addressing sole issues early can prevent damage to the shoe\'s structure and extend its lifespan considerably.'
        }
      ]
    },
    {
      id: 'care',
      name: 'Shoe Care',
      description: 'Tips for maintaining and caring for your shoes',
      faqs: [
        {
          id: 'care-1',
          question: 'How often should I condition leather shoes?',
          answer: 'Leather shoes should be conditioned every 1-3 months with regular wear, though this varies based on wear frequency, climate, and exposure to elements. In Florida\'s humid climate, conditioning is particularly important to prevent leather from drying out or developing mildew. Conditioning after cleaning is ideal, as it replaces natural oils removed during the cleaning process. Use a quality leather conditioner appropriate for your specific leather type, and always test in an inconspicuous area first.'
        },
        {
          id: 'care-2',
          question: 'What\'s the best way to protect shoes in Florida\'s humid climate?',
          answer: 'Florida\'s humid climate poses unique challenges for shoe care. Use water and stain repellents appropriate for your shoe\'s material, ensuring adequate ventilation when storing shoes to prevent mildew. Consider using cedar shoe trees to absorb moisture and maintain shape. For leather shoes, regular conditioning with mold-inhibiting products is essential. Store shoes away from direct sunlight, which can fade and dry out materials. For extended storage, use silica gel packets in shoe boxes to control humidity.'
        },
        {
          id: 'care-3',
          question: 'How can I make my shoes more comfortable?',
          answer: 'To improve shoe comfort, consider professional stretching for tight spots, which many Florida cobblers offer for both width and length adjustments. Quality insoles provide better arch support and cushioning than factory insoles. For specific pressure points, moleskin or targeted padding can help. Professional cobblers can add extra padding in tongues or collars, adjust toe boxes, or even modify shoes for foot conditions. Consider a professional fitting evaluation to identify the best comfort modifications for your specific needs.'
        },
        {
          id: 'care-4',
          question: 'How should I clean different types of shoe materials?',
          answer: 'Different shoe materials require specific cleaning approaches: Leather should be wiped with a damp cloth, cleaned with leather cleaner, and conditioned afterward. Suede requires a specialized suede brush and eraser, never water. Canvas can be spot-cleaned or machine-washed on gentle cycles. Synthetic materials often clean well with mild soap and water. Always allow shoes to air dry naturally away from heat sources, which can cause damage. For valuable shoes, professional cleaning from a reputable cobbler is worth considering.'
        }
      ]
    },
    {
      id: 'cobblers',
      name: 'Finding a Cobbler',
      description: 'Help with locating and choosing shoe repair services',
      faqs: [
        {
          id: 'cobblers-1',
          question: 'How do I find a good cobbler in Florida?',
          answer: 'To find a quality cobbler in Florida, start with our SoleConnect directory, which provides verified reviews from actual customers. Look for shops with longevity in the business, as experience often correlates with skill. Ask for recommendations from high-end shoe stores or check social media for before/after photos of a shop\'s work. A good cobbler will take time to discuss your shoes and offer honest assessments, including when repair might not be worthwhile. Consider starting with a small repair to evaluate their work before entrusting valuable shoes.'
        },
        {
          id: 'cobblers-2',
          question: 'What should I look for when choosing a shoe repair shop?',
          answer: 'When selecting a shoe repair shop, examine their cleanliness and organization, which often reflects their attention to detail. Look for shops that ask questions about your shoes and educate you about repair options. Check if they use quality materials matching your shoes\' original construction. A good repair shop should provide clear pricing and timeframes. Ask how long they\'ve been in business, as cobbling is a skill refined over years. Finally, shops that specialize in high-end shoe repair usually have the skills needed for most repairs.'
        },
        {
          id: 'cobblers-3',
          question: 'What questions should I ask a cobbler before leaving my shoes?',
          answer: 'Before leaving shoes for repair, ask specifically what repairs they recommend and why, getting a detailed explanation of the process. Request a clear cost estimate and timeline for completion. Inquire about materials they\'ll use and if they match the original construction. For valuable shoes, ask about their experience with similar brands/styles. Discuss guarantees on their work and what happens if issues arise after repair. Finally, ask if there are preventative measures you can take to avoid similar damage in the future.'
        },
        {
          id: 'cobblers-4',
          question: 'Do cobblers offer pickup and delivery services?',
          answer: 'An increasing number of Florida cobblers now offer pickup and delivery services, especially in urban areas and for regular customers. Some have established mail-in repair services with detailed guidelines for shipping shoes safely. These services are particularly valuable for those with limited mobility or busy schedules. While some shops offer these services for free above a certain repair value, others charge a nominal fee. Check our directory for shops with these options, as many have added these convenient services in recent years.'
        }
      ]
    }
  ];

  // Handle FAQ toggle
  const toggleFaq = (faqId: string) => {
    setExpandedFaqs(prev => {
      const newSet = new Set(prev);
      if (newSet.has(faqId)) {
        newSet.delete(faqId);
      } else {
        newSet.add(faqId);
      }
      return newSet;
    });
  };

  // Filter FAQs based on search query
  const filterFaqs = () => {
    if (!searchQuery.trim()) {
      return faqCategories;
    }

    const query = searchQuery.toLowerCase();
    
    return faqCategories.map(category => {
      const filteredFaqs = category.faqs.filter(faq => 
        faq.question.toLowerCase().includes(query) || 
        faq.answer.toLowerCase().includes(query)
      );
      
      return {
        ...category,
        faqs: filteredFaqs
      };
    }).filter(category => category.faqs.length > 0);
  };

  const filteredCategories = filterFaqs();

  return (
    <div className="pt-20 pb-16 bg-gray-50 min-h-screen">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Frequently Asked Questions</h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Get answers to common questions about shoe repair services, care tips, and finding the right cobbler in Florida.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-10">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search in FAQs..."
              className="pl-10 pr-4 py-3 w-full rounded-md border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Category Navigation */}
          {!searchQuery && (
            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg shadow-md p-4 sticky top-24">
                <h3 className="font-bold text-lg text-slate-800 mb-4">Categories</h3>
                <nav>
                  <ul className="space-y-2">
                    {faqCategories.map((category) => (
                      <li key={category.id}>
                        <button
                          onClick={() => setActiveCategory(category.id)}
                          className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                            activeCategory === category.id
                              ? 'bg-amber-100 text-amber-800 font-medium'
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          {category.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>
          )}

          {/* FAQ Content */}
          <div className={`${searchQuery ? 'lg:col-span-12' : 'lg:col-span-9'}`}>
            {filteredCategories.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No results found</h3>
                <p className="text-gray-600 mb-4">
                  We couldn't find any FAQs matching "{searchQuery}".
                </p>
                <button 
                  className="text-amber-600 hover:text-amber-700 font-medium transition duration-300 ease-in-out"
                  onClick={() => setSearchQuery('')}
                >
                  Clear search and try again
                </button>
              </div>
            ) : (
              <>
                {filteredCategories.map((category) => (
                  <div 
                    key={category.id} 
                    id={category.id}
                    className={`mb-10 ${!searchQuery && activeCategory !== category.id ? 'hidden' : ''}`}
                  >
                    <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
                      <h2 className="text-2xl font-bold text-slate-800 mb-2">{category.name}</h2>
                      <p className="text-gray-600 mb-6">{category.description}</p>
                      
                      <div className="space-y-4">
                        {category.faqs.map((faq) => (
                          <div 
                            key={faq.id} 
                            className="border border-gray-200 rounded-lg overflow-hidden"
                          >
                            <button
                              onClick={() => toggleFaq(faq.id)}
                              className="w-full flex justify-between items-center text-left p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                            >
                              <span className="font-medium text-slate-800">{faq.question}</span>
                              {expandedFaqs.has(faq.id) ? (
                                <ChevronUp className="h-5 w-5 text-gray-500" />
                              ) : (
                                <ChevronDown className="h-5 w-5 text-gray-500" />
                              )}
                            </button>
                            
                            {expandedFaqs.has(faq.id) && (
                              <div className="p-4 bg-white">
                                <p className="text-gray-700">{faq.answer}</p>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>

        {/* Additional Help Section */}
        <div className="mt-12 bg-amber-50 rounded-lg p-8 shadow-md">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Still Have Questions?</h2>
            <p className="text-gray-600 mb-6">
              If you couldn't find the answer you were looking for, browse our directory to find a shoe repair expert near you.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/directory" className="btn-primary">
                Find a Shoe Repair Shop
              </Link>
              <Link to="/contact" className="btn-secondary">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqPage;