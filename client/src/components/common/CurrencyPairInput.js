import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Import actions
import { getTrades } from '../../actions/trades';

class CurrencyPairInput extends Component {
  state = {
    currencypair: ''
  };

  handleGetTrades = e => {
    e.preventDefault();
    this.props.getTrades(this.state.currencypair);
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <form onSubmit={this.handleGetTrades}>
        <div className="input-field col s12 m4">
          <input
            id="productID"
            name="currencypair"
            type="text"
            value={this.state.keyword}
            onChange={this.onChange}
            autoComplete="off"
          />
        <label htmlFor="productID">Currency Pair</label>
        </div>
      </form>
    );
  }
}

CurrencyPairInput.propTypes = {

};

export default connect(null, { getTrades })(CurrencyPairInput);
