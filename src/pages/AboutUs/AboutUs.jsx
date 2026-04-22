import React from 'react';
import { FaHeart, FaUsers, FaShieldAlt, FaBullseye, FaChartLine } from 'react-icons/fa';
import Navbar from '../../components/Navbar';

export default function AboutUs() {
    return (
        <div>
            <Navbar></Navbar>
            <div className="min-h-screen bg-gray-50">
                {/* Hero Section */}
                <div className="relative bg-gradient-to-r from-red-500 to-pink-600 text-white py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="text-5xl font-bold mb-4">About BloodBank</h1>
                        <p className="text-xl max-w-3xl mx-auto">
                            Connecting donors with those in need, one donation at a time. We're committed to making blood donation simple, safe, and accessible for everyone.
                        </p>
                    </div>
                </div>

                {/* Our Story Section */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-900">
                            Our <span className="text-red-500">Story</span>
                        </h2>
                        <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
                            BloodBank was founded with a simple yet powerful mission: to bridge the gap between blood donors and recipients through innovative technology.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                Every day, thousands of people need blood transfusions for various medical conditions, surgeries, and emergencies. However, finding compatible donors quickly remains a significant challenge in many communities.
                            </p>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                We recognized this critical need and developed the BloodBank platform using the MERN stack to create a seamless connection between donors and recipients. Our application streamlines the entire donation process, from registration to request fulfillment.
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                                Today, we're proud to serve thousands of users, facilitating life-saving donations and building a community of heroes who give the gift of life.
                            </p>
                        </div>
                        <div className="bg-red-50 p-8 rounded-lg">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="text-center">
                                    <div className="text-4xl font-bold text-red-500">10K+</div>
                                    <div className="text-gray-600 mt-2">Registered Donors</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-4xl font-bold text-red-500">5K+</div>
                                    <div className="text-gray-600 mt-2">Lives Saved</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-4xl font-bold text-red-500">500+</div>
                                    <div className="text-gray-600 mt-2">Monthly Donations</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-4xl font-bold text-red-500">50+</div>
                                    <div className="text-gray-600 mt-2">Partner Hospitals</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mission & Vision */}
                <div className="bg-white py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-gradient-to-br from-red-500 to-pink-600 text-white p-8 rounded-lg">
                                <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                                    <FaBullseye color='red' className="w-8 h-8" />
                                </div>
                                <h3 className="text-3xl font-bold mb-4">Our Mission</h3>
                                <p className="text-lg leading-relaxed">
                                    To create a user-friendly platform that facilitates seamless blood donation activities, connecting donors with those in need and promoting an efficient donation process that saves lives every day.
                                </p>
                            </div>
                            <div className="bg-gradient-to-br from-pink-600 to-red-500 text-white p-8 rounded-lg">
                                <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                                    <FaChartLine color='#2dc653' className="w-8 h-8" />
                                </div>
                                <h3 className="text-3xl font-bold mb-4">Our Vision</h3>
                                <p className="text-lg leading-relaxed">
                                    To build a world where no one dies due to blood shortage. We envision a community where blood donation is accessible, efficient, and celebrated as an act of heroism.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Core Values */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-900">
                            Our Core <span className="text-red-500">Values</span>
                        </h2>
                        <p className="mt-4 text-gray-600">
                            The principles that guide everything we do
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FaHeart className="w-10 h-10 text-red-500" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Compassion</h3>
                            <p className="text-gray-600">
                                We care deeply about every life and work tirelessly to ensure no one is left without help in their time of need.
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="bg-cyan-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FaShieldAlt className="w-10 h-10 text-cyan-500" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Trust & Safety</h3>
                            <p className="text-gray-600">
                                We maintain the highest standards of verification and safety, ensuring every donor and recipient can trust our platform.
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FaUsers className="w-10 h-10 text-purple-500" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Community</h3>
                            <p className="text-gray-600">
                                We believe in the power of community and work to build a supportive network of donors and recipients.
                            </p>
                        </div>
                    </div>
                </div>



                {/* Footer */}
                <footer className="bg-gray-900 text-white py-8">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <div className="flex items-center justify-center mb-4">
                            <FaHeart className="w-6 h-6 text-red-500" />
                            <span className="ml-2 text-xl font-bold">BloodBank</span>
                        </div>
                        <p className="text-gray-400">© 2025 BloodBank. All rights reserved. Made with ❤️ for humanity</p>
                    </div>
                </footer>
            </div>
        </div>
    );
}