import React from 'react';
import TradesLinesChart from './charts/TradesLineChart';

const Markets = () => {
  return (
    <div className="markets">
      <div className="container">
        <div className="row">
          <div className="col s12">
          <TradesLinesChart /> 
          </div>
        </div>
      </div>
    </div>
  )
}

export default Markets;
