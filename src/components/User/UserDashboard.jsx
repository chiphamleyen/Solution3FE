import React, { useState } from 'react';
import Navbar from '../Shared/Navbar';
import Sidebar from '../Shared/Sidebar';
import './UserDashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function MalwareAnalysisDashboard() {
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log('File selected:', file.name);
      // Add your file processing logic here
    }
  };

  return (
    <div className="container-fluid" style={{ maxWidth: '1200px', padding: '20px' }}>
      {/* Header */}
      <header className="d-flex flex-wrap justify-content-between align-items-center py-3 border-bottom">
        <div className="logo">
          <h1 className="text-primary fw-bold m-0">MalwareShield</h1>
        </div>
        
        <nav>
          <ul className="nav">
            <li className="nav-item">
              <a href="#" className="nav-link active fw-semibold">Dashboard</a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">History</a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">Reports</a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">Settings</a>
            </li>
          </ul>
        </nav>
        
        <div className="user-profile d-flex align-items-center">
          <img 
            src="https://via.placeholder.com/40" 
            alt="User" 
            className="rounded-circle me-2" 
            width="40" 
            height="40" 
          />
          <span className="text-muted">Welcome, User</span>
        </div>
      </header>

      {/* Main Content */}
      <div className="row mt-4">
        {/* Upload Section */}
        <div className="col-md-4">
          <section className="card shadow-sm p-4 mb-4">
            <h2 className="h4 fw-bold mb-3">Malware Analysis</h2>
            <p className="text-muted mb-4">Upload a suspicious file for analysis</p>
            
            <div 
              className="border border-2 border-dashed rounded-3 p-5 text-center mb-3"
              style={{ cursor: 'pointer' }}
              onClick={() => document.getElementById('file-upload').click()}
            >
              <div className="mb-3 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17 8 12 3 7 8"></polyline>
                  <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>
              </div>
              <p className="text-muted mb-4">
                Drag & drop files here or <span className="text-primary fw-semibold">browse files</span>
              </p>
              <input 
                type="file" 
                id="file-upload" 
                className="d-none" 
                onChange={handleFileUpload} 
              />
              <button className="btn btn-primary">
                Upload File
              </button>
            </div>
          </section>
        </div>

        {/* Results Section */}
        <div className="col-md-8">
          <section className="card shadow-sm p-4">
            <h2 className="h4 fw-bold mb-3">Analysis Results</h2>
            
            <div className="card mb-3">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-3">
                  <h3 className="h5 fw-semibold mb-0">Sample.exe</h3>
                  <span className="text-muted small">Analyzed on: April 3, 2025</span>
                </div>

                <div className="mb-4">
                  <h4 className="h6 fw-semibold">Threat Level: High</h4>
                  <div className="progress mt-2 mb-1" style={{height: '10px'}}>
                    <div 
                      className="progress-bar bg-danger" 
                      role="progressbar" 
                      style={{width: '80%'}}
                      aria-valuenow="80" 
                      aria-valuemin="0" 
                      aria-valuemax="100"
                    ></div>
                  </div>
                  <div className="d-flex justify-content-between text-muted small mb-2">
                    <span>0</span>
                    <span>5</span>
                    <span>10</span>
                  </div>
                  <div className="text-end fw-bold">8/10</div>
                </div>

                <div className="mb-4">
                  <h4 className="h6 fw-semibold">Malware Classification</h4>
                  <p className="fw-semibold text-dark mb-2">Trojan.Downloader</p>
                  <p className="text-muted">
                    This malware acts as a dropper for additional payloads. It establishes persistence 
                    through registry modifications and attempts to disable security software.
                  </p>
                </div>

                <div>
                  <h4 className="h6 fw-semibold">Prevention Steps</h4>
                  <ul className="text-muted">
                    <li>Immediately isolate the infected system from your network</li>
                    <li>Scan all systems with updated antivirus software</li>
                    <li>Check for unauthorized registry modifications</li>
                    <li>Monitor network traffic for unusual outbound connections</li>
                    <li>Reset passwords for all accounts accessed from infected machine</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Custom CSS */}
      <style>{`
        .border-dashed {
          border-style: dashed !important;
          transition: all 0.3s;
        }
        .border-dashed:hover {
          border-color: #0d6efd !important;
        }
        .nav-link.active {
          position: relative;
        }
        .nav-link.active::after {
          content: '';
          position: absolute;
          bottom: -3px;
          left: 0;
          width: 100%;
          height: 3px;
          background-color: #0d6efd;
          border-radius: 10px 10px 0 0;
        }
        @media (max-width: 768px) {
          header {
            flex-direction: column;
            align-items: flex-start !important;
          }
          nav {
            margin: 15px 0 !important;
          }
          .user-profile {
            margin-top: 15px;
          }
        }
      `}</style>
    </div>
  );
}

export default MalwareAnalysisDashboard;