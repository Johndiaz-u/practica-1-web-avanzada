import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import Clients from '../../components/client/Clients'
import { fetchClients } from '../../actions/action';

class ClientContainer extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getClients();
  }


  render() {
    return (
      <Clients clients={this.props.clients} language={this.props.language} />
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getClients: () => dispatch(fetchClients())
  }
}

const mapStateToProps = (state) => {
  // console.log(state, 'state')
  return {
    clients: state.clients.getAllClients,
    // isLoading: state.users.isLoading,
    // errors: state.users.errors,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientContainer);
