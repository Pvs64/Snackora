import React from 'react';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import './About.css';

const About = () => {
  const teamMembers = [
    {
      name: "Praphull Vikram Singh",
      role: "Founder & CEO",
      image: "/images/image1.jpg",
      bio: "Full-Stack Developer || UI/UX Designer",
      socials: [
        { platform: "github", url: "https://github.com/Pvs64", icon: <FaGithub /> },
        { platform: "linkedin", url: "https://linkedin.com/in/praphull-vikram-singh", icon: <FaLinkedin /> },
        { platform: "instagram", url: "https://instagram.com/praphullsingh_00", icon: <FaInstagram /> }
      ]
    },
    {
      name: "Yashasvi Shukla",
      role: "Co-Founder",
      image: "/images/image4.jpg", // Make sure to add image4.jpg to your public/images folder
      bio: "Business Strategist || Marketing Expert",
      socials: [
        { platform: "github", url: "#", icon: <FaGithub /> },
        { platform: "linkedin", url: "#", icon: <FaLinkedin /> },
        { platform: "instagram", url: "#", icon: <FaInstagram /> }
      ]
    },
    {
      name: "Prava Labonna",
      role: "Head of Product",
      image: "/images/image2.png",
      bio: "Front-end Developer || Data Scientist",
      socials: [
        { platform: "github", url: "#", icon: <FaGithub /> },
        { platform: "linkedin", url: "#", icon: <FaLinkedin /> },
        { platform: "instagram", url: "https://instagram.com/_labonna_", icon: <FaInstagram /> }
      ]
    },
    {
      name: "Rajiv Ranjan",
      role: "Tech Lead",
      image: "/images/image3.jpg",
      bio: "Back-end Developer || DevOps Engineer",
      socials: [
        { platform: "github", url: "#", icon: <FaGithub /> },
        { platform: "linkedin", url: "#", icon: <FaLinkedin /> },
        { platform: "instagram", url: "https://instagram.com/r_a_j_i_v.07", icon: <FaInstagram /> }
      ]
    }
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero p-8 md:p-12 rounded-lg border border-orange-200 dark:border-gray-700 bg-orange-50/50 dark:bg-gray-700/50 mb-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800 dark:text-white">
            Our <span className="text-orange-500">Snack Journey</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300">
            Discover the story behind Snackora and the team making global snacking accessible
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="about-mission p-8 md:p-12 rounded-lg border border-orange-200 dark:border-gray-700 bg-orange-50/50 dark:bg-gray-700/50 mb-12">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <div className="mission-content">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800 dark:text-white">
              Our <span className="text-orange-500">Mission</span>
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              At Snackora, we're on a mission to bridge cultures through snacks. What started as a college project
              has grown into a platform connecting snack lovers with authentic flavors from around the world.
              We work directly with producers to bring you the most genuine tasting experiences while supporting
              small businesses and sustainable practices.
            </p>
          </div>
          <div className="mission-image rounded-lg overflow-hidden shadow-lg">
            <img 
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5" 
              alt="Our team" 
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="about-values p-8 md:p-12 rounded-lg border border-orange-200 dark:border-gray-700 bg-orange-50/50 dark:bg-gray-700/50 mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white">
          Our <span className="text-orange-500">Core Values</span>
        </h2>
        
        <div className="values-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="value-card p-6 rounded-lg border border-orange-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 hover:shadow-lg transition-all">
            <div className="value-icon global mx-auto mb-4"></div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Global Discovery</h3>
            <p className="text-gray-700 dark:text-gray-300">
              We're obsessed with uncovering authentic snacks from every corner of the world.
            </p>
          </div>
          <div className="value-card p-6 rounded-lg border border-orange-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 hover:shadow-lg transition-all">
            <div className="value-icon community mx-auto mb-4"></div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Community First</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Our snackers guide our decisions through constant feedback and suggestions.
            </p>
          </div>
          <div className="value-card p-6 rounded-lg border border-orange-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 hover:shadow-lg transition-all">
            <div className="value-icon sustainability mx-auto mb-4"></div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Sustainability</h3>
            <p className="text-gray-700 dark:text-gray-300">
              We prioritize eco-friendly packaging and support small producers.
            </p>
          </div>
          <div className="value-card p-6 rounded-lg border border-orange-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 hover:shadow-lg transition-all">
            <div className="value-icon quality mx-auto mb-4"></div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Quality Assurance</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Every snack is carefully selected and tested for authenticity and taste.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="about-team p-8 md:p-12 rounded-lg border border-orange-200 dark:border-gray-700 bg-orange-50/50 dark:bg-gray-700/50">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white">
          Meet Our <span className="text-orange-500">Team</span>
        </h2>
        
        <div className="team-grid flex flex-wrap justify-center gap-8">
          {teamMembers.map((member, index) => (
            <div 
              key={index} 
              className="profile-card p-6 rounded-lg border border-orange-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 hover:shadow-lg transition-all relative"
            >
              <div className="profile-image-container w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-orange-300 dark:border-orange-500">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="profile-image w-full h-full object-cover"
                />
              </div>
              <h3 className="profile-name text-xl font-semibold text-center text-gray-800 dark:text-white">
                {member.name}
              </h3>
              <p className="profile-role text-orange-500 text-center mb-4">
                {member.role}
              </p>
              
              <div className="profile-hover-content absolute inset-0 p-6 rounded-lg bg-white/95 dark:bg-gray-800/95 flex flex-col justify-center items-center opacity-0 invisible translate-y-4 transition-all">
                <p className="profile-bio text-gray-700 dark:text-gray-300 text-center mb-6">
                  {member.bio}
                </p>
                <ul className="social-links flex gap-4">
                  {member.socials.map((social, i) => (
                    <li key={i} className="social-item relative">
                      <a 
                        href={social.url} 
                        className={`social-link w-10 h-10 rounded-full flex items-center justify-center relative overflow-hidden ${social.platform}`}
                        target="_blank" 
                        rel="noopener noreferrer"
                        aria-label={social.platform}
                      >
                        <span className="social-icon z-10">{social.icon}</span>
                        <span className="tooltip absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full bg-gray-800 text-white px-2 py-1 rounded text-xs opacity-0 invisible transition-all">
                          {social.platform}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;