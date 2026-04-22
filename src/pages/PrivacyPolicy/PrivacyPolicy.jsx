import React, { useState } from 'react';
import { FaHeart, FaShieldAlt, FaLock, FaUserShield, FaDatabase, FaCookie, FaEnvelope } from 'react-icons/fa';
import Navbar from '../../components/Navbar';

export default function PrivacyPolicy() {
    const [activeSection, setActiveSection] = useState('introduction');

    const sections = [
        { id: 'introduction', title: 'Introduction', icon: FaShieldAlt },
        { id: 'information', title: 'Information We Collect', icon: FaDatabase },
        { id: 'usage', title: 'How We Use Your Information', icon: FaUserShield },
        { id: 'sharing', title: 'Information Sharing', icon: FaEnvelope },
        { id: 'security', title: 'Data Security', icon: FaLock },
        { id: 'cookies', title: 'Cookies & Tracking', icon: FaCookie },
        { id: 'rights', title: 'Your Rights', icon: FaUserShield },
        { id: 'contact', title: 'Contact Us', icon: FaEnvelope }
    ];

    const scrollToSection = (id) => {
        setActiveSection(id);
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <div>
            <Navbar></Navbar>
            <div>
                <div className="min-h-screen bg-gray-50">
                    {/* Hero Section */}
                    <div className="relative bg-gradient-to-r from-red-500 to-pink-600 text-white py-20">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                            <FaShieldAlt className="w-16 h-16 mx-auto mb-4" />
                            <h1 className="text-5xl font-bold mb-4">Privacy Policy</h1>
                            <p className="text-xl max-w-3xl mx-auto">
                                Your privacy is important to us. Learn how we collect, use, and protect your personal information.
                            </p>
                            <p className="text-sm mt-4 opacity-90">Last Updated: January 11, 2026</p>
                        </div>
                    </div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                        <div className="grid lg:grid-cols-4 gap-8">
                            {/* Sidebar Navigation */}
                            <div className="lg:col-span-1">
                                <div className="bg-white rounded-lg p-6 shadow-md sticky top-4">
                                    <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Navigation</h3>
                                    <nav className="space-y-2">
                                        {sections.map((section) => {
                                            const Icon = section.icon;
                                            return (
                                                <button
                                                    key={section.id}
                                                    onClick={() => scrollToSection(section.id)}
                                                    className={`w-full text-left px-4 py-2 rounded-md transition flex items-center gap-3 ${activeSection === section.id
                                                            ? 'bg-red-500 text-white'
                                                            : 'text-gray-700 hover:bg-gray-100'
                                                        }`}
                                                >
                                                    <Icon className="w-4 h-4" />
                                                    <span className="text-sm">{section.title}</span>
                                                </button>
                                            );
                                        })}
                                    </nav>
                                </div>
                            </div>

                            {/* Main Content */}
                            <div className="lg:col-span-3">
                                <div className="bg-white rounded-lg p-8 shadow-md">
                                    {/* Introduction */}
                                    <section id="introduction" className="mb-12">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center">
                                                <FaShieldAlt className="w-6 h-6 text-red-500" />
                                            </div>
                                            <h2 className="text-3xl font-bold text-gray-900">Introduction</h2>
                                        </div>
                                        <p className="text-gray-700 leading-relaxed mb-4">
                                            Welcome to BloodBank. We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our blood donation platform.
                                        </p>
                                        <p className="text-gray-700 leading-relaxed">
                                            By using our services, you agree to the collection and use of information in accordance with this policy. If you do not agree with our policies and practices, please do not use our services.
                                        </p>
                                    </section>

                                    {/* Information We Collect */}
                                    <section id="information" className="mb-12">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="bg-cyan-100 w-12 h-12 rounded-full flex items-center justify-center">
                                                <FaDatabase className="w-6 h-6 text-cyan-500" />
                                            </div>
                                            <h2 className="text-3xl font-bold text-gray-900">Information We Collect</h2>
                                        </div>
                                        <p className="text-gray-700 leading-relaxed mb-4">
                                            We collect several types of information from and about users of our platform:
                                        </p>

                                        <div className="space-y-4">
                                            <div className="bg-gray-50 p-4 rounded-lg">
                                                <h3 className="font-bold text-gray-900 mb-2">Personal Information</h3>
                                                <ul className="list-disc list-inside text-gray-700 space-y-1">
                                                    <li>Name, email address, and phone number</li>
                                                    <li>Date of birth and gender</li>
                                                    <li>Blood type and Rh factor</li>
                                                    <li>Address and location information</li>
                                                    <li>Profile picture (optional)</li>
                                                </ul>
                                            </div>

                                            <div className="bg-gray-50 p-4 rounded-lg">
                                                <h3 className="font-bold text-gray-900 mb-2">Medical Information</h3>
                                                <ul className="list-disc list-inside text-gray-700 space-y-1">
                                                    <li>Donation history and frequency</li>
                                                    <li>Health screening questionnaire responses</li>
                                                    <li>Medical eligibility status</li>
                                                </ul>
                                            </div>

                                            <div className="bg-gray-50 p-4 rounded-lg">
                                                <h3 className="font-bold text-gray-900 mb-2">Usage Information</h3>
                                                <ul className="list-disc list-inside text-gray-700 space-y-1">
                                                    <li>Device information and IP address</li>
                                                    <li>Browser type and version</li>
                                                    <li>Pages visited and time spent on platform</li>
                                                    <li>Search queries and interaction data</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </section>

                                    {/* How We Use Your Information */}
                                    <section id="usage" className="mb-12">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center">
                                                <FaUserShield className="w-6 h-6 text-purple-500" />
                                            </div>
                                            <h2 className="text-3xl font-bold text-gray-900">How We Use Your Information</h2>
                                        </div>
                                        <p className="text-gray-700 leading-relaxed mb-4">
                                            We use the information we collect for the following purposes:
                                        </p>
                                        <ul className="space-y-3 text-gray-700">
                                            <li className="flex items-start gap-2">
                                                <span className="text-red-500 mt-1">•</span>
                                                <span><strong>Facilitate Blood Donations:</strong> To connect donors with recipients and manage donation requests efficiently.</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-red-500 mt-1">•</span>
                                                <span><strong>Account Management:</strong> To create and manage your user account and provide personalized services.</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-red-500 mt-1">•</span>
                                                <span><strong>Communication:</strong> To send you notifications about donation requests, appointments, and platform updates.</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-red-500 mt-1">•</span>
                                                <span><strong>Platform Improvement:</strong> To analyze usage patterns and improve our services and user experience.</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-red-500 mt-1">•</span>
                                                <span><strong>Safety & Security:</strong> To verify identities, prevent fraud, and ensure the safety of all users.</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-red-500 mt-1">•</span>
                                                <span><strong>Legal Compliance:</strong> To comply with legal obligations and respond to lawful requests.</span>
                                            </li>
                                        </ul>
                                    </section>

                                    {/* Information Sharing */}
                                    <section id="sharing" className="mb-12">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="bg-pink-100 w-12 h-12 rounded-full flex items-center justify-center">
                                                <FaEnvelope className="w-6 h-6 text-pink-500" />
                                            </div>
                                            <h2 className="text-3xl font-bold text-gray-900">Information Sharing</h2>
                                        </div>
                                        <p className="text-gray-700 leading-relaxed mb-4">
                                            We do not sell your personal information. We may share your information in the following circumstances:
                                        </p>
                                        <div className="space-y-3 text-gray-700">
                                            <p><strong>With Other Users:</strong> When you accept a donation request, your basic contact information is shared with the recipient to coordinate the donation.</p>
                                            <p><strong>With Healthcare Partners:</strong> We may share necessary information with hospitals and blood banks to facilitate donations.</p>
                                            <p><strong>With Service Providers:</strong> We work with third-party service providers who help us operate our platform (hosting, analytics, communication tools).</p>
                                            <p><strong>For Legal Reasons:</strong> We may disclose information if required by law or to protect the rights and safety of our users.</p>
                                            <p><strong>With Your Consent:</strong> We will share information with third parties when you give us explicit permission to do so.</p>
                                        </div>
                                    </section>

                                    {/* Data Security */}
                                    <section id="security" className="mb-12">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center">
                                                <FaLock className="w-6 h-6 text-green-500" />
                                            </div>
                                            <h2 className="text-3xl font-bold text-gray-900">Data Security</h2>
                                        </div>
                                        <p className="text-gray-700 leading-relaxed mb-4">
                                            We implement appropriate technical and organizational measures to protect your personal information:
                                        </p>
                                        <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-4">
                                            <ul className="space-y-2 text-gray-700">
                                                <li>• SSL/TLS encryption for data transmission</li>
                                                <li>• Encrypted database storage</li>
                                                <li>• Regular security audits and updates</li>
                                                <li>• Role-based access control for staff members</li>
                                                <li>• Secure authentication and password protection</li>
                                            </ul>
                                        </div>
                                        <p className="text-gray-700 leading-relaxed">
                                            While we strive to protect your personal information, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security but continuously work to improve our security measures.
                                        </p>
                                    </section>

                                    {/* Cookies & Tracking */}
                                    <section id="cookies" className="mb-12">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="bg-yellow-100 w-12 h-12 rounded-full flex items-center justify-center">
                                                <FaCookie className="w-6 h-6 text-yellow-600" />
                                            </div>
                                            <h2 className="text-3xl font-bold text-gray-900">Cookies & Tracking Technologies</h2>
                                        </div>
                                        <p className="text-gray-700 leading-relaxed mb-4">
                                            We use cookies and similar tracking technologies to track activity on our platform and store certain information. Cookies are files with a small amount of data that are sent to your browser.
                                        </p>
                                        <div className="space-y-3 text-gray-700">
                                            <p><strong>Essential Cookies:</strong> Required for the platform to function properly (login sessions, security features).</p>
                                            <p><strong>Analytics Cookies:</strong> Help us understand how users interact with our platform to improve user experience.</p>
                                            <p><strong>Preference Cookies:</strong> Remember your settings and preferences for future visits.</p>
                                        </div>
                                        <p className="text-gray-700 leading-relaxed mt-4">
                                            You can instruct your browser to refuse all cookies or indicate when a cookie is being sent. However, if you do not accept cookies, some portions of our platform may not function properly.
                                        </p>
                                    </section>

                                    {/* Your Rights */}
                                    <section id="rights" className="mb-12">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center">
                                                <FaUserShield className="w-6 h-6 text-blue-500" />
                                            </div>
                                            <h2 className="text-3xl font-bold text-gray-900">Your Privacy Rights</h2>
                                        </div>
                                        <p className="text-gray-700 leading-relaxed mb-4">
                                            You have the following rights regarding your personal information:
                                        </p>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div className="bg-gray-50 p-4 rounded-lg">
                                                <h3 className="font-bold text-gray-900 mb-2">Right to Access</h3>
                                                <p className="text-sm text-gray-700">Request a copy of the personal data we hold about you.</p>
                                            </div>
                                            <div className="bg-gray-50 p-4 rounded-lg">
                                                <h3 className="font-bold text-gray-900 mb-2">Right to Rectification</h3>
                                                <p className="text-sm text-gray-700">Request correction of inaccurate or incomplete data.</p>
                                            </div>
                                            <div className="bg-gray-50 p-4 rounded-lg">
                                                <h3 className="font-bold text-gray-900 mb-2">Right to Erasure</h3>
                                                <p className="text-sm text-gray-700">Request deletion of your personal data under certain conditions.</p>
                                            </div>
                                            <div className="bg-gray-50 p-4 rounded-lg">
                                                <h3 className="font-bold text-gray-900 mb-2">Right to Data Portability</h3>
                                                <p className="text-sm text-gray-700">Receive your data in a structured, machine-readable format.</p>
                                            </div>
                                            <div className="bg-gray-50 p-4 rounded-lg">
                                                <h3 className="font-bold text-gray-900 mb-2">Right to Object</h3>
                                                <p className="text-sm text-gray-700">Object to certain processing of your personal data.</p>
                                            </div>
                                            <div className="bg-gray-50 p-4 rounded-lg">
                                                <h3 className="font-bold text-gray-900 mb-2">Right to Withdraw Consent</h3>
                                                <p className="text-sm text-gray-700">Withdraw consent for data processing at any time.</p>
                                            </div>
                                        </div>
                                    </section>

                                    {/* Contact Us */}
                                    <section id="contact" className="mb-8">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center">
                                                <FaEnvelope className="w-6 h-6 text-red-500" />
                                            </div>
                                            <h2 className="text-3xl font-bold text-gray-900">Contact Us</h2>
                                        </div>
                                        <p className="text-gray-700 leading-relaxed mb-4">
                                            If you have any questions about this Privacy Policy or wish to exercise your privacy rights, please contact us:
                                        </p>
                                        <div className="bg-gradient-to-r from-red-500 to-pink-600 rounded-lg p-6 text-white">
                                            <div className="grid md:grid-cols-2 gap-4">
                                                <div>
                                                    <p className="font-semibold mb-2">Email:</p>
                                                    <p>privacy@bloodbank.com</p>
                                                </div>
                                                <div>
                                                    <p className="font-semibold mb-2">Phone:</p>
                                                    <p>+880 1234 567890</p>
                                                </div>
                                                <div className="md:col-span-2">
                                                    <p className="font-semibold mb-2">Address:</p>
                                                    <p>123 Blood Bank Street, Mirza Pur, Dhaka 1216, Bangladesh</p>
                                                </div>
                                            </div>
                                        </div>
                                    </section>

                                    {/* Updates Notice */}
                                    <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
                                        <p className="text-sm text-gray-700">
                                            <strong>Policy Updates:</strong> We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. We encourage you to review this Privacy Policy periodically for any changes.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <footer className="bg-gray-900 text-white py-8 mt-16">
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
        </div>
    );
}