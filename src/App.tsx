import { useState } from 'react';
import type { ReactElement } from 'react';
import type { PageType } from './types';
import './styles/App.css';
import Header from './components/Header/Header';
import Navigation from './components/Navigation/Navigation';
import Footer from './components/Footer/Footer';
import BookingModal from './components/BookingModal/BookingModal';
import AboutPage from './components/pages/AboutPage';
import ClinicsPage from './components/pages/ClinicsPage';
import ServicesPage from './components/pages/ServicesPage';
import InnovationPage from './components/pages/InnovationPage';
import GuidesPage from './components/pages/GuidesPage';
import StudyPage from './components/pages/StudyPage';

function App(): ReactElement {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const handlePageChange = (page: PageType): void => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookingOpen = (): void => {
    setIsBookingModalOpen(true);
  };

  const handleBookingClose = (): void => {
    setIsBookingModalOpen(false);
  };

  const renderPage = (): ReactElement => {
    switch (currentPage) {
      case 'home':
        return <AboutPage onBookingClick={handleBookingOpen} onPageChange={handlePageChange} />;
      case 'clinics':
        return <ClinicsPage onBookingClick={handleBookingOpen} />;
      case 'services':
        return <ServicesPage onBookingClick={handleBookingOpen} />;
      case 'innovation':
        return <InnovationPage />;
      case 'guides':
        return <GuidesPage />;
      case 'study':
        return <StudyPage />;
      default:
        // Exhaustiveness check
        const _exhaustive: never = currentPage;
        return _exhaustive;
    }
  };

  return (
    <>
      <Header onBookingClick={handleBookingOpen} />
      <Navigation activePage={currentPage} onPageChange={handlePageChange} />
      <main className="container" id="main-content" role="main">
        {renderPage()}
      </main>
      <Footer onPageChange={handlePageChange} />
      <BookingModal isOpen={isBookingModalOpen} onClose={handleBookingClose} />
    </>
  );
}

export default App;
