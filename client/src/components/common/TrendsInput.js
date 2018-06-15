import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Import actions
import { getTrends } from '../../actions/trends';

class TrendsInput extends Component {
  state = {
    keyword: ''
  };

  handleGetTrends = e => {
    console.log('handleing get trends')
    e.preventDefault();
    const options = {
      keyword: this.state.keyword,
      startTime: this.props.startTime,
      endTime: this.props.endTime
    };
    this.props.getTrends(options);
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <form onSubmit={this.handleGetTrends}>
        <div className="input-field col s12 m4">
          <input
            id="keyword"
            name="keyword"
            type="text"
            value={this.state.keyword}
            onChange={this.onChange}
            autoComplete="off"
          />
        <label htmlFor="keyword">Google Trends</label>
        </div>
      </form>
    );
  }
}

TrendsInput.propTypes = {

};



export default connect(null, { getTrends })(TrendsInput);
