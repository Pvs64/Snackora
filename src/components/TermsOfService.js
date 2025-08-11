


import { Link } from 'react-router-dom';

const TermsOfService = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="space-y-6">
        <Link 
          to="/" 
          className="inline-block mb-6"
          onClick={() => window.scrollTo(0, 0)} // Scroll to top when going back
        >
          <button className="px-4 py-2 bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-lg shadow-md hover:shadow-lg transition-all">
            ← Back to Snackora
          </button>
        </Link>
              
              <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-orange-600 dark:text-orange-400">
                Snackora Terms of Service
              </h1>
              
              <p className="mb-8 text-gray-700 dark:text-gray-300">
                Effective Date: August 2025
              </p>
              
              <div className="space-y-8">
                <div className="p-6 bg-orange-50/50 dark:bg-gray-700/50 rounded-lg border border-orange-200 dark:border-gray-700">
                  <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
                    The Rules of Global Snacking
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300">
                    Welcome to Snackora, your passport to global snack exploration! 
                    These terms govern your use of our platform and services. 
                    By using Snackora, you're agreeing to these terms - please read them carefully.
                  </p>
                </div>
                
                <div className="p-6 bg-orange-50/50 dark:bg-gray-700/50 rounded-lg border border-orange-200 dark:border-gray-700">
                  <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">1. Your Snackora Passport</h3>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                    <li>You must be at least 13 years old to create a Snackora account</li>
                    <li>Your Passport progress is personal and non-transferable</li>
                    <li>You're responsible for maintaining the confidentiality of your account</li>
                  </ul>
                </div>
                
                <div className="p-6 bg-orange-50/50 dark:bg-gray-700/50 rounded-lg border border-orange-200 dark:border-gray-700">
                  <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">2. Global Snack Exploration</h3>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-4">
                    <h4 className="font-medium mb-2 text-orange-600 dark:text-orange-400">Mood Recommendations</h4>
                    <p className="text-gray-700 dark:text-gray-300">
                      Our mood-based snack recommendations are for entertainment purposes only. 
                      We don't guarantee you'll love every recommendation, but we hope you'll 
                      enjoy the adventure of discovery!
                    </p>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    By using our service, you acknowledge that:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mt-2 text-gray-700 dark:text-gray-300">
                    <li>Snack availability may vary by location</li>
                    <li>Allergy information should be verified with manufacturers</li>
                    <li>Cultural context is provided for educational purposes</li>
                  </ul>
                </div>
                
                <div className="p-6 bg-orange-50/50 dark:bg-gray-700/50 rounded-lg border border-orange-200 dark:border-gray-700">
                  <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">3. Content Guidelines</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    When contributing to our global snack community:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 mt-4">
                    <div className="bg-green-50 dark:bg-gray-800 p-4 rounded-lg border border-green-200 dark:border-gray-600 shadow">
                      <h4 className="font-medium mb-2 text-green-600 dark:text-green-400">Do</h4>
                      <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                        <li>Share authentic snack experiences</li>
                        <li>Respect cultural origins</li>
                        <li>Provide helpful reviews</li>
                      </ul>
                    </div>
                    <div className="bg-red-50 dark:bg-gray-800 p-4 rounded-lg border border-red-200 dark:border-gray-600 shadow">
                      <h4 className="font-medium mb-2 text-red-600 dark:text-red-400">Don't</h4>
                      <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                        <li>Post false information</li>
                        <li>Violate any laws</li>
                        <li>Spam the community</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 bg-orange-50/50 dark:bg-gray-700/50 rounded-lg border border-orange-200 dark:border-gray-700">
                  <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">4. Purchases & Payments</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    For any snack purchases made through Snackora:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mt-2 text-gray-700 dark:text-gray-300">
                    <li>All sales are final unless defective</li>
                    <li>Prices may vary based on location</li>
                    <li>You're responsible for any customs/duties</li>
                  </ul>
                </div>
                
                <div className="p-6 bg-orange-50/50 dark:bg-gray-700/50 rounded-lg border border-orange-200 dark:border-gray-700">
                  <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">5. Termination</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    We reserve the right to suspend or terminate accounts that violate these terms. 
                    You may terminate your account at any time through your Passport settings.
                  </p>
                </div>
                
                <div className="p-6 bg-orange-50/50 dark:bg-gray-700/50 rounded-lg border border-orange-200 dark:border-gray-700">
                  <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">6. Changes to Terms</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    As we add new snack destinations to our platform, we may update these terms. 
                    Continued use of Snackora after changes constitutes acceptance of the new terms.
                  </p>
                  <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                    For any questions about these terms, contact us at <span className="text-orange-600 dark:text-orange-400">legal@snackora.com</span>
                  </p>
                </div>
              </div>
              
              <div className="mt-12 pt-6 border-t border-orange-200 dark:border-gray-700 flex justify-center">
                <Link to="/contact" className="inline-block">
                  <button className="px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                    Contact Us About Terms
                  </button>
                </Link>
              </div>

      </div>
    </div>
  );
};

export default TermsOfService;