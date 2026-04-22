import React, { useState } from 'react';
import { FaHeart, FaCalendar, FaUser, FaClock, FaSearch, FaTag } from 'react-icons/fa';
import Navbar from '../../components/Navbar';

export default function BlogPage() {
    const [selectedCategory, setSelectedCategory] = useState('All');

    const categories = ['All', 'Health Tips', 'Success Stories', 'News', 'Donation Guide', 'Community'];

    const blogPosts = [
        {
            id: 1,
            title: 'The Importance of Regular Blood Donation',
            excerpt: 'Learn why regular blood donation is not only beneficial for recipients but also has numerous health benefits for donors themselves.',
            image: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=800&q=80',
            category: 'Health Tips',
            author: 'Dr. Sarah Johnson',
            date: 'January 8, 2026',
            readTime: '5 min read'
        },
        {
            id: 2,
            title: 'How Sarah Saved Three Lives in One Day',
            excerpt: 'An inspiring story of how one donor\'s quick response helped save multiple lives during an emergency situation.',
            image: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=800&q=80',
            category: 'Success Stories',
            author: 'Michael Chen',
            date: 'January 5, 2026',
            readTime: '7 min read'
        },
        {
            id: 3,
            title: 'Understanding Blood Types and Compatibility',
            excerpt: 'A comprehensive guide to blood types, what makes them compatible, and why knowing your blood type is important.',
            image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800&q=80',
            category: 'Donation Guide',
            author: 'Dr. Emily Rodriguez',
            date: 'January 3, 2026',
            readTime: '6 min read'
        },
        {
            id: 4,
            title: 'New Blood Donation Center Opens Downtown',
            excerpt: 'Great news for our community! A state-of-the-art blood donation center has opened its doors in the downtown area.',
            image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800&q=80',
            category: 'News',
            author: 'Admin Team',
            date: 'December 30, 2025',
            readTime: '3 min read'
        },
        {
            id: 5,
            title: 'Preparing for Your First Blood Donation',
            excerpt: 'Nervous about donating blood for the first time? Here\'s everything you need to know to make your experience smooth and comfortable.',
            image: 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=800&q=80',
            category: 'Donation Guide',
            author: 'Jennifer White',
            date: 'December 28, 2025',
            readTime: '8 min read'
        },
        {
            id: 6,
            title: 'Community Heroes: Monthly Donor Spotlight',
            excerpt: 'Meet John Davis, who has donated blood over 50 times and continues to inspire others in our community.',
            image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80',
            category: 'Community',
            author: 'Lisa Anderson',
            date: 'December 25, 2025',
            readTime: '5 min read'
        }
    ];

    const featuredPost = blogPosts[0];
    const regularPosts = blogPosts.slice(1);

    const filteredPosts = selectedCategory === 'All'
        ? regularPosts
        : regularPosts.filter(post => post.category === selectedCategory);

    return (
        <div>
            <Navbar></Navbar>
            <div className="min-h-screen bg-gray-50">
                {/* Hero Section */}
                <div className="relative bg-gradient-to-r from-red-500 to-pink-600 text-white py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="text-5xl font-bold mb-4">BloodBank Blog</h1>
                        <p className="text-xl max-w-3xl mx-auto">
                            Stories, tips, and news from our community of life-savers
                        </p>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {/* Search Bar */}
                    <div className="mb-8">
                        <div className="relative max-w-2xl mx-auto">
                            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search articles..."
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                            />
                        </div>
                    </div>

                    {/* Category Filter */}
                    <div className="mb-12">
                        <div className="flex flex-wrap justify-center gap-3">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`px-6 py-2 rounded-full font-medium transition ${selectedCategory === category
                                            ? 'bg-red-500 text-white'
                                            : 'bg-white text-gray-700 hover:bg-gray-100'
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Featured Post */}
                    {selectedCategory === 'All' && (
                        <div className="mb-16">
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">Featured Article</h2>
                            <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition">
                                <div className="grid md:grid-cols-2 gap-0">
                                    <div className="h-64 md:h-auto">
                                        <img
                                            src={featuredPost.image}
                                            alt={featuredPost.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="p-8 flex flex-col justify-center">
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium">
                                                {featuredPost.category}
                                            </span>
                                        </div>
                                        <h3 className="text-3xl font-bold text-gray-900 mb-4">
                                            {featuredPost.title}
                                        </h3>
                                        <p className="text-gray-600 mb-6 leading-relaxed">
                                            {featuredPost.excerpt}
                                        </p>
                                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                                            <div className="flex items-center gap-2">
                                                <FaUser className="text-red-500" />
                                                <span>{featuredPost.author}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <FaCalendar className="text-red-500" />
                                                <span>{featuredPost.date}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <FaClock className="text-red-500" />
                                                <span>{featuredPost.readTime}</span>
                                            </div>
                                        </div>
                                        <button className="bg-red-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-red-600 transition w-fit">
                                            Read More
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Blog Grid */}
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">
                            {selectedCategory === 'All' ? 'Latest Articles' : `${selectedCategory} Articles`}
                        </h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredPosts.map((post) => (
                                <article
                                    key={post.id}
                                    className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition group cursor-pointer"
                                >
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                                        />
                                        <div className="absolute top-4 left-4">
                                            <span className="bg-white text-red-600 px-3 py-1 rounded-full text-sm font-medium">
                                                {post.category}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-red-500 transition">
                                            {post.title}
                                        </h3>
                                        <p className="text-gray-600 mb-4 line-clamp-3">
                                            {post.excerpt}
                                        </p>
                                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                                            <div className="flex items-center gap-2">
                                                <FaUser className="text-red-500" />
                                                <span>{post.author}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <FaClock className="text-red-500" />
                                                <span>{post.readTime}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <FaCalendar className="text-red-500" />
                                            <span>{post.date}</span>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>

                    {/* Newsletter Section */}
                    <div className="mt-16 bg-gradient-to-r from-red-500 to-pink-600 rounded-lg p-12 text-center text-white">
                        <FaHeart className="w-12 h-12 mx-auto mb-4" />
                        <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
                        <p className="text-lg mb-6 max-w-2xl mx-auto">
                            Subscribe to our newsletter and get the latest stories, tips, and news delivered to your inbox.
                        </p>
                        <div className="flex bg-red-50 flex-col sm:flex-row gap-3 max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-4 py-3 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                            />
                            <button className="bg-white text-red-500 px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition">
                                Subscribe
                            </button>
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