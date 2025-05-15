import React from 'react';
import Header from '../Shared/Header';
import FileUpload from '../Shared/FileUpload';
import AnalysisResultCard from '../Shared/AnalysisResultCard';
// import './UserDashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function MalwareAnalysisDashboard() {
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log('File selected:', file.name);
      // Add file processing logic here
    }
  };

  return (
    <div className="container-fluid" style={{ maxWidth: '1200px', padding: '20px' }}>
      <Header />

      <div className="row mt-4">
        <div className="col-md-4">
          <section className="card shadow-sm p-4 mb-4">
            <h2 className="h4 fw-bold mb-3">Malware Analysis</h2>
            <p className="text-muted mb-4">Upload a suspicious file for analysis</p>
            <FileUpload onFileUpload={handleFileUpload} />
          </section>
        </div>

        <div className="col-md-8">
          <section className="card shadow-sm p-4">
            <h2 className="h4 fw-bold mb-3">Analysis Results</h2>
            <AnalysisResultCard
              fileName="Sample.exe"
              date="April 3, 2025"
              threatLevel="High"
              classification="Trojan.Downloader"
              description="This malware acts as a dropper for additional payloads. It establishes persistence through registry modifications and attempts to disable security software."
              steps={[
                "Immediately isolate the infected system from your network",
                "Scan all systems with updated antivirus software",
                "Check for unauthorized registry modifications",
                "Monitor network traffic for unusual outbound connections",
                "Reset passwords for all accounts accessed from infected machine"
              ]}
            />
          </section>
        </div>
      </div>
    </div>
  );
}

export default MalwareAnalysisDashboard;
