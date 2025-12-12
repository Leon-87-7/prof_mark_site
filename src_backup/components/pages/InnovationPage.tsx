import React from 'react';
import './InnovationPage.css';

const InnovationPage: React.FC = () => {
  return (
    <div className="page active colored-top-border">
      <div className="section">
        <h2 className="section-title">Surgical Innovation</h2>
        <p className="section-subtitle">
          Pioneering research, advanced surgical techniques, and
          global mentorship advancing the field of orthopedic surgery.
        </p>
      </div>

      <div className="cards-grid">
        <div className="card">
          <div className="card-header">🔬</div>
          <div className="card-content">
            <h3>Pioneering Techniques</h3>
            <p>
              Developed innovative surgical approaches that improve
              patient outcomes and reduce complication rates.
            </p>
            <span
              className="card-link"
              onClick={() =>
                alert(
                  'Innovation: Advanced surgical techniques with 99%+ success rate'
                )
              }
            >
              View Details →
            </span>
          </div>
        </div>

        <div className="card">
          <div className="card-header">📚</div>
          <div className="card-content">
            <h3>Research & Publications</h3>
            <p>
              40+ peer-reviewed articles published in leading medical
              journals worldwide.
            </p>
            <span
              className="card-link"
              onClick={() =>
                alert(
                  '40+ publications in leading journals including Journal of Orthopedic Surgery, Limb Lengthening & Reconstruction'
                )
              }
            >
              View Publications →
            </span>
          </div>
        </div>

        <div className="card">
          <div className="card-header">🎓</div>
          <div className="card-content">
            <h3>Mentorship Program</h3>
            <p>
              International fellowship training and surgical technique
              workshops for next-generation surgeons.
            </p>
            <span
              className="card-link"
              onClick={() =>
                alert(
                  'Mentorship: 50+ surgeons trained, annual fellowship program, surgical workshops 2x yearly'
                )
              }
            >
              Apply →
            </span>
          </div>
        </div>

        <div className="card">
          <div className="card-header">🌍</div>
          <div className="card-content">
            <h3>Global Collaborations</h3>
            <p>
              Research partnerships and collaborative cases with
              leading orthopedic centers worldwide.
            </p>
            <span
              className="card-link"
              onClick={() =>
                alert(
                  'Collaborations with top centers in Canada, USA, Europe, Egypt, and Asia'
                )
              }
            >
              View Network →
            </span>
          </div>
        </div>
      </div>

      <div className="service-detail">
        <h3>🔬 Key Innovations</h3>
        <div className="two-column">
          <div className="column">
            <h4>Advanced Surgical Techniques</h4>
            <ul>
              <li>Telescopic free-gliding screw</li>
              <li>Enhanced bone healing protocols</li>
              <li>Minimally invasive approaches</li>
              <li>Computer-assisted planning</li>
            </ul>
          </div>
          <div className="column">
            <h4>Research Focus Areas</h4>
            <ul>
              <li>Osteogenesis optimization</li>
              <li>Complication prevention</li>
              <li>Heparan sulfate effects</li>
              <li>Patient outcomes analysis</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="section recent-publications">
        <h2 className="section-title">Recent Publications</h2>
        <div className="cards-grid">
          <div className="card">
            <div className="card-content">
              <h3>Advanced Techniques in Limb Lengthening (2023)</h3>
              <p>
                <em>Journal of Orthopedic Surgery</em>
              </p>
              <p>
                Key findings on improving patient outcomes through
                innovative surgical approaches.
              </p>
              <span className="card-link">Read Article →</span>
            </div>
          </div>
          <div className="card">
            <div className="card-content">
              <h3>
                Complication Prevention in Deformity Correction (2023)
              </h3>
              <p>
                <em>Limb Lengthening & Reconstruction</em>
              </p>
              <p>
                Analysis of 500+ cases showing best practices for
                minimal complications.
              </p>
              <span className="card-link">Read Article →</span>
            </div>
          </div>
          <div className="card">
            <div className="card-content">
              <h3>Mentorship in Surgical Excellence (2022)</h3>
              <p>
                <em>Medical Education Review</em>
              </p>
              <p>
                Framework for training next-generation surgeons in
                orthopedic specialties.
              </p>
              <span className="card-link">Read Article →</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InnovationPage;
