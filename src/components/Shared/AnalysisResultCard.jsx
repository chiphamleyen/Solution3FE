import React, { useState, useMemo, useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const AnalysisResultCard = ({ results, hideExportPdfButton }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('all');
  const [classificationFilter, setClassificationFilter] = useState('all');
  const itemsPerPage = 10;

  // Get unique classifications
  const uniqueClassifications = useMemo(() => {
    if (!results?.items) return [];
    return [...new Set(results.items.map(item => item.classifier))];
  }, [results?.items]);

  // Calculate statistics
  const totalFiles = results?.items?.length || 0;
  const benignCount = results?.items?.filter(item => !item.detection).length || 0;
  const malwareCount = results?.items?.filter(item => item.detection).length || 0;
  const malwarePercentage = totalFiles > 0 ? (malwareCount / totalFiles) * 100 : 0;

  // Filter items
  const filteredItems = useMemo(() => {
    if (!results?.items) return [];
    return results.items.filter(item => {
      const statusMatch = statusFilter === 'all' || 
        (statusFilter === 'benign' && !item.detection) || 
        (statusFilter === 'malicious' && item.detection);
      
      const classificationMatch = classificationFilter === 'all' || 
        item.classifier === classificationFilter;

      return statusMatch && classificationMatch;
    });
  }, [results?.items, statusFilter, classificationFilter]);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter, classificationFilter]);

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
    doc.text(`Total Files: ${totalFiles}`, 14, 28);
    doc.text(`Benign Files: ${benignCount}`, 14, 34);
    doc.text(`Malware Files: ${malwareCount}`, 14, 40);
    doc.text(`Threat Score: ${malwarePercentage.toFixed(1)}%`, 14, 46);

    // Table data
    const tableColumn = ['SHA-256 Hash', 'Status', 'Classification'];
    const tableRows = results.items.map(item => [
      item.sha_256_hash,
      item.detection ? 'Malicious' : 'Benign',
      item.classifier
    ]);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 52,
      styles: { fontSize: 8 },
      headStyles: { fillColor: [108, 99, 255] },
      margin: { left: 14, right: 14 }
    });

    doc.save('malware_analysis_results.pdf');
  };

  // Tính màu cho threat score
  const getThreatColor = (percent) => {
    if (percent <= 30) return 'bg-success'; // Green
    if (percent <= 60) return 'bg-warning'; // Yellow
    return 'bg-danger'; // Red
  };

  if (!results || !results.items || results.items.length === 0) {
    return (
      <div className="card">
        <div className="card-body text-center text-muted">
          No analysis results available
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-body">
        {/* Title and Export PDF Button */}
        {!hideExportPdfButton && (
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="h4 fw-bold mb-0">Analysis Results</h2>
            <button className="btn btn-outline-danger" onClick={handleExportPDF}>
              Export PDF
            </button>
          </div>
        )}
        {/* Summary Statistics */}
        <div className="row mb-4">
          <div className="col-md-4">
            <div className="card bg-light">
              <div className="card-body text-center">
                <h5 className="card-title">Total Files</h5>
                <h2 className="mb-0">{totalFiles}</h2>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card bg-success bg-opacity-10">
              <div className="card-body text-center">
                <h5 className="card-title">Benign Files</h5>
                <h2 className="mb-0 text-success">{benignCount}</h2>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card bg-danger bg-opacity-10">
              <div className="card-body text-center">
                <h5 className="card-title">Malware Files</h5>
                <h2 className="mb-0 text-danger">{malwareCount}</h2>
              </div>
            </div>
          </div>
        </div>

        {/* Threat Score */}
        <div className="mb-4">
          <h5 className="mb-3">Threat Score</h5>
          <div className="progress" style={{ height: '25px' }}>
            <div 
              className={`progress-bar ${getThreatColor(malwarePercentage)}`} 
              role="progressbar" 
              style={{ width: `${malwarePercentage}%` }}
              aria-valuenow={malwarePercentage} 
              aria-valuemin="0" 
              aria-valuemax="100"
            >
              {malwarePercentage.toFixed(1)}%
            </div>
          </div>
          <div className="d-flex justify-content-between mt-1">
            <small className="text-muted">Low Risk</small>
            <small className="text-muted">High Risk</small>
          </div>
        </div>

        {/* Results Table */}
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>SHA-256 Hash</th>
                <th>
                  Status
                  <div className="mt-1">
                    <select 
                      className="form-select form-select-sm"
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                    >
                      <option value="all">All</option>
                      <option value="benign">Benign</option>
                      <option value="malicious">Malicious</option>
                    </select>
                  </div>
                </th>
                <th>
                  Classification
                  <div className="mt-1">
                    <select 
                      className="form-select form-select-sm"
                      value={classificationFilter}
                      onChange={(e) => setClassificationFilter(e.target.value)}
                    >
                      <option value="all">All</option>
                      {uniqueClassifications.map((classification, index) => (
                        <option key={index} value={classification}>
                          {classification}
                        </option>
                      ))}
                    </select>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => (
                <tr key={index}>
                  <td className="text-monospace small">{item.sha_256_hash}</td>
                  <td>
                    <span className={`badge ${item.detection ? 'bg-danger' : 'bg-success'}`}>
                      {item.detection ? 'Malicious' : 'Benign'}
                    </span>
                  </td>
                  <td>{item.classifier}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <nav aria-label="Page navigation" className="mt-4">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button 
                className="page-link" 
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
            </li>
            {[...Array(totalPages)].map((_, index) => (
              <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                <button 
                  className="page-link" 
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button 
                className="page-link" 
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>

        <div className="mt-3 text-muted small text-center">
          Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredItems.length)} of {filteredItems.length} results
        </div>
      </div>
    </div>
  );
};

export default AnalysisResultCard;
