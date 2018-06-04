import React from 'react';
import { connect } from 'react-redux';

// Import Components
// import TradesLineChart from './charts/TradesLineChart';

const Dashboard = ({ name }) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col s12">
        <div className="">
        <blockquote><h4>TODO: Dashboard</h4></blockquote>
        <blockquote><h2>Welcome {name}!</h2></blockquote>
        </div>
        </div>
      </div>
      
    </div>
  )
}
const mapStateToProps = state => ({
  name: state.auth.user.name
})
export default connect(mapStateToProps)(Dashboard);