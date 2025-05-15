import React from 'react';

const AnalysisResultCard = ({ fileName, date, threatLevel, classification, description, steps }) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-3">
          <h3 className="h5 fw-semibold mb-0">{fileName}</h3>
          <span className="text-muted small">Analyzed on: {date}</span>
        </div>

        <div className="mb-4">
          <h4 className="h6 fw-semibold">Threat Level: {threatLevel}</h4>
          <div className="progress mt-2 mb-1" style={{ height: '10px' }}>
            <div className={`progress-bar bg-danger`} style={{ width: '80%' }}></div>
          </div>
          <div className="d-flex justify-content-between text-muted small mb-2">
            <span>0</span><span>5</span><span>10</span>
          </div>
          <div className="text-end fw-bold">8/10</div>
        </div>

        <div className="mb-4">
          <h4 className="h6 fw-semibold">Malware Classification</h4>
          <p className="fw-semibold text-dark mb-2">{classification}</p>
          <p className="text-muted">{description}</p>
        </div>

        <div>
          <h4 className="h6 fw-semibold">Prevention Steps</h4>
          <ul className="text-muted">
            {steps.map((step, i) => <li key={i}>{step}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResultCard;
