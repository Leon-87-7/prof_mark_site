import { useState } from 'react';
import type { ReactElement } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/App.css';
import Header from './components/Header/Header';
import Navigation from './components/Navigation/Navigation';
import Footer from './components/Footer/Footer';
import BookingModal from './components/BookingModal/BookingModal';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import HomePage from './components/pages/HomePage';
import ClinicsPage from './components/pages/ClinicsPage';
import ServicesPage from './components/pages/ServicesPage';
import InnovationPage from './components/pages/InnovationPage';
import GuidesPage from './components/pages/GuidesPage';
import StudyPage from './components/pages/StudyPage';

function App(): ReactElement {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const handleBookingOpen = (): void => {
    setIsBookingModalOpen(true);
  };

  const handleBookingClose = (): void => {
    setIsBookingModalOpen(false);
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Navigation />
      <main
        className="container"
        id="main-content"
        role="main"
      >
        <Routes>
          <Route
            path="/"
            element={<HomePage onBookingClick={handleBookingOpen} />}
          />
          <Route
            path="/clinics"
            element={<ClinicsPage />}
          />
          <Route
            path="/services"
            element={
              <ServicesPage onBookingClick={handleBookingOpen} />
            }
          />
          <Route
            path="/innovation"
            element={<InnovationPage />}
          />
          <Route
            path="/guides"
            element={<GuidesPage />}
          />
          <Route
            path="/study"
            element={<StudyPage />}
          />
        </Routes>
      </main>
      <Footer />
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={handleBookingClose}
      />
    </BrowserRouter>
  );
}

export default App;
