import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

// Import actions
import { getTrades } from '../../actions/trades';
import { getTrends } from '../../actions/trends';

// Import Components
import PreLoader from '../common/PreLoader';
import CurrencyPairInput from '../common/CurrencyPairInput';
import TrendsInput from '../common/TrendsInput';

class TradesLinesChart extends Component {
  state = {
    keyword: '',
    productID: '',
    startTime: undefined,
    endTime: undefined,
    trades_loading: this.props.trades_loading,
    trends_loading: this.props.trends.loading
  };

  componentDidMount() {
    console.log('mount');
    this.props.getTrades('BTC-USD');
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('update');
    console.log('check if trades data has changed')
    if (prevProps.trades !== this.props.trades) {
      console.log('set time state')
      this.setState({
        startTime: this.props.trades[0][0],
        endTime: this.props.trades[this.props.trades.length - 1][0]
      });
    }
    console.log('check if timestamp has changed')
    if (
      prevState.startTime !== this.state.startTime && this.state.keyword.length > 0)
      {
      console.log('Re-getting trends data ')
      const options = {
        keyword: this.state.keyword,
        startTime: this.state.startTime,
        endTime: this.state.endTime
      };
      this.props.getTrends(options);
      
    }
  }


  render() {
    console.log('rendering');
    const { trends, trades, related } = this.props;
    const { trades_loading, startTime, endTime } = this.state;
    console.log('trading loading',trades_loading)
    // Making trades area graph data object
    let tradeData = [];
    if (trades.length > 0 && !trades_loading) {
      console.log('trades data in store')
      console.log('remaking trades data array from store')
      tradeData = trades.map(trade => ({
        time: moment.unix(trade[0]).format('hh:mm:ss'),
        price: trade[4],
        volume: trade[5]
      }));

      // Making trends area graph data object
      if (Object.keys(trends.data).length > 0) {
          console.log('trends data in store')
          console.log('checking if time matches')
          if (tradeData[0].time === moment.unix(trends.data.default.timelineData[0].time).format('hh:mm:ss')) {
            console.log('time matches, begin forming final data array for graphing')
            let max = 0;
            let min = tradeData[0].price;
            tradeData = tradeData.map(trade => {
              const trendData = trends.data.default.timelineData.find(trend => {
                return trade.time === moment.unix(trend.time).format('hh:mm:ss');
              });
              max = trade.price > max ? trade.price : max;
              min = trade.price < min ? trade.price : min;
              return {
                time: trade.time,
                price: trade.price,
                volume: trade.volume,
                trend: trendData ? trendData.value[0] / 100 : 0
              };
            });
            const diff = max - min;
            tradeData = tradeData.map(trade => ({
              ...trade,
              trend: trade.trend * diff + min
            }));
          }
        }
      }
      let relatedQueires, risingQueries ;
      if (Object.keys(related).length > 0) {
        relatedQueires = related.data.default.rankedList[0].rankedKeyword.map((keyword, index)=>
          <li key={index}>{keyword.query} {keyword.formattedValue}</li>
        )
        risingQueries = related.data.default.rankedList[1].rankedKeyword.map((keyword, index)=>
          <li key={index}>{keyword.query} {keyword.formattedValue}</li>
        )
      }
    return (
      <div className="TradesLineChart">
        {trades.length > 0 ? (
          <div>
            <div className="card">
              <div className="card-content">
                <span className="card-title">
                  <blockquote>TODO: Dynamic label</blockquote>
                </span>
                <ResponsiveContainer width="100%" height={500}>
                  <AreaChart data={tradeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" tickLine={false} interval={59} />
                    <YAxis domain={['dataMin', 'dataMax']} tickLine={false} />
                    <Tooltip isAnimationActive={false} />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="price"
                      stroke="#82ca9d"
                      fillOpacity={0.2}
                      fill="#82ca9d"
                    />
                    <Area
                      type="monotone"
                      dataKey="trend"
                      stroke="#8884d8"
                      fillOpacity={0.2}
                      fill="#8884d8"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="col s12">
            <CurrencyPairInput />
            <TrendsInput startTime={startTime} endTime={endTime} />
            </div>
            <div className="col s12 m6">
            <div className="card">
              <div className="card-content">
                <div className="card-title">Top Queries</div>
                <ol>
                  {relatedQueires}
                </ol>
              </div>
            </div></div>
            <div className="col s12 m6">
            <div className="card">
              <div className="card-content">
                <div className="card-title">Rising Queries</div>
                <ol>
                  {risingQueries}
                </ol>
              </div>
            </div></div>
          </div>
        ) : (
          <div className="card">
            <div className="card-content center-align">
              <PreLoader />
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  trends: state.trends,
  trades: state.trades.data,
  trades_loading: state.trades.loading,
  related: state.trends.related
});

export default connect(
  mapStateToProps,
  { getTrades, getTrends }
)(TradesLinesChart);
