import React from 'react';
import { 
  MdBloodtype, 
  MdLocationOn, 
  MdSchedule, 
  MdVerifiedUser,
  MdNotifications,
  MdPeople
} from 'react-icons/md';
import { BiDonateBlood } from 'react-icons/bi';
import { FaHandHoldingHeart } from 'react-icons/fa';
import { Link } from 'react-router';

const FeatureCard = ({ icon: Icon, title, description, color }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
      {/* Icon Container */}
      <div className={`w-16 h-16 rounded-full ${color} flex items-center justify-center mb-6`}>
        <Icon className="text-white text-3xl" />
      </div>
      
      {/* Title */}
      <h3 className="text-2xl font-bold text-gray-800 mb-4">{title}</h3>
      
      {/* Description */}
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
};

const FeaturesSection = () => {
  const features = [
    {
      icon: BiDonateBlood,
      title: "Easy Blood Requests",
      description: "Create and manage blood donation requests quickly. Connect with donors in your area who can help save lives.",
      color: "bg-[#EA1241]"
    },
    {
      icon: MdSchedule,
      title: "Real-Time Updates",
      description: "Get instant notifications about donation requests. Track the status of your requests from pending to completed.",
      color: "bg-green-500"
    },
    {
      icon: MdVerifiedUser,
      title: "Verified Donors",
      description: "Connect with verified blood donors. All donor profiles are authenticated for your safety and trust.",
      color: "bg-purple-500"
    },
    
    {
      icon: FaHandHoldingHeart,
      title: "Impact Tracking",
      description: "Track your donation history and see the lives you've helped save. Every donation makes a difference.",
      color: "bg-pink-500"
    },
    {
      icon: MdPeople,
      title: "Community Network",
      description: "Join a community of life-savers. Connect with donors and recipients to build a supportive network.",
      color: "bg-teal-500"
    },
    {
      icon: MdBloodtype,
      title: "Blood Type Matching",
      description: "Automatic matching with compatible blood types. Find the right donor for urgent medical needs quickly.",
      color: "bg-red-500"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-800 mb-4">
            Our <span className="text-[#EA1241]">Features</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover how our platform makes blood donation simple, safe, and effective. 
            Every feature is designed to save lives and connect communities.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              color={feature.color}
            />
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-[#EA1241] to-[#c10f36] rounded-2xl p-12 shadow-2xl">
            <h3 className="text-3xl font-bold text-white mb-4">
              Ready to Make a Difference?
            </h3>
            <p className="text-white text-lg mb-8 max-w-2xl mx-auto opacity-90">
              Join thousands of donors who are saving lives every day. 
              Register now and become a hero in someone's story.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-[#EA1241] font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200 shadow-lg">
                Register as Donor
              </button>
              <button className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-[#EA1241] transition-colors duration-200">
                Request Blood Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;