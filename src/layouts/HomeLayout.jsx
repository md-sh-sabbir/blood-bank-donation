import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import Banner from '../components/Banner';
import FeaturesSection from '../components/FeaturesSection';
import ContactUs from '../components/ContactUs';
import Footer from '../components/Footer';

const HomeLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Banner></Banner>
            <FeaturesSection></FeaturesSection>
            <ContactUs></ContactUs>
            <Footer></Footer>         
        </div>
    );
};

export default HomeLayout;