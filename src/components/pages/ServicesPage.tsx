import React from 'react';
import './ServicesPage.css';

interface ServicesPageProps {
  onBookingClick: () => void;
}

const ServicesPage: React.FC<ServicesPageProps> = ({
  onBookingClick,
}) => {
  return (
    <div className="page active">
      <div className="section">
        <h2 className="section-title">Our Services</h2>
        <p className="section-subtitle">
          Comprehensive orthopedic care specializing in limb
          lengthening, length discrepancy correction, and complex
          deformity reconstruction.
        </p>
      </div>

      <div className="cards-grid">
        <div className="card">
          <div className="card-header">📏</div>
          <div className="card-content">
            <h3>Cosmetic Limb Lengthening</h3>
            <p>
              Enhance height through bilateral leg lengthening
              surgery. Achieve 5-8cm height gain with natural-looking
              results.
            </p>
            <span
              className="card-link"
              onClick={() =>
                alert(
                  'Service Detail: Cosmetic Limb Lengthening - 5-8cm height gain, 12-month total recovery, from $120,000 NIS'
                )
              }
            >
              Learn More →
            </span>
          </div>
        </div>

        <div className="card">
          <div className="card-header">⚖️</div>
          <div className="card-content">
            <h3>Limb Length Discrepancy</h3>
            <p>
              Correct unequal limb lengths from injury, infection, or
              illness. Restore balance and eliminate pain.
            </p>
            <span
              className="card-link"
              onClick={() =>
                alert(
                  'Service Detail: Limb Length Discrepancy (LLD) - Personalized correction based on cause and severity'
                )
              }
            >
              Learn More →
            </span>
          </div>
        </div>

        <div className="card">
          <div className="card-header">🔨</div>
          <div className="card-content">
            <h3>Deformity Reconstruction</h3>
            <p>
              Correct acquired deformities of bones and joints.
              Complex cases using advanced surgical techniques.
            </p>
            <span
              className="card-link"
              onClick={() =>
                alert(
                  'Service Detail: Deformity Reconstruction - Treatment for complex acquired deformities'
                )
              }
            >
              Learn More →
            </span>
          </div>
        </div>

        <div className="card">
          <div className="card-header">👧</div>
          <div className="card-content">
            <h3>Pediatric Orthopedic</h3>
            <p>
              Specialized care for children's bone and joint
              conditions. Gentle approach with excellent outcomes.
            </p>
            <span
              className="card-link"
              onClick={() =>
                alert(
                  'Service Detail: Pediatric Orthopedics - Specialized treatment for children'
                )
              }
            >
              Learn More →
            </span>
          </div>
        </div>
      </div>

      <div className="service-detail">
        <h3>Featured Service: Cosmetic Limb Lengthening</h3>
        <div className="two-column">
          <div className="column">
            <h4>What is Cosmetic Limb Lengthening?</h4>
            <p>
              Cosmetic stature lengthening is a procedure that
              increases height by lengthening both legs
              simultaneously. It's the safest and most effective way
              to achieve significant height gain.
            </p>
            <h4>Who is it for?</h4>
            <ul>
              <li>Adults seeking height increase</li>
              <li>5-8cm lengthening achievable</li>
              <li>Healthy bone structure required</li>
              <li>Realistic expectations important</li>
            </ul>
          </div>
          <div className="column">
            <h4>Expected Outcomes</h4>
            <ul>
              <li>Average 5-8cm height gain</li>
              <li>Natural appearance</li>
              <li>Improved confidence & proportions</li>
              <li>Minimal scarring</li>
              <li>Complication rate: &lt;2%</li>
            </ul>
            <h4>Timeline</h4>
            <ul>
              <li>Surgery: 1-2 hours per leg</li>
              <li>Lengthening phase: 12 weeks</li>
              <li>Consolidation: 3-6 months</li>
              <li>Total recovery: ~12 months</li>
            </ul>
          </div>
        </div>
        <button
          className="btn btn-primary"
          onClick={onBookingClick}
        >
          Book Consultation
        </button>
      </div>

      <div className="section">
        <h2 className="section-title">Pricing Information</h2>
        <div className="cards-grid">
          <div className="card pricing-card">
            <div className="card-content">
              <h3>Femur Lengthening</h3>
              <p className="pricing-amount">$120,000 NIS</p>
              <p className="pricing-note">
                Includes 3 months physical therapy
              </p>
            </div>
          </div>
          <div className="card pricing-card">
            <div className="card-content">
              <h3>Tibia Lengthening</h3>
              <p className="pricing-amount">$95,000 NIS</p>
              <p className="pricing-note">
                Includes 3 months physical therapy
              </p>
            </div>
          </div>
          <div className="card pricing-card">
            <div className="card-content">
              <h3>Device Removal</h3>
              <p className="pricing-amount">$15,000 NIS</p>
              <p className="pricing-note">
                Minor procedure, 1 night stay
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
