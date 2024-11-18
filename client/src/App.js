import React from 'react';
import './';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SearchContainer from './components/SearchContainer';
import MessageSection from './components/MessageSection';
import Footer from './components/Footer';


const App = () => (
    <>
        <Navbar />
        <Hero />
        <SearchContainer />
        <MessageSection />
        <Footer />
    </>
);

export default App;
