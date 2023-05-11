import React from 'react';
import Footer from '../components/Footer';
import AboutUs from '../components/home/AboutUs';
import Blog from '../components/home/Blog';
import Intro from '../components/home/Intro';
import Roadmap from '../components/home/Roadmap';
import Supportedfeatures from '../components/home/Supportedfeatures';
import Trade from '../components/home/Trade';
import Navbar from '../components/Navbar';

function Home() {
  return (
    <main className='pt-[120px] bg-[#1E1E1E] w-full'>
        <Navbar />
        <Intro />
        <Trade />
        <Supportedfeatures />
        <AboutUs />
        <Roadmap />
        <Blog />
        <Footer />
    </main>
  )
}

export default Home