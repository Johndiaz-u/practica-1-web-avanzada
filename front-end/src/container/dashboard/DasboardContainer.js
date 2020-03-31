import React, { Component } from 'react'
import { connect } from 'react-redux';
import DashboardComponent from '../../components/dashboard/DashboardComponent';

class DasboardContainer extends Component {

  componentDidMount() {
  }


  render() {
    return (
      <DashboardComponent />
    )
  }
}

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}



export default connect(mapStateToProps, mapDispatchToProps)(DasboardContainer);