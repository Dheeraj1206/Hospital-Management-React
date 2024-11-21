import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// ScrollToTop Component
const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    // Scroll to the top of the page every time the route changes
    window.scrollTo(0, 0);
  }, [location]); // Dependency on location ensures it runs on route changes

  return null; // This component doesn't need to render anything
};

export default ScrollToTop;
