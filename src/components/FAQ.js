import { Link } from 'react-router-dom';

const FAQ = () => {
  const faqs = [
    {
      question: "How does the Snackora Passport work?",
      answer: "Your Snackora Passport tracks your global snack exploration journey. Each time you try a snack from a new country, you earn a virtual stamp. Collect stamps to unlock achievements and special recommendations!"
    },
    {
      question: "Can I really get international snacks delivered?",
      answer: "Yes! We partner with specialty importers worldwide. While some exotic snacks may have limited availability, we strive to offer the most authentic global snack experience possible."
    },
    {
      question: "How accurate is the Mood Recommender?",
      answer: "Our mood-based algorithm combines your flavor preferences with cultural snack popularity data. It gets smarter as you rate more snacks - the more you use it, the better it understands your tastes!"
    },
    {
      question: "Are the snacks authentic to their origin countries?",
      answer: "Absolutely! We work directly with regional producers whenever possible. Each snack listing includes cultural context about its origins and traditional consumption."
    },
    {
      question: "What if I have food allergies?",
      answer: "All products have detailed allergy information. Use our advanced filters to exclude specific allergens, and always check individual product details before purchasing."
    },
    {
      question: "How do I track my snack exploration progress?",
      answer: "Your profile dashboard shows stats like countries explored, flavor profiles tried, and cultural regions discovered. Premium members get detailed analytics about their snack journey!"
    },
    {
      question: "Can I share my Snackora achievements?",
      answer: "Yes! Your Passport has shareable stats and badges. Connect with friends to compare your global snack exploration progress."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="space-y-6">
        <Link to="/" className="inline-block mb-6" onClick={() => window.scrollTo(0, 0)}>
          <button className="px-4 py-2 bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-lg shadow-md hover:shadow-lg transition-all">
            ← Back to Snackora
          </button>
        </Link>
        
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-orange-600 dark:text-orange-400">
          Snackora FAQs
        </h1>
        
        <p className="mb-8 text-gray-700 dark:text-gray-300">
          Your questions answered about global snack exploration
        </p>
        
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="p-6 bg-orange-50/50 dark:bg-gray-700/50 rounded-lg border border-orange-200 dark:border-gray-700"
              data-aos="fade-up"
              data-aos-delay={index * 50}
            >
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">
                {faq.question}
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
        
        <div className="mt-12 pt-6 border-t border-orange-200 dark:border-gray-700 flex justify-center">
          <Link to="/contact" className="inline-block" onClick={() => window.scrollTo(0, 0)}>
            <button className="px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
              Still have questions? Contact Us
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FAQ;