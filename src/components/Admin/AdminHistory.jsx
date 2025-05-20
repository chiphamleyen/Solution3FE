import React from 'react';
import Header from '../Shared/Header';
import HistoryTable from '../Shared/HistoryTable';

const AdminHistory = () => {
  return (
    <div className="container-fluid" style={{ maxWidth: '90%', padding: '20px' }}>
      <Header isAdmin={true} />
      
      <div className="row mt-4">
        <div className="col-12">
          <section className="card shadow-sm p-4">
            <h2 className="h4 fw-bold mb-3">System Analysis History</h2>
            <HistoryTable isAdmin={true} />
          </section>
        </div>
      </div>
    </div>
  );
};

export default AdminHistory; 