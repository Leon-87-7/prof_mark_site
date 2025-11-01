import React from 'react';
import './GuidesPage.css';

const GuidesPage: React.FC = () => {
  return (
    <div className="page active">
      <div className="section">
        <h2 className="section-title">Patient Guides</h2>
        <p className="section-subtitle">
          Comprehensive resources to prepare for and recover from your treatment, including downloadable guides,
          exercises, and FAQs.
        </p>
      </div>

      <div className="guides-buttons">
        <button
          className="btn btn-primary"
          onClick={() => alert('Pre-Surgery Guide showing preparation checklist, medications, exercises')}
        >
          📋 Pre-Surgery Guide
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => alert('Post-Surgery Guide showing first week recovery, pain management, wound care')}
        >
          📋 Post-Surgery Guide
        </button>
        <button
          className="btn btn-tertiary"
          onClick={() => alert('Physical Therapy exercises with detailed instructions and video guides')}
        >
          📋 PT Exercises
        </button>
        <button
          className="btn btn-primary"
          onClick={() => alert('Complete recovery timeline tracking your progress through each phase')}
        >
          📋 Recovery Timeline
        </button>
      </div>

      <div className="section">
        <h2 className="section-title section-title-small">
          Pre-Surgery Guides
        </h2>
        <div className="cards-grid">
          <div className="card">
            <div className="card-header">✅</div>
            <div className="card-content">
              <h3>Pre-Surgery Checklist</h3>
              <p>Complete checklist for medical clearance, medications, fasting, and pre-operative preparation.</p>
              <button
                className="btn btn-primary"
                onClick={() => alert('Downloading: Pre-Surgery-Checklist.pdf')}
              >
                ⬇️ Download PDF
              </button>
            </div>
          </div>
          <div className="card">
            <div className="card-header">💪</div>
            <div className="card-content">
              <h3>Pre-Surgery Exercises</h3>
              <p>Prescribed stretching and strengthening routines to prepare your body for surgery.</p>
              <button
                className="btn btn-primary"
                onClick={() => alert('Downloading: Pre-Surgery-Exercises.pdf')}
              >
                ⬇️ Download PDF
              </button>
            </div>
          </div>
          <div className="card">
            <div className="card-header">❓</div>
            <div className="card-content">
              <h3>Questions to Ask</h3>
              <p>Important questions to discuss with Prof. Eidelman during your consultation.</p>
              <button
                className="btn btn-primary"
                onClick={() => alert('Downloading: Questions-to-Ask-Your-Surgeon.pdf')}
              >
                ⬇️ Download PDF
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="section">
        <h2 className="section-title section-title-small">
          Post-Surgery Guides
        </h2>
        <div className="cards-grid">
          <div className="card">
            <div className="card-header">📅</div>
            <div className="card-content">
              <h3>First Week Recovery</h3>
              <p>Hospital stay expectations, pain management, and immediate post-operative care instructions.</p>
              <button
                className="btn btn-primary"
                onClick={() => alert('Downloading: First-Week-Recovery-Guide.pdf')}
              >
                ⬇️ Download PDF
              </button>
            </div>
          </div>
          <div className="card">
            <div className="card-header">📈</div>
            <div className="card-content">
              <h3>Lengthening Phase</h3>
              <p>Detailed guide for the 12-week lengthening phase including exercises and bi-weekly check-ups.</p>
              <button
                className="btn btn-primary"
                onClick={() => alert('Downloading: Lengthening-Phase-Guide.pdf')}
              >
                ⬇️ Download PDF
              </button>
            </div>
          </div>
          <div className="card">
            <div className="card-header">🏥</div>
            <div className="card-content">
              <h3>PT During Recovery</h3>
              <p>Physical therapy schedule, at-home exercises with videos, and progress tracking.</p>
              <button
                className="btn btn-primary"
                onClick={() => alert('Downloading: Physical-Therapy-Guide.pdf')}
              >
                ⬇️ Download PDF
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="service-detail">
        <h3>📦 Download All Guides</h3>
        <p>Get a complete bundle of all guides, exercise sheets, tracking logs, and resources in one convenient package.</p>
        <button
          className="btn btn-primary"
          onClick={() => alert('Downloading: Complete-Patient-Guides-Bundle.zip (25MB)')}
        >
          ⬇️ Download Complete Bundle (ZIP)
        </button>
      </div>

      <div className="section">
        <h2 className="section-title section-title-small">
          Frequently Asked Questions
        </h2>
        <div className="cards-grid">
          <div className="card">
            <div className="card-content">
              <h3>How long is recovery?</h3>
              <p>Total recovery is approximately 12 months, with most patients returning to normal activities by month 6-8.</p>
            </div>
          </div>
          <div className="card">
            <div className="card-content">
              <h3>What are the risks?</h3>
              <p>Complication rate is &lt;2% with proper care. Common concerns are addressed during consultation.</p>
            </div>
          </div>
          <div className="card">
            <div className="card-content">
              <h3>Can I fly after surgery?</h3>
              <p>Flying is typically allowed 2-3 weeks after surgery with proper precautions. We provide detailed travel guidelines.</p>
            </div>
          </div>
          <div className="card">
            <div className="card-content">
              <h3>What's the maximum gain?</h3>
              <p>Most patients achieve 5-8cm safely. The exact amount depends on individual bone tolerance.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuidesPage;
