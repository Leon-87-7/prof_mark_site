import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AboutPage.css';

interface AboutPageProps {
  onBookingClick: () => void;
}

const AboutPage: React.FC<AboutPageProps> = (
  {
    // onBookingClick,
  }
) => {
  const navigate = useNavigate();
  return (
    <div className="page active">
      <div className="hero">
        <div className="hero-wrapper">
          <div className="hero-content">
            <h1>Leading the Future of Pediatric Orthopedics</h1>
            <h3>
              Limb Lengthening & Deformity Correction Specialist
            </h3>
            <p>
              <b>Prof. Mark Eidelman</b> brings over{' '}
              <b>25 years of specialized expertise</b> and 3,000
              successful surgeries to pediatric care. As a global
              authority dedicated to complex deformity correction and
              limb lengthening,{' '}
              <span className="highlighted-text">
                he helps children achieve balanced leg length, ideal
                stature, and a happy, fulfilling life.
              </span>{' '}
              Pioneering techniques. Global mentorship.
            </p>
            <div className="hero-stats">
              <div className="stat-card">
                <div className="number">25+</div>
                <div className="label">Years Experience</div>
              </div>
              <div className="stat-card">
                <div className="number">3000+</div>
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
                onClick={() => navigate('/clinics')}
              >
                Explore Clinics
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => navigate('/guides')}
              >
                Patient Guides
              </button>
              <button
                className="btn btn-tertiary"
                onClick={() => navigate('/innovation')}
              >
                Surgical Innovation
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="credentials">
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

      <div className="testimonials-wrapper">
        <h2 className="section-title">Testimonials</h2>
        <div className="testimonials">
          <div className="testimonial">
            <div className="testimonial-author">Sarah M., Canada</div>
            <div className="stars">★★★★★</div>
            <div className="testimonial-text">
              "Prof. Eidelman's expertise and compassionate approach
              transformed my life. The results exceeded all my
              expectations."
            </div>
          </div>
          <div className="testimonial">
            <div className="testimonial-author">David K., USA</div>
            <div className="stars">★★★★★</div>
            <div className="testimonial-text">
              "The most professional and caring surgeon I could ask
              for. I highly recommend Prof. Eidelman without
              hesitation."
            </div>
          </div>
          <div className="testimonial">
            <div className="testimonial-author">Maria R., Spain</div>
            <div className="stars">★★★★★</div>
            <div className="testimonial-text">
              "My daughter's surgery was a complete success. We trust
              Prof. Eidelman completely with our family's care."
            </div>
          </div>
        </div>
      </div>

      <div className="mentorship colored-top-border">
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
    </div>
  );
};

export default AboutPage;
