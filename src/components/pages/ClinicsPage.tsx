import React from 'react';
import './ClinicsPage.css';

interface ClinicsPageProps {
  onBookingClick: () => void;
}

const ClinicsPage: React.FC<ClinicsPageProps> = ({
  onBookingClick,
}) => {
  return (
    <div className="page active">
      <div className="section">
        <h2 className="section-title">My Clinics</h2>
        <p className="section-subtitle">
          Two conveniently located facilities serving patients across
          Israel and internationally with state-of-the-art surgical
          capabilities and comprehensive post-operative care.
        </p>
      </div>

      <div className="clinics-grid">
        <div className="clinic-card">
          <div className="clinic-header">🏥 HAIFA CLINIC</div>
          <div className="clinic-content">
            <div className="clinic-item">
              <strong>📍 Location</strong>
              123 Medical Street, Haifa, Israel
            </div>
            <div className="clinic-item">
              <strong>📞 Phone</strong>
              +972 (0)4 123-4567
            </div>
            <div className="clinic-item">
              <strong>📧 Email</strong>
              haifa@clinicemail.com
            </div>
            <div className="clinic-item">
              <strong>🕐 Hours</strong>
              Mon-Fri: 8am-6pm | Sat: 9am-1pm
            </div>
            <div className="clinic-map">🗺️ Interactive Map</div>
            <div className="clinic-item">
              <strong>Services Available:</strong>
              <br />
              • Full surgical facility
              <br />
              • Physical therapy rooms
              <br />
              • In-person consultations
              <br />
              • Post-operative care
              <br />• Patient accommodation support
            </div>
            <button
              className="btn btn-primary"
              onClick={onBookingClick}
            >
              Schedule Haifa Consultation
            </button>
          </div>
        </div>

        <div className="clinic-card">
          <div className="clinic-header kiryat">
            🏥 KIRYAT MOTZKIN CLINIC
          </div>
          <div className="clinic-content">
            <div className="clinic-item">
              <strong>📍 Location</strong>
              456 Health Avenue, Kiryat Motzkin, Israel
            </div>
            <div className="clinic-item">
              <strong>📞 Phone</strong>
              +972 (0)4 765-4321
            </div>
            <div className="clinic-item">
              <strong>📧 Email</strong>
              kiryat@clinicemail.com
            </div>
            <div className="clinic-item">
              <strong>🕐 Hours</strong>
              Mon-Thu: 9am-5pm | Fri: 9am-2pm
            </div>
            <div className="clinic-map">🗺️ Interactive Map</div>
            <div className="clinic-item">
              <strong>Services Available:</strong>
              <br />
              • Initial consultations
              <br />
              • Follow-up appointments
              <br />
              • Physical therapy
              <br />
              • Patient education
              <br />• Wellness support
            </div>
            <button
              className="btn btn-primary"
              onClick={onBookingClick}
            >
              Schedule Kiryat Motzkin Consultation
            </button>
          </div>
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">Virtual Consultation</h2>
        <p className="section-subtitle">
          For international patients or initial screening
          consultations, we offer secure video consultations with
          Prof. Eidelman.
        </p>
        <div className="service-detail">
          <h3>Perfect for:</h3>
          <ul>
            <li>International patients seeking initial assessment</li>
            <li>Pre-surgery consultations before visiting Israel</li>
            <li>Post-operative follow-ups from home</li>
            <li>Second opinion consultations</li>
          </ul>
          <button
            className="btn btn-secondary"
            onClick={onBookingClick}
          >
            Schedule Virtual Consultation
          </button>
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">Team Members</h2>
        <div className="cards-grid">
          <div className="card">
            <div className="card-header">👨‍⚕️</div>
            <div className="card-content">
              <h3>Prof. Mark Eidelman</h3>
              <p>Chief Surgeon & Founder</p>
              <p>25+ years orthopedic expertise</p>
            </div>
          </div>
          <div className="card">
            <div className="card-header">👩‍⚕️</div>
            <div className="card-content">
              <h3>Dr. Rachel Cohen</h3>
              <p>Associate Surgeon</p>
              <p>Limb lengthening specialist</p>
            </div>
          </div>
          <div className="card">
            <div className="card-header">🧑‍⚕️</div>
            <div className="card-content">
              <h3>David Levy, PT</h3>
              <p>Lead Physiotherapist</p>
              <p>Post-op rehabilitation expert</p>
            </div>
          </div>
          <div className="card">
            <div className="card-header">👩‍⚕️</div>
            <div className="card-content">
              <h3>Yael Moran, RN</h3>
              <p>Surgical Nurse Coordinator</p>
              <p>Patient care specialist</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClinicsPage;
