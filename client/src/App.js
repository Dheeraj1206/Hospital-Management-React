import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SearchContainer from './components/SearchContainer';
import MessageSection from './components/MessageSection';
import Footer from './components/Footer';
import DoctorList from './components/DoctorList';
import ScrollToTop from './components/ScrollToTop';

const App = () => {
	return (
		<Router>
			<Navbar />
			<ScrollToTop />
			<Routes>
				<Route
					path="/"
					element={
						<>
							<Hero />
							<SearchContainer />
							<MessageSection />
						</>
					}
				/>
				<Route path="/doctors" element={<DoctorList />} />
			</Routes>
			<Footer />
		</Router>
	);
};

export default App;
