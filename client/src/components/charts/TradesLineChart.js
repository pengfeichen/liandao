import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Import actions
import { getTrades } from '../../actions/tradesData';

// Import Components
import PreLoader from '../common/PreLoader';

class TradesLinesChart extends Component {
  componentDidMount() {
    this.props.getTrades();
  }

  render() {
    const { data } = this.props;
    let chartData = []

    if (Object.keys(data).length > 0) {
      chartData = data.data.result.map(trade => ({
        time : moment.unix(trade[1]).format('k:mm:ss'),
        price : trade[2],
        amount : trade[3]
      }));
    }

    return (
      <div>
        {Object.keys(data).length > 0 ? (
          <div>
            <div className="card">
              <div className="card-content">
              <span className="card-title">{`GDAX USD/BTC Prices`}</span>
              <ResponsiveContainer width="100%" height={500}>
                <AreaChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis domain={['dataMin', 'dataMax']}/>
                  <Tooltip isAnimationActive={false}/>
                  <Legend />
                  <Area type="monotone" dataKey="price" stroke="#8884d8" fillOpacity={0.3} fill='#8884d8' />
                  </AreaChart>
              </ResponsiveContainer>
              </div>
            </div>
          </div>
        ) : (
          <div className="card">
            <div className="card-content center-align">
              <PreLoader/>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.tradesData
});

export default connect(mapStateToProps, { getTrades })(TradesLinesChart);
