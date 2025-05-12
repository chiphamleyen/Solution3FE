import React from 'react';
import './Shared.css'; 

const FileUpload = ({ onFileUpload }) => {
  return (
    <div 
      className="border border-2 border-dashed rounded-3 p-5 text-center mb-3"
      style={{ cursor: 'pointer' }}
      onClick={() => document.getElementById('file-upload').click()}
    >
      <div className="mb-3 text-primary">
        {/* SVG Icon */}
        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="17 8 12 3 7 8"></polyline>
          <line x1="12" y1="3" x2="12" y2="15"></line>
        </svg>
      </div>
      <p className="text-muted mb-4">
        Drag & drop files here or <span className="text-purple fw-semibold">browse files</span>
      </p>
      <input 
        type="file" 
        id="file-upload" 
        className="d-none" 
        onChange={onFileUpload} 
      />
      <button className="btn custom-purple">Upload File</button>
    </div>
  );
};

export default FileUpload;
