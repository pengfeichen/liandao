import React, { Component } from 'react';
import { connect } from 'react-redux';

class Landing extends Component {
  componentDidMount(){
    this.props.isAuthenticated && this.props.history.push('/dashboard')
  }
  render() {
    return (
      <div className="landing">
        <div className="container">
          <div className="row">
            <div className="col s12">
              <blockquote><h4>TODO: Landing page design</h4></blockquote>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = state =>({
  isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStateToProps)(Landing);

