import React, { useState } from 'react';
import { FaPaperPlane, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Toaster, toast } from 'react-hot-toast';
import CursorGlow from './CursorGlow';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success('Message sent successfully!');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
//?
  return (
    <div className="relative min-h-screen">
      {/* Grid Background - Now more visible */}
      <div 
        className="fixed inset-0 -z-50"
        style={{
          '--color': 'rgba(114, 114, 114, 0.3)',
          backgroundColor: '#191a1a',
          backgroundImage: `
            linear-gradient(0deg, transparent 24%, var(--color) 25%, var(--color) 26%, transparent 27%, transparent 74%, var(--color) 75%, var(--color) 76%, transparent 77%, transparent),
            linear-gradient(90deg, transparent 24%, var(--color) 25%, var(--color) 26%, transparent 27%, transparent 74%, var(--color) 75%, var(--color) 76%, transparent 77%, transparent)
          `,
          backgroundSize: '55px 55px',
        }}
      />
      
      <CursorGlow />
      
      {/* Main Content with adjusted transparency */}
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <Toaster position="top-center" />
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: 'spring' }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-pink-500">
              Get In Touch
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Have questions about our global snacks? Want to suggest a new snack? We'd love to hear from you!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Form - Reduced opacity to show grid */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="backdrop-blur-sm bg-white/50 dark:bg-gray-800/50 rounded-2xl shadow-2xl p-8 border border-white/30 dark:border-gray-700/30 relative overflow-hidden"
            >
              {/* Decorative elements with reduced opacity */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-pink-500 rounded-full filter blur-3xl opacity-10 dark:opacity-5"></div>
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-orange-500 rounded-full filter blur-3xl opacity-10 dark:opacity-5"></div>
              
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 relative z-10">
                Send us a message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                {/* Form fields */}
                {['name', 'email', 'subject'].map((field) => (
                  <div key={field} className="relative group">
                    <input
                      type={field === 'email' ? 'email' : 'text'}
                      id={field}
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-300/50 dark:border-gray-600/50 focus:border-orange-500 dark:bg-gray-700/30 dark:text-white transition-all peer bg-white/70 dark:bg-gray-800/70"
                      placeholder=" "
                    />
                    <label 
                      htmlFor={field} 
                      className="absolute left-4 top-3 px-1 text-gray-600 dark:text-gray-300 bg-white/70 dark:bg-gray-800/70 transition-all duration-200 transform 
                      -translate-y-7 scale-75 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
                      peer-focus:scale-75 peer-focus:-translate-y-7"
                    >
                      {field === 'name' ? 'Your Name' : 
                       field === 'email' ? 'Email Address' : 'Subject'}
                    </label>
                  </div>
                ))}

                <div className="relative group">
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300/50 dark:border-gray-600/50 focus:border-orange-500 dark:bg-gray-700/30 dark:text-white transition-all peer bg-white/70 dark:bg-gray-800/70"
                    placeholder=" "
                  ></textarea>
                  <label 
                    htmlFor="message" 
                    className="absolute left-4 top-3 px-1 text-gray-600 dark:text-gray-300 bg-white/70 dark:bg-gray-800/70 transition-all duration-200 transform 
                    -translate-y-7 scale-75 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
                    peer-focus:scale-75 peer-focus:-translate-y-7"
                  >
                    Your Message
                  </label>
                </div>

                <div>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isSubmitting}
                    className={`w-full flex items-center justify-center px-6 py-4 border border-transparent rounded-xl shadow-lg text-base font-medium text-white bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all ${
                      isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                    } relative overflow-hidden group`}
                  >
                    <span className="relative z-10 flex items-center">
                      <FaPaperPlane className="mr-2 transition-transform group-hover:rotate-12" />
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-orange-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  </motion.button>
                </div>
              </form>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="space-y-8"
            >
              <div className="backdrop-blur-sm bg-white/50 dark:bg-gray-800/50 rounded-2xl shadow-2xl p-8 border border-white/30 dark:border-gray-700/30 relative overflow-hidden">
                <div className="absolute -top-20 -left-20 w-40 h-40 bg-blue-500 rounded-full filter blur-3xl opacity-10 dark:opacity-5"></div>
                
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 relative z-10">
                  Contact Information
                </h2>
                
                <div className="space-y-6 relative z-10">
                  {[
                    {
                      icon: <FaMapMarkerAlt className="h-6 w-6" />,
                      title: "Our Location",
                      content: "BH2, ABV-IIITM Campus\nGwalior, Madhya Pradesh, India, 474015",
                      color: "orange"
                    },
                    {
                      icon: <FaPhone className="h-6 w-6" />,
                      title: "Phone Number",
                      content: "+91 111 2222 333\nMon-Fri: 10am-10pm",
                      color: "pink"
                    },
                    {
                      icon: <FaEnvelope className="h-6 w-6" />,
                      title: "Email Address",
                      content: "praphull@snackora.com\nsupport@snackora.com",
                      color: "blue"
                    }
                  ].map((item, index) => (
                    <motion.div 
                      key={index}
                      whileHover={{ y: -5 }}
                      className="flex items-start p-4 rounded-xl hover:bg-white/30 dark:hover:bg-gray-700/30 transition-colors cursor-default"
                    >
                      <div className={`flex-shrink-0 p-3 bg-${item.color}-100 dark:bg-${item.color}-900/20 rounded-lg text-${item.color}-500 dark:text-${item.color}-400`}>
                        {item.icon}
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-800 dark:text-white">{item.title}</h3>
                        <p className="mt-1 text-gray-600 dark:text-gray-300 whitespace-pre-line">{item.content}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Interactive Map Section */}
              <div className="backdrop-blur-sm bg-white/50 dark:bg-gray-800/50 rounded-2xl shadow-2xl overflow-hidden border border-white/30 dark:border-gray-700/30 relative">
                <div className="h-64 w-full relative">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4298.190521758531!2d78.16938269262384!3d26.250148636770327!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3976c6e5d32a4d53%3A0xf834069adc0c9b89!2sAtal%20Bihari%20Vajpayee%20Indian%20Institute%20of%20Information%20Technology%20and%20Management%20Gwalior!5e0!3m2!1sen!2sin!4v1754645010419!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-lg"
                    title="IIITM Gwalior Location"
                  ></iframe>
                </div>
                <div className="p-4 bg-white/50 dark:bg-gray-800/50 border-t border-white/30 dark:border-gray-700/30">
                  <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                    View our location on{' '}
                    <a 
                      href="https://maps.google.com/?q=BH2,+ABV-IIITM+Campus,+Gwalior,+Madhya+Pradesh,+474015"
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-orange-500 hover:text-orange-600 dark:text-orange-400 dark:hover:text-orange-300 underline"
                    >
                      Google Maps
                    </a>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;