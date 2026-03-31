import React, { useState } from 'react';
import { MdPhone, MdEmail, MdLocationOn, MdAccessTime } from 'react-icons/md';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log('Form submitted:', formData);
    // Add your form submission logic here
    alert('Thank you for contacting us! We will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-red-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-800 mb-4">
            Get In <span className="text-[#EA1241]">Touch</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have questions or need assistance? We're here to help. Reach out to us and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
              <h3 className="text-3xl font-bold text-gray-800 mb-6">Send Us a Message</h3>
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="John Doe"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EA1241] focus:border-transparent transition-all"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EA1241] focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+880 1234 567890"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EA1241] focus:border-transparent transition-all"
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      placeholder="How can we help?"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EA1241] focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    placeholder="Tell us more about your inquiry..."
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EA1241] focus:border-transparent transition-all resize-none"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  type="button"
                  className="w-full py-4 bg-[#EA1241] hover:bg-[#d10f38] text-white font-semibold rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
                >
                  Send Message
                </button>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Contact Info Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Contact Information</h3>
              
              {/* Phone */}
              <div className="flex items-start mb-6">
                <div className="w-12 h-12 bg-[#EA1241] rounded-full flex items-center justify-center flex-shrink-0">
                  <MdPhone className="text-white text-xl" />
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-800 mb-1">Phone Number</h4>
                  <p className="text-gray-600">+880 1234 567890</p>
                  <p className="text-gray-600">+880 9876 543210</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start mb-6">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <MdEmail className="text-white text-xl" />
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-800 mb-1">Email Address</h4>
                  <p className="text-gray-600">info@bloodbank.com</p>
                  <p className="text-gray-600">support@bloodbank.com</p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start mb-6">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <MdLocationOn className="text-white text-xl" />
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-800 mb-1">Office Address</h4>
                  <p className="text-gray-600">123 Blood Bank Street,</p>
                  <p className="text-gray-600">Dhaka 1205, Bangladesh</p>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <MdAccessTime className="text-white text-xl" />
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-800 mb-1">Working Hours</h4>
                  <p className="text-gray-600">Monday - Friday: 9 AM - 6 PM</p>
                  <p className="text-gray-600">Emergency: 24/7 Available</p>
                </div>
              </div>
            </div>

            {/* Social Media Card */}
            <div className="bg-gradient-to-br from-[#EA1241] to-[#c10f36] rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-white mb-4">Follow Us</h3>
              <p className="text-white opacity-90 mb-6">
                Stay connected with us on social media for updates and news.
              </p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                >
                  <FaFacebook className="text-[#EA1241] text-xl" />
                </a>
                <a
                  href="#"
                  className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                >
                  <FaTwitter className="text-[#EA1241] text-xl" />
                </a>
                <a
                  href="#"
                  className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                >
                  <FaInstagram className="text-[#EA1241] text-xl" />
                </a>
                <a
                  href="#"
                  className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                >
                  <FaLinkedin className="text-[#EA1241] text-xl" />
                </a>
              </div>
            </div>

            {/* Emergency Notice */}
            <div className="bg-yellow-50 border-2 border-yellow-300 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-yellow-800 mb-2">⚠️ Emergency?</h3>
              <p className="text-yellow-700 mb-3">
                For urgent blood requirements, call our emergency hotline immediately.
              </p>
              <a
                href="tel:999"
                className="block w-full text-center py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg transition-colors"
              >
                Call Emergency: 999
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;