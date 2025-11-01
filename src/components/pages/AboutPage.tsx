import React from 'react';
import type { PageType } from '../../types';

interface AboutPageProps {
  onBookingClick: () => void;
  onPageChange: (page: PageType) => void;
}

const AboutPage: React.FC<AboutPageProps> = ({
  onBookingClick,
  onPageChange,
}) => {
  return (
    <div className="page active">
      <div className="hero">
        <div className="hero-content">
          <h1>Leading Paediatric Orthopaedist</h1>
          <p>Limb Lengthening & Deformity Correction Specialist</p>
          <p>
            With 25+ years of expertise and over 1,000 successful
            surgeries, Prof. Mark Eidelman is your trusted partner in
            orthopedic care. Pioneering surgical techniques and
            mentoring the next generation of surgeons globally.
          </p>
          <div className="hero-stats">
            <div className="stat-card">
              <div className="number">25+</div>
              <div className="label">Years Experience</div>
            </div>
            <div className="stat-card">
              <div className="number">1000+</div>
              <div className="label">Surgeries</div>
            </div>
            <div className="stat-card">
              <div className="number">50+</div>
              <div className="label">Trained</div>
            </div>
          </div>
          <div className="cta-buttons">
            <button
              className="btn btn-primary"
              onClick={onBookingClick}
            >
              Book Consultation
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => onPageChange('clinics')}
            >
              Explore Clinics
            </button>
            <button
              className="btn btn-tertiary"
              onClick={() => onPageChange('innovation')}
            >
              Surgical Innovation
            </button>
          </div>
        </div>
        <div className="hero-image">
          <div className="placeholder">👨‍⚕️</div>
          <p>Prof. Mark Eidelman, MD</p>
          <p style={{ fontSize: '12px', color: 'var(--text-light)' }}>
            Professional Photo
          </p>
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">Professional Credentials</h2>
        <div className="two-column">
          <div className="column">
            <h4>Education & Training</h4>
            <ul>
              <li>MD - Hebrew University</li>
              <li>Residency - Orthopedic Surgery</li>
              <li>
                Fellowship - International Center for Limb Lengthening
              </li>
              <li>
                Board Certified - Israeli Board of Orthopedic Surgery
              </li>
            </ul>
          </div>
          <div className="column">
            <h4>Specializations</h4>
            <ul>
              <li>Pediatric Orthopedics</li>
              <li>Limb Lengthening Surgery</li>
              <li>Complex Deformity Correction</li>
              <li>Advanced Surgical Techniques</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">Mentorship & Impact</h2>
        <p className="section-subtitle">
          Prof. Eidelman has trained and mentored leading surgeons
          worldwide, including top specialists who now run their own
          successful practices.
        </p>
        <div className="cards-grid">
          <div className="card">
            <div className="card-content">
              <h3>🌍 Dr. Marie Gdalevitch</h3>
              <p>
                Canada's leading limb lengthening specialist and
                founder of Canadian Limb Lengthening Clinic.
              </p>
              <span className="card-link">View Profile →</span>
            </div>
          </div>
          <div className="card">
            <div className="card-content">
              <h3>🌍 Dr. Ahmed Hassan</h3>
              <p>
                Egypt's premier deformity correction expert with
                international recognition.
              </p>
              <span className="card-link">View Profile →</span>
            </div>
          </div>
          <div className="card">
            <div className="card-content">
              <h3>🌍 Dr. Sofia Rodriguez</h3>
              <p>
                Spain's leading pediatric orthopedic specialist and
                researcher.
              </p>
              <span className="card-link">View Profile →</span>
            </div>
          </div>
          <div className="card">
            <div className="card-content">
              <h3>🌍 Global Network</h3>
              <p>
                50+ surgeons trained across 25 countries, advancing
                orthopedic care worldwide.
              </p>
              <span className="card-link">View Network →</span>
            </div>
          </div>
        </div>
      </div>

      <div className="testimonials">
        <div className="testimonial">
          <div className="stars">★★★★★</div>
          <div className="testimonial-text">
            "Prof. Eidelman's expertise and compassionate approach
            transformed my life. The results exceeded all my
            expectations."
          </div>
          <div className="testimonial-author">Sarah M., Canada</div>
        </div>
        <div className="testimonial">
          <div className="stars">★★★★★</div>
          <div className="testimonial-text">
            "The most professional and caring surgeon I could ask for.
            I highly recommend Prof. Eidelman without hesitation."
          </div>
          <div className="testimonial-author">David K., USA</div>
        </div>
        <div className="testimonial">
          <div className="stars">★★★★★</div>
          <div className="testimonial-text">
            "My daughter's surgery was a complete success. We trust
            Prof. Eidelman completely with our family's care."
          </div>
          <div className="testimonial-author">Maria R., Spain</div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
