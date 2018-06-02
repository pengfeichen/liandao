import React from 'react';

// Import Components
import TradesLineChart from './charts/TradesLineChart';

const Dashboard = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col s12">
      <div class="card-panel white">
      <TradesLineChart limit="100"/>
        </div>
        
        </div>
      </div>
      
    </div>
  )
}

export default Dashboard;