import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Input extends Component {
  state = {
    keyword: ''
  };

  handleGetTrades = e => {
    console.log('handleing get trades')
    e.preventDefault();
    console.log(e.target.value)
    // this.props.getTrades(this.state.productID);
    // console.log(this.props.trades_loading)
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
            name="keyword"
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

Input.propTypes = {

};

export default Input;
