import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Import actions
import { getTrades } from '../../actions/tradesData';
import { getTrends } from '../../actions/trends';

// Import Components
import PreLoader from '../common/PreLoader';

class TradesLinesChart extends Component {
  state = {
    keyword : ''
  }
  componentDidMount() {
    this.props.getTrends({keyword: 'Apple'})

  }

  handleGetTrends = (e) => {
    e.preventDefault();
    const options = {
      keyword: this.state.keyword
    }
    this.props.getTrends(options)
  }

  handleChange = e => {
    this.setState({[e.target.name]:e.target.value})
  }

  render() {
    const { trends } = this.props;
    let chartData = []
    if (Object.keys(trends.data).length > 0) {
      chartData = trends.data.default.timelineData.map(point => ({
        time : moment.unix(point.time).format('DD/MM/YY'),
        value : point.value[0]
      }));
    }
    return (
      <div>
        {Object.keys(trends.data).length > 0 ? (
          <div>
            <div className="card">
              <div className="card-content">
              <span className="card-title">{trends.options.keyword}</span>
              <ResponsiveContainer width="100%" height={500}>
                <AreaChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis domain={['dataMin', 'dataMax']}/>
                  <Tooltip isAnimationActive={false}/>
                  <Legend />
                  <Area type="monotone" dataKey="value" stroke="#8884d8" fillOpacity={0.3} fill='#8884d8' />
                  </AreaChart>
              </ResponsiveContainer>
              </div>
            </div>

              <form onSubmit={this.handleGetTrends}>
              <div className="input-field col s12 m4">
                <input id="keyword" name="keyword" type="text" className="validate" value={this.state.keyword} onChange={this.handleChange}/>
                <label htmlFor="keyword">Keyword</label>
              </div>
              </form>
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
  trends: state.trends
});

export default connect(mapStateToProps, { getTrends })(TradesLinesChart);
