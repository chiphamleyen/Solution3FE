import React, { useState } from 'react';
import './Shared.css';

const FileUpload = ({ onFileUpload }) => {
  const [files, setFiles] = useState({
    dll_file: null,
    pe_header_file: null,
    pe_section_file: null,
    api_function_file: null
  });

  const handleFileChange = (e, fileType) => {
    const file = e.target.files[0];
    if (file) {
      setFiles(prev => ({
        ...prev,
        [fileType]: file
      }));
      onFileUpload(fileType, file);
    }
  };

  const renderFileInput = (fileType, label) => (
    <div className="mb-3">
      <label className="form-label fw-semibold">{label}</label>
      <div 
        className="border border-2 border-dashed rounded-3 p-3 text-center"
        style={{ cursor: 'pointer' }}
        onClick={() => document.getElementById(fileType).click()}
      >
        <div className="mb-2 text-primary">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="17 8 12 3 7 8"></polyline>
            <line x1="12" y1="3" x2="12" y2="15"></line>
          </svg>
        </div>
        <p className="text-muted mb-2 small">
          {files[fileType] ? files[fileType].name : 'Click to upload file'}
        </p>
        <input 
          type="file" 
          id={fileType}
          className="d-none" 
          onChange={(e) => handleFileChange(e, fileType)}
        />
      </div>
    </div>
  );

  return (
    <div>
      {renderFileInput('dll_file', 'DLL File')}
      {renderFileInput('pe_header_file', 'PE Header File')}
      {renderFileInput('pe_section_file', 'PE Section File')}
      {renderFileInput('api_function_file', 'API Function File')}
    </div>
  );
};

export default FileUpload;
