import React from 'react';
import './ClinicsPage.css';
import { Clock, MapPinSimpleAreaIcon } from '@phosphor-icons/react';

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
              <strong>
                <MapPinSimpleAreaIcon
                  size={20}
                  weight="bold"
                  className="icon-item"
                />{' '}
                Location
              </strong>
              Ben Gurion Blvd 4, Haifa, Israel
            </div>

            <div className="clinic-item">
              <strong>
                <Clock
                  size={20}
                  weight="bold"
                  className="icon-item"
                />{' '}
                Hours
              </strong>
              Mon-Fri: 8am-6pm | Sat: 9am-1pm
            </div>
            <div className="clinic-map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7974.140186045572!2d34.98753709438236!3d32.82636995941275!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151dbbcb7737a60f%3A0x80c6b3e567825840!2z15HXmdeqINeU16jXldek15DXmdedINeU157Xldep15HXlCDXlNeS16jXnteg15nXqg!5e0!3m2!1sen!2sil!4v1762345297808!5m2!1sen!2sil"
                width="612.5"
                height="300"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
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
              <strong>
                <MapPinSimpleAreaIcon
                  size={20}
                  weight="bold"
                  className="icon-item"
                />{' '}
                Location
              </strong>
              Ussishkin St 6, Kiryat Motzkin, Israel
            </div>

            <div className="clinic-item">
              <strong>
                <Clock
                  size={20}
                  weight="bold"
                  className="icon-item"
                />{' '}
                Hours
              </strong>
              Mon-Thu: 9am-5pm | Fri: 9am-2pm
            </div>
            <div className="clinic-map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3352.5603948495004!2d35.0790442!3d32.830411!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151db721dd3b6b0f%3A0xd52f2166163ca1e0!2sUssishkin%20St%206%2C%20Kiryat%20Motzkin!5e0!3m2!1sen!2sil!4v1762344839939!5m2!1sen!2sil"
                width="612"
                height="300"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
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

      {/* <div className="section">
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
      </div> */}
    </div>
  );
};

export default ClinicsPage;
