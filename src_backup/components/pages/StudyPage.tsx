import React from 'react';
import './StudyPage.css';

const StudyPage: React.FC = () => {
  return (
    <div className="page active">
      <div className="section">
        <h2 className="section-title">Study Area</h2>
        <p className="section-subtitle">
          Educational hub featuring articles, case studies, lectures,
          and research papers from Prof. Eidelman and the orthopedic
          community.
        </p>
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="🔍 Search articles, case studies, lectures..."
          className="search-input"
        />
        <div className="filter-buttons">
          <button className="btn btn-secondary">All</button>
          <button className="btn btn-secondary">Articles</button>
          <button className="btn btn-secondary">Case Studies</button>
          <button className="btn btn-secondary">Lectures</button>
          <button className="btn btn-secondary">Research</button>
        </div>
      </div>

      <div className="cards-grid colored-headers-cards study-cards">
        <div className="card">
          <div className="card-header card-header-rounded card-header-blue">
            📄
          </div>
          <div className="card-content">
            <h3>Advanced Surgical Techniques</h3>
            <p>
              <strong>Article</strong> • Published January 2024
            </p>
            <p>
              Detailed guide to modern limb lengthening surgical
              approaches with 99%+ success rates.
            </p>
            <span
              className="card-link"
              onClick={() =>
                alert(
                  'Article: Advanced Surgical Techniques - Full text available'
                )
              }
            >
              Read Article →
            </span>
          </div>
        </div>

        <div className="card">
          <div className="card-header card-header-rounded card-header-red">
            📊
          </div>
          <div className="card-content">
            <h3>Severe LLD Correction</h3>
            <p>
              <strong>Case Study</strong> • Published December 2023
            </p>
            <p>
              Comprehensive case study: Correction of 8cm limb length
              discrepancy in adult patient.
            </p>
            <span
              className="card-link"
              onClick={() =>
                alert(
                  'Case Study: Severe LLD Correction - Before/after images and outcomes'
                )
              }
            >
              View Case Study →
            </span>
          </div>
        </div>

        <div className="card">
          <div className="card-header card-header-rounded card-header-orange">
            🎥
          </div>
          <div className="card-content">
            <h3>Surgical Innovation Lecture</h3>
            <p>
              <strong>Video Lecture</strong> • 45 minutes • November
              2023
            </p>
            <p>
              Comprehensive lecture on recent innovations in
              orthopedic surgical techniques.
            </p>
            <span
              className="card-link"
              onClick={() =>
                alert(
                  'Video: Surgical Innovation - Play video lecture'
                )
              }
            >
              Watch Lecture →
            </span>
          </div>
        </div>

        <div className="card">
          <div className="card-header card-header-rounded card-header-green">
            📚
          </div>
          <div className="card-content">
            <h3>Research on Complication Prevention</h3>
            <p>
              <strong>Research Paper</strong> • October 2023
            </p>
            <p>
              Peer-reviewed analysis of 500+ cases identifying best
              practices for minimal complications.
            </p>
            <span
              className="card-link"
              onClick={() =>
                alert(
                  'Paper: Complication Prevention - Access full research paper'
                )
              }
            >
              Read Paper →
            </span>
          </div>
        </div>

        <div className="card">
          <div className="card-header card-header-rounded card-header-purple">
            📄
          </div>
          <div className="card-content">
            <h3>Pediatric Orthopedic Approaches</h3>
            <p>
              <strong>Article</strong> • September 2023
            </p>
            <p>
              Specialized surgical approaches for children's bone and
              joint conditions.
            </p>
            <span
              className="card-link"
              onClick={() =>
                alert(
                  'Article: Pediatric Approaches - Full text available'
                )
              }
            >
              Read Article →
            </span>
          </div>
        </div>

        <div className="card">
          <div className="card-header card-header-rounded card-header-teal">
            📊
          </div>
          <div className="card-content">
            <h3>International Patient Success Story</h3>
            <p>
              <strong>Case Study</strong> • August 2023
            </p>
            <p>
              Successful 7cm limb lengthening procedure for
              international patient from Canada.
            </p>
            <span
              className="card-link"
              onClick={() =>
                alert(
                  'Case Study: International Success - Patient outcomes and journey'
                )
              }
            >
              View Case Study →
            </span>
          </div>
        </div>
      </div>

      <div className="service-detail">
        <h3>📧 Subscribe to Updates</h3>
        <p>
          Receive new articles, case studies, and research findings
          delivered to your inbox.
        </p>
        <div className="subscribe-form">
          <input
            type="email"
            placeholder="your@email.com"
            className="subscribe-input"
          />
          <button
            className="btn btn-primary"
            onClick={() =>
              alert(
                'Subscribed! You will receive updates home new articles and resources.'
              )
            }
          >
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudyPage;
