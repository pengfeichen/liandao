import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Line } from 'react-chartjs-2';
import moment from 'moment';

// Import actions
import { getTrades } from '../../actions/tradesData';

// Import Components
import PreLoader from '../common/PreLoader';

class TradesLinesChart extends Component {
  componentDidMount() {
    this.props.getTrades(this.props.limit);
  }

  render() {
    const { data } = this.props;
    let time = [];
    let price = [];
    let amount = [];

    if (data) {
      console.log(data.length);
      data.forEach(trade => {
        time = time.concat(moment.unix(trade[1]).format('k:mm:ss'));
        price = price.concat(trade[2]);
        amount = amount.concat(trade[3]);
      });
    }

    const chartData = {
      labels: time,
      datasets: [
        {
          label: `USD/BTC`,
          data: price,
          backgroundColor: ['rgba(56, 142, 60, 0.2)'],
          borderColor: ['rgba(56,142,60,1)'],
          borderWidth: 1
        }
      ]
    };

    return (
      <div>
        {data ? (
          <div>
            <h5>{`GDAX USD/BTC Prices`}</h5>
            <Line data={chartData} />
          </div>
        ) : (

            <div className="center-align">
              <PreLoader />
            </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.tradesData.data
});

export default connect(mapStateToProps, { getTrades })(TradesLinesChart);
