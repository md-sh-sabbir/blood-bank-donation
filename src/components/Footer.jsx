import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MdPhone, 
  MdEmail, 
  MdLocationOn, 
  MdFavorite 
} from 'react-icons/md';
import { 
  FaFacebook, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedin,
  FaYoutube 
} from 'react-icons/fa';
import { BiDonateBlood } from 'react-icons/bi';
import logo from '../assets/logo-1.png'

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <div className="flex items-center mb-4">
              {/* <BiDonateBlood className="text-[#EA1241] text-4xl mr-2" /> */}
              <img src={logo} alt="" className='w-12 mr-2' />
              <h3 className="text-2xl font-bold text-white">BloodBank</h3>
            </div>
            <p className="text-gray-400 mb-4 leading-relaxed">
              Connecting life-savers with those in need. Join our community and make a difference by donating blood and saving lives.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 bg-gray-700 hover:bg-[#EA1241] rounded-full flex items-center justify-center transition-colors duration-300"
              >
                <FaFacebook className="text-white text-lg" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-700 hover:bg-[#EA1241] rounded-full flex items-center justify-center transition-colors duration-300"
              >
                <FaTwitter className="text-white text-lg" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-700 hover:bg-[#EA1241] rounded-full flex items-center justify-center transition-colors duration-300"
              >
                <FaInstagram className="text-white text-lg" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-700 hover:bg-[#EA1241] rounded-full flex items-center justify-center transition-colors duration-300"
              >
                <FaLinkedin className="text-white text-lg" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-700 hover:bg-[#EA1241] rounded-full flex items-center justify-center transition-colors duration-300"
              >
                <FaYoutube className="text-white text-lg" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-[#EA1241] transition-colors duration-300 flex items-center">
                  <span className="mr-2">→</span> Home
                </Link>
              </li>
              <li>
                <Link to="/all-donation-requests" className="text-gray-400 hover:text-[#EA1241] transition-colors duration-300 flex items-center">
                  <span className="mr-2">→</span> Donation Requests
                </Link>
              </li>
              <li>
                <Link to="/search" className="text-gray-400 hover:text-[#EA1241] transition-colors duration-300 flex items-center">
                  <span className="mr-2">→</span> Search Donors
                </Link>
              </li>
              <li>
                <Link to="/blog-page" className="text-gray-400 hover:text-[#EA1241] transition-colors duration-300 flex items-center">
                  <span className="mr-2">→</span> Blog
                </Link>
              </li>
              <li>
                <Link to="/about-us" className="text-gray-400 hover:text-[#EA1241] transition-colors duration-300 flex items-center">
                  <span className="mr-2">→</span> About Us
                </Link>
              </li>
              <li>
                <Link to="/contact-page" className="text-gray-400 hover:text-[#EA1241] transition-colors duration-300 flex items-center">
                  <span className="mr-2">→</span> Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/donate" className="text-gray-400 hover:text-[#EA1241] transition-colors duration-300 flex items-center">
                  <span className="mr-2">→</span> How to Donate
                </Link>
              </li>
              <li>
                <Link to="/eligibility" className="text-gray-400 hover:text-[#EA1241] transition-colors duration-300 flex items-center">
                  <span className="mr-2">→</span> Eligibility Criteria
                </Link>
              </li>
              <li>
                <Link to="/blood-types" className="text-gray-400 hover:text-[#EA1241] transition-colors duration-300 flex items-center">
                  <span className="mr-2">→</span> Blood Types Info
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-[#EA1241] transition-colors duration-300 flex items-center">
                  <span className="mr-2">→</span> FAQ
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-gray-400 hover:text-[#EA1241] transition-colors duration-300 flex items-center">
                  <span className="mr-2">→</span> Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-conditions" className="text-gray-400 hover:text-[#EA1241] transition-colors duration-300 flex items-center">
                  <span className="mr-2">→</span> Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Get in Touch</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MdLocationOn className="text-[#EA1241] text-xl mt-1 mr-3 flex-shrink-0" />
                <span className="text-gray-400">
                  123 Blood Bank Street,<br />
                  Dhaka 1205, Bangladesh
                </span>
              </li>
              <li className="flex items-center">
                <MdPhone className="text-[#EA1241] text-xl mr-3 flex-shrink-0" />
                <div className="text-gray-400">
                  <div>+880 1234 567890</div>
                  <div>+880 9876 543210</div>
                </div>
              </li>
              <li className="flex items-center">
                <MdEmail className="text-[#EA1241] text-xl mr-3 flex-shrink-0" />
                <div className="text-gray-400">
                  <div>info@bloodbank.com</div>
                  <div>support@bloodbank.com</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Emergency Banner */}
      <div className="bg-[#EA1241] py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center">
              <MdFavorite className="text-white text-2xl mr-3 animate-pulse" />
              <p className="text-white font-semibold text-lg">
                Emergency Blood Needed? Call 24/7 Hotline: 999
              </p>
            </div>
            <Link
              to="/dashboard/add-request"
              className="px-6 py-2 bg-white text-[#EA1241] font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-300 shadow-lg"
            >
              Request Blood Now
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-950 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {new Date().getFullYear()} BloodBank. All rights reserved. 
              <span className="mx-2">|</span>
              Made with <MdFavorite className="inline text-[#EA1241] mx-1" /> for humanity
            </p>
            <div className="flex gap-6 text-sm">
              <Link to="/privacy-policy" className="text-gray-400 hover:text-[#EA1241] transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-[#EA1241] transition-colors">
                Terms of Service
              </Link>
              <Link to="/sitemap" className="text-gray-400 hover:text-[#EA1241] transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;