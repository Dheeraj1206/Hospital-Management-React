import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SearchContainer from './components/SearchContainer';
import MessageSection from './components/MessageSection';
import Footer from './components/Footer';
import DoctorList from './components/DoctorList';
import ScrollToTop from './components/ScrollToTop';
import HospitalDataFilterer from './components/HospitalDataFilterer';
import HospitalDepartments from './components/HospitalDepartment';
import ProfilePage from './components/ProfilePage';
import HospitalProfilePage from './components/HospitalProfilePage';

function App() {
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
				<Route path="/departments" element={<HospitalDepartments />} />
				<Route path="/doctors" element={<DoctorList />} />
				<Route
					path="/hospitals"
					element={
						<>
							<HospitalDataFilterer />
						</>
					}
				/>
				<Route
					path="/doctors/:doctorName"
					element={
						<>
							<ProfilePage />
						</>
					}
				/>
				<Route
					path="/hospitals/:hospitalName"
					element={
						<>
							<HospitalProfilePage />
						</>
					}
				/>
			</Routes>
			<Footer />
		</Router>
	);
}

export default App;
