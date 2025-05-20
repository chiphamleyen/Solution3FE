import React, { useState } from 'react';
import Header from '../Shared/Header';
import FileUpload from '../Shared/FileUpload';
import AnalysisResultCard from '../Shared/AnalysisResultCard';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
// import './UserDashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { API_PATHS } from '../../api/config';
import axiosUser from '../../api/axiosUser';

function MalwareAnalysisDashboard() {
  const [files, setFiles] = useState({
    dll_file: null,
    pe_header_file: null,
    pe_section_file: null,
    api_function_file: null
  });
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileUpload = (fileType, file) => {
    setFiles(prev => ({
      ...prev,
      [fileType]: file
    }));
  };

  const handleSubmit = async () => {
    // Check if all files are uploaded
    const missingFiles = Object.entries(files)
      .filter(([_, file]) => !file)
      .map(([type]) => type);

    if (missingFiles.length > 0) {
      setError(`Please upload all required files: ${missingFiles.join(', ')}`);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      Object.entries(files).forEach(([key, file]) => {
        formData.append(key, file);
      });

      const response = await axiosUser.post(API_PATHS.FILE_UPLOAD, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.error_code === 0) {
        setResults(response.data);
      } else {
        setError(response.data.message || 'Analysis failed');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to analyze files');
    } finally {
      setLoading(false);
    }
  };

  // Export PDF handler
  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Malware Analysis Results', 14, 18);
    doc.setFontSize(10);
    if (!results || !results.items || results.items.length === 0) {
      doc.text('No analysis results available', 14, 30);
      doc.save('malware_analysis_results.pdf');
      return;
    }
    const totalFiles = results.items.length;
    const benignCount = results.items.filter(item => !item.detection).length;
    const malwareCount = results.items.filter(item => item.detection).length;
    const malwarePercentage = totalFiles > 0 ? (malwareCount / totalFiles) * 100 : 0;
    doc.text(`Total Files: ${totalFiles}`, 14, 28);
    doc.text(`Benign Files: ${benignCount}`, 14, 34);
    doc.text(`Malware Files: ${malwareCount}`, 14, 40);
    doc.text(`Threat Score: ${malwarePercentage.toFixed(1)}%`, 14, 46);
    const tableColumn = ['SHA-256 Hash', 'Status', 'Classification'];
    const tableRows = results.items.map(item => [
      item.sha_256_hash,
      item.detection ? 'Malicious' : 'Benign',
      item.classifier
    ]);
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 52,
      styles: { fontSize: 8 },
      headStyles: { fillColor: [108, 99, 255] },
      margin: { left: 14, right: 14 }
    });
    doc.save('malware_analysis_results.pdf');
  };

  return (
    <div className="container-fluid" style={{ maxWidth: '90%', padding: '20px' }}>
      <Header isAdmin={false} />

      <div className="row mt-4">
        <div className="col-md-3">
          <section className="card shadow-sm p-4 mb-4">
            <h2 className="h4 fw-bold mb-3">Malware Analysis</h2>
            <p className="text-muted mb-4">Upload all required files for analysis</p>
            <FileUpload onFileUpload={handleFileUpload} />
            
            {error && (
              <div className="alert alert-danger mt-3" role="alert">
                {error}
              </div>
            )}

            <button 
              className="btn btn-primary w-100 mt-3"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Analyzing...
                </>
              ) : (
                'Analyze Files'
              )}
            </button>
          </section>
        </div>

        <div className="col-md-9">
          <section className="card shadow-sm p-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h2 className="h4 fw-bold mb-0">Analysis Results</h2>
              <button className="btn btn-outline-danger" onClick={handleExportPDF}>
                Export PDF
              </button>
            </div>
            <AnalysisResultCard results={results} hideExportPdfButton />
          </section>
        </div>
      </div>
    </div>
  );
}

export default MalwareAnalysisDashboard;
