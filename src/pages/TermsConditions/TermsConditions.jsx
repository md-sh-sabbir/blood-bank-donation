import React, { useState } from 'react';
import { FaHeart, FaFileContract, FaUserCheck, FaExclamationTriangle, FaGavel, FaHandshake, FaBan, FaInfoCircle } from 'react-icons/fa';
import Navbar from '../../components/Navbar';

export default function TermsConditions() {
    const [activeSection, setActiveSection] = useState('agreement');

    const sections = [
        { id: 'agreement', title: 'Agreement to Terms', icon: FaFileContract },
        { id: 'eligibility', title: 'Eligibility', icon: FaUserCheck },
        { id: 'user-accounts', title: 'User Accounts', icon: FaUserCheck },
        { id: 'donations', title: 'Blood Donations', icon: FaHeart },
        { id: 'responsibilities', title: 'User Responsibilities', icon: FaHandshake },
        { id: 'prohibited', title: 'Prohibited Activities', icon: FaBan },
        { id: 'liability', title: 'Limitation of Liability', icon: FaExclamationTriangle },
        { id: 'disputes', title: 'Dispute Resolution', icon: FaGavel },
        { id: 'contact', title: 'Contact Information', icon: FaInfoCircle }
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
            <div className="min-h-screen bg-gray-50">
                {/* Hero Section */}
                <div className="relative bg-gradient-to-r from-red-500 to-pink-600 text-white py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <FaFileContract className="w-16 h-16 mx-auto mb-4" />
                        <h1 className="text-5xl font-bold mb-4">Terms & Conditions</h1>
                        <p className="text-xl max-w-3xl mx-auto">
                            Please read these terms carefully before using our blood donation platform
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
                                {/* Agreement to Terms */}
                                <section id="agreement" className="mb-12">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center">
                                            <FaFileContract className="w-6 h-6 text-red-500" />
                                        </div>
                                        <h2 className="text-3xl font-bold text-gray-900">Agreement to Terms</h2>
                                    </div>
                                    <p className="text-gray-700 leading-relaxed mb-4">
                                        Welcome to BloodBank. These Terms and Conditions constitute a legally binding agreement between you ("User," "you," or "your") and BloodBank ("we," "us," or "our") regarding your access to and use of the BloodBank platform and services.
                                    </p>
                                    <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
                                        <p className="text-gray-700 font-medium">
                                            By accessing or using our platform, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. If you do not agree with these terms, you must not use our services.
                                        </p>
                                    </div>
                                    <p className="text-gray-700 leading-relaxed">
                                        We reserve the right to modify these terms at any time. We will notify users of any material changes via email or through the platform. Your continued use of the platform after such modifications constitutes your acceptance of the updated terms.
                                    </p>
                                </section>

                                {/* Eligibility */}
                                <section id="eligibility" className="mb-12">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="bg-cyan-100 w-12 h-12 rounded-full flex items-center justify-center">
                                            <FaUserCheck className="w-6 h-6 text-cyan-500" />
                                        </div>
                                        <h2 className="text-3xl font-bold text-gray-900">Eligibility Requirements</h2>
                                    </div>
                                    <p className="text-gray-700 leading-relaxed mb-4">
                                        To use BloodBank services, you must meet the following requirements:
                                    </p>

                                    <div className="space-y-4">
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <h3 className="font-bold text-gray-900 mb-2">General Eligibility</h3>
                                            <ul className="list-disc list-inside text-gray-700 space-y-2">
                                                <li>You must be at least 18 years of age</li>
                                                <li>You must have the legal capacity to enter into binding contracts</li>
                                                <li>You must provide accurate and complete registration information</li>
                                                <li>You must not be prohibited from using the services under applicable laws</li>
                                            </ul>
                                        </div>

                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <h3 className="font-bold text-gray-900 mb-2">Donor Eligibility</h3>
                                            <ul className="list-disc list-inside text-gray-700 space-y-2">
                                                <li>Must be between 18-65 years of age</li>
                                                <li>Must weigh at least 50 kg (110 lbs)</li>
                                                <li>Must be in good general health</li>
                                                <li>Must meet all medical screening requirements</li>
                                                <li>Must not have donated blood within the last 3 months</li>
                                            </ul>
                                        </div>

                                        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
                                            <p className="text-sm text-gray-700">
                                                <strong>Important:</strong> Final eligibility for blood donation is determined by medical professionals at the time of donation. BloodBank does not make medical eligibility determinations.
                                            </p>
                                        </div>
                                    </div>
                                </section>

                                {/* User Accounts */}
                                <section id="user-accounts" className="mb-12">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center">
                                            <FaUserCheck className="w-6 h-6 text-purple-500" />
                                        </div>
                                        <h2 className="text-3xl font-bold text-gray-900">User Accounts</h2>
                                    </div>

                                    <div className="space-y-4 text-gray-700">
                                        <div>
                                            <h3 className="font-bold text-gray-900 mb-2">Account Creation</h3>
                                            <p className="leading-relaxed">
                                                To access certain features, you must create an account. You agree to provide accurate, current, and complete information during registration and to update such information to keep it accurate and current.
                                            </p>
                                        </div>

                                        <div>
                                            <h3 className="font-bold text-gray-900 mb-2">Account Security</h3>
                                            <ul className="list-disc list-inside space-y-1">
                                                <li>You are responsible for maintaining the confidentiality of your account credentials</li>
                                                <li>You are responsible for all activities that occur under your account</li>
                                                <li>You must notify us immediately of any unauthorized access or security breach</li>
                                                <li>You must not share your account with others or allow others to access your account</li>
                                            </ul>
                                        </div>

                                        <div>
                                            <h3 className="font-bold text-gray-900 mb-2">Account Termination</h3>
                                            <p className="leading-relaxed mb-2">
                                                We reserve the right to suspend or terminate your account at any time for:
                                            </p>
                                            <ul className="list-disc list-inside space-y-1">
                                                <li>Violation of these Terms and Conditions</li>
                                                <li>Providing false or misleading information</li>
                                                <li>Engaging in fraudulent or illegal activities</li>
                                                <li>Misuse of the platform or harassment of other users</li>
                                            </ul>
                                        </div>
                                    </div>
                                </section>

                                {/* Blood Donations */}
                                <section id="donations" className="mb-12">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="bg-pink-100 w-12 h-12 rounded-full flex items-center justify-center">
                                            <FaHeart className="w-6 h-6 text-pink-500" />
                                        </div>
                                        <h2 className="text-3xl font-bold text-gray-900">Blood Donation Services</h2>
                                    </div>

                                    <div className="space-y-4 text-gray-700">
                                        <div>
                                            <h3 className="font-bold text-gray-900 mb-2">Platform Role</h3>
                                            <p className="leading-relaxed">
                                                BloodBank serves as a facilitator connecting blood donors with recipients. We do not collect, store, test, or distribute blood. All blood collection and transfusion activities are performed by licensed medical facilities and healthcare professionals.
                                            </p>
                                        </div>

                                        <div className="bg-red-50 p-4 rounded-lg">
                                            <h3 className="font-bold text-gray-900 mb-2">Medical Disclaimer</h3>
                                            <p className="leading-relaxed mb-2">
                                                BloodBank is NOT a medical service provider. We do not:
                                            </p>
                                            <ul className="list-disc list-inside space-y-1">
                                                <li>Provide medical advice or diagnosis</li>
                                                <li>Determine medical eligibility for blood donation</li>
                                                <li>Guarantee the safety or suitability of blood donations</li>
                                                <li>Assume responsibility for medical decisions or outcomes</li>
                                            </ul>
                                        </div>

                                        <div>
                                            <h3 className="font-bold text-gray-900 mb-2">Donor Commitments</h3>
                                            <p className="leading-relaxed mb-2">
                                                By registering as a donor, you agree to:
                                            </p>
                                            <ul className="list-disc list-inside space-y-1">
                                                <li>Provide accurate health and medical information</li>
                                                <li>Respond promptly to donation requests you accept</li>
                                                <li>Follow all medical facility protocols and procedures</li>
                                                <li>Notify us if you are unable to fulfill a commitment</li>
                                                <li>Undergo required health screenings before donation</li>
                                            </ul>
                                        </div>

                                        <div>
                                            <h3 className="font-bold text-gray-900 mb-2">Recipient Responsibilities</h3>
                                            <p className="leading-relaxed mb-2">
                                                Recipients and requesters agree to:
                                            </p>
                                            <ul className="list-disc list-inside space-y-1">
                                                <li>Provide accurate information about blood requirements</li>
                                                <li>Work with licensed medical facilities for blood collection</li>
                                                <li>Respect donor privacy and personal information</li>
                                                <li>Not misuse the platform for non-emergency or fraudulent requests</li>
                                            </ul>
                                        </div>
                                    </div>
                                </section>

                                {/* User Responsibilities */}
                                <section id="responsibilities" className="mb-12">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center">
                                            <FaHandshake className="w-6 h-6 text-green-500" />
                                        </div>
                                        <h2 className="text-3xl font-bold text-gray-900">User Responsibilities</h2>
                                    </div>

                                    <p className="text-gray-700 leading-relaxed mb-4">
                                        All users of BloodBank agree to:
                                    </p>

                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <h3 className="font-bold text-gray-900 mb-2">Accurate Information</h3>
                                            <p className="text-sm text-gray-700">Provide truthful, accurate, and complete information at all times.</p>
                                        </div>
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <h3 className="font-bold text-gray-900 mb-2">Respectful Conduct</h3>
                                            <p className="text-sm text-gray-700">Treat all users with respect and dignity.</p>
                                        </div>
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <h3 className="font-bold text-gray-900 mb-2">Privacy Protection</h3>
                                            <p className="text-sm text-gray-700">Respect the privacy and confidentiality of other users.</p>
                                        </div>
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <h3 className="font-bold text-gray-900 mb-2">Legal Compliance</h3>
                                            <p className="text-sm text-gray-700">Comply with all applicable laws and regulations.</p>
                                        </div>
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <h3 className="font-bold text-gray-900 mb-2">Platform Security</h3>
                                            <p className="text-sm text-gray-700">Not attempt to compromise platform security or functionality.</p>
                                        </div>
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <h3 className="font-bold text-gray-900 mb-2">Proper Use</h3>
                                            <p className="text-sm text-gray-700">Use the platform only for its intended purpose.</p>
                                        </div>
                                    </div>
                                </section>

                                {/* Prohibited Activities */}
                                <section id="prohibited" className="mb-12">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center">
                                            <FaBan className="w-6 h-6 text-red-500" />
                                        </div>
                                        <h2 className="text-3xl font-bold text-gray-900">Prohibited Activities</h2>
                                    </div>

                                    <p className="text-gray-700 leading-relaxed mb-4">
                                        Users are strictly prohibited from:
                                    </p>

                                    <div className="space-y-2 text-gray-700">
                                        <div className="flex items-start gap-2">
                                            <span className="text-red-500 mt-1">✕</span>
                                            <span>Providing false or misleading information about health status or blood type</span>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <span className="text-red-500 mt-1">✕</span>
                                            <span>Requesting blood for fraudulent or non-medical purposes</span>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <span className="text-red-500 mt-1">✕</span>
                                            <span>Selling or attempting to sell blood or related services</span>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <span className="text-red-500 mt-1">✕</span>
                                            <span>Harassing, threatening, or abusing other users</span>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <span className="text-red-500 mt-1">✕</span>
                                            <span>Impersonating another person or entity</span>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <span className="text-red-500 mt-1">✕</span>
                                            <span>Attempting to gain unauthorized access to the platform or user data</span>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <span className="text-red-500 mt-1">✕</span>
                                            <span>Uploading viruses, malware, or harmful code</span>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <span className="text-red-500 mt-1">✕</span>
                                            <span>Scraping or data mining platform content without authorization</span>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <span className="text-red-500 mt-1">✕</span>
                                            <span>Violating any applicable laws or regulations</span>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <span className="text-red-500 mt-1">✕</span>
                                            <span>Using the platform for any commercial purpose without our written consent</span>
                                        </div>
                                    </div>

                                    <div className="bg-red-50 border-l-4 border-red-500 p-4 mt-4">
                                        <p className="text-sm text-gray-700 font-medium">
                                            Violation of these prohibitions may result in immediate account termination and potential legal action.
                                        </p>
                                    </div>
                                </section>

                                {/* Limitation of Liability */}
                                <section id="liability" className="mb-12">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="bg-yellow-100 w-12 h-12 rounded-full flex items-center justify-center">
                                            <FaExclamationTriangle className="w-6 h-6 text-yellow-600" />
                                        </div>
                                        <h2 className="text-3xl font-bold text-gray-900">Limitation of Liability</h2>
                                    </div>

                                    <div className="space-y-4 text-gray-700">
                                        <div className="bg-yellow-50 p-4 rounded-lg">
                                            <p className="leading-relaxed mb-3 font-medium">
                                                TO THE MAXIMUM EXTENT PERMITTED BY LAW, BLOODBANK SHALL NOT BE LIABLE FOR:
                                            </p>
                                            <ul className="list-disc list-inside space-y-2">
                                                <li>Any medical complications, injuries, or adverse effects resulting from blood donation or transfusion</li>
                                                <li>Actions or omissions of donors, recipients, or medical facilities</li>
                                                <li>Accuracy or completeness of user-provided information</li>
                                                <li>Compatibility or safety of blood donations</li>
                                                <li>Delays, cancellations, or failures in the donation process</li>
                                                <li>Loss of data or interruption of service</li>
                                            </ul>
                                        </div>

                                        <div>
                                            <h3 className="font-bold text-gray-900 mb-2">Service "AS IS"</h3>
                                            <p className="leading-relaxed">
                                                The platform is provided "as is" and "as available" without warranties of any kind, either express or implied. We do not warrant that the service will be uninterrupted, secure, or error-free.
                                            </p>
                                        </div>

                                        <div>
                                            <h3 className="font-bold text-gray-900 mb-2">Indemnification</h3>
                                            <p className="leading-relaxed">
                                                You agree to indemnify and hold BloodBank harmless from any claims, damages, or expenses arising from your use of the platform, violation of these terms, or infringement of any rights of another party.
                                            </p>
                                        </div>
                                    </div>
                                </section>

                                {/* Dispute Resolution */}
                                <section id="disputes" className="mb-12">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center">
                                            <FaGavel className="w-6 h-6 text-blue-500" />
                                        </div>
                                        <h2 className="text-3xl font-bold text-gray-900">Dispute Resolution</h2>
                                    </div>

                                    <div className="space-y-4 text-gray-700">
                                        <div>
                                            <h3 className="font-bold text-gray-900 mb-2">Governing Law</h3>
                                            <p className="leading-relaxed">
                                                These Terms shall be governed by and construed in accordance with the laws of Bangladesh, without regard to its conflict of law provisions.
                                            </p>
                                        </div>

                                        <div>
                                            <h3 className="font-bold text-gray-900 mb-2">Informal Resolution</h3>
                                            <p className="leading-relaxed">
                                                Before initiating formal legal proceedings, you agree to attempt to resolve any dispute informally by contacting us at disputes@bloodbank.com.
                                            </p>
                                        </div>

                                        <div>
                                            <h3 className="font-bold text-gray-900 mb-2">Arbitration</h3>
                                            <p className="leading-relaxed">
                                                Any disputes that cannot be resolved informally shall be resolved through binding arbitration in Dhaka, Bangladesh, in accordance with the rules of the Bangladesh Arbitration Act.
                                            </p>
                                        </div>

                                        <div>
                                            <h3 className="font-bold text-gray-900 mb-2">Class Action Waiver</h3>
                                            <p className="leading-relaxed">
                                                You agree that any dispute resolution proceedings will be conducted only on an individual basis and not in a class, consolidated, or representative action.
                                            </p>
                                        </div>
                                    </div>
                                </section>

                                {/* Contact Information */}
                                <section id="contact" className="mb-8">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center">
                                            <FaInfoCircle className="w-6 h-6 text-red-500" />
                                        </div>
                                        <h2 className="text-3xl font-bold text-gray-900">Contact Information</h2>
                                    </div>
                                    <p className="text-gray-700 leading-relaxed mb-4">
                                        If you have any questions about these Terms and Conditions, please contact us:
                                    </p>
                                    <div className="bg-gradient-to-r from-red-500 to-pink-600 rounded-lg p-6 text-white">
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <p className="font-semibold mb-2">Email:</p>
                                                <p>legal@bloodbank.com</p>
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

                                {/* Acceptance Notice */}
                                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                                    <p className="text-sm text-gray-700">
                                        <strong>By using BloodBank, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.</strong> If you do not agree to these terms, you must immediately discontinue use of the platform.
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
    );
}