import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
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
            Snackora Privacy Policy
          </h1>
          
          <p className="mb-8 text-gray-700 dark:text-gray-300">
            Last Updated: August 2025
          </p>
          
          <div className="space-y-8">
            <div className="p-6 bg-orange-50/50 dark:bg-gray-700/50 rounded-lg border border-orange-200 dark:border-gray-700">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
                Your Global Snack Journey, Protected
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                At Snackora, we take your privacy as seriously as we take our global snack curation. 
                This policy explains how we collect, use, and protect your information as you explore 
                the world's flavors through our platform.
              </p>
            </div>
            
            <div className="p-6 bg-orange-50/50 dark:bg-gray-700/50 rounded-lg border border-orange-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">1. Information We Collect</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li><strong>Passport Data:</strong> Your Snackora Passport progress and collected stamps</li>
                <li><strong>Taste Profile:</strong> Your flavor preferences and mood-based recommendations</li>
                <li><strong>Account Details:</strong> Email, username, and encrypted password</li>
                <li><strong>Snack Progress:</strong> Your global snack exploration statistics</li>
                <li><strong>Technical Data:</strong> Device information and usage patterns</li>
              </ul>
            </div>
            
            <div className="p-6 bg-orange-50/50 dark:bg-gray-700/50 rounded-lg border border-orange-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">2. How We Use Your Information</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                  <h4 className="font-medium mb-2 text-orange-600 dark:text-orange-400">Personalization</h4>
                  <p className="text-gray-700 dark:text-gray-300">To recommend snacks based on your mood and past preferences</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                  <h4 className="font-medium mb-2 text-orange-600 dark:text-orange-400">Passport Progress</h4>
                  <p className="text-gray-700 dark:text-gray-300">To track and celebrate your global snack exploration</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                  <h4 className="font-medium mb-2 text-orange-600 dark:text-orange-400">Service Improvement</h4>
                  <p className="text-gray-700 dark:text-gray-300">To enhance your Snackora experience</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                  <h4 className="font-medium mb-2 text-orange-600 dark:text-orange-400">Security</h4>
                  <p className="text-gray-700 dark:text-gray-300">To protect your account and our community</p>
                </div>
              </div>
            </div>
            
            <div className="p-6 bg-orange-50/50 dark:bg-gray-700/50 rounded-lg border border-orange-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">3. Data Protection</h3>
              <p className="text-gray-700 dark:text-gray-300">
                We implement industry-standard security measures to protect your data, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2 text-gray-700 dark:text-gray-300">
                <li>Encryption of sensitive data</li>
                <li>Regular security audits</li>
                <li>Limited access to personal information</li>
              </ul>
            </div>
            
            <div className="p-6 bg-orange-50/50 dark:bg-gray-700/50 rounded-lg border border-orange-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">4. Your Rights</h3>
              <p className="text-gray-700 dark:text-gray-300">
                You have the right to access, correct, or delete your personal data. 
                Contact us at <span className="text-orange-600 dark:text-orange-400">privacy@snackora.com</span> 
                for any privacy-related requests.
              </p>
            </div>
            
            <div className="p-6 bg-orange-50/50 dark:bg-gray-700/50 rounded-lg border border-orange-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">5. Changes to This Policy</h3>
              <p className="text-gray-700 dark:text-gray-300">
                We may update this policy as we add new snack destinations to our platform. 
                We'll notify you of significant changes through your Snackora Passport notifications.
              </p>
            </div>
          </div>
          
          <div className="mt-12 pt-6 border-t border-orange-200 dark:border-gray-700 flex justify-center">
            <Link to="/contact" className="inline-block">
              <button className="px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                Contact Us About Privacy
              </button>
            </Link>
            </div>
      
      {/* Add your actual privacy policy content here */}
      <section className="p-6 bg-orange-50/50 dark:bg-gray-700/50 rounded-lg border border-orange-200 dark:border-gray-700">
        <h2 className="text-2xl font-semibold mb-4">Your Privacy Matters</h2>
        <p>We respect your privacy and are committed to protecting your personal data.</p>
      </section>
         </div>
    </div>        
  );
};

export default PrivacyPolicy;