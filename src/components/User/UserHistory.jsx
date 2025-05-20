import React from 'react';
import Header from '../Shared/Header';
import HistoryTable from '../Shared/HistoryTable';

const UserHistory = () => {
  return (
    <div className="container-fluid" style={{ maxWidth: '90%', padding: '20px' }}>
      <Header isAdmin={false} />
      
      <div className="row mt-4">
        <div className="col-12">
          <section className="card shadow-sm p-4">
            <h2 className="h4 fw-bold mb-3">Analysis History</h2>
            <HistoryTable isAdmin={false} />
          </section>
        </div>
      </div>
    </div>
  );
};

export default UserHistory; 