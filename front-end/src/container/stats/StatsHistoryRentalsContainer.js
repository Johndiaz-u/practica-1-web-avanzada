import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fetchClients, fetchRentalsByClient } from '../../actions/action';
import StatsHistoryRentalsComponent from '../../components/stats/StatsHistoryRentalsComponent';

class StatsHistoryRentalsContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      clientId: ''
    }
  }

  componentDidMount() {
    this.props.getClients();
  }


  onChangeClientId = (e) => {
    this.setState({
      clientId: e
    })
  }

  onSubmitRentals = () => {
    // console.log(this.state.clientId)
    this.props.getRentalsByClient(this.state.clientId);
  }

  render() {

    const { clients, rentals, language } = this.props;
    return (
      <div>
        <StatsHistoryRentalsComponent clients={clients} onChange={this.onChangeClientId} rentals={rentals} onSubmitRentals={this.onSubmitRentals} language={this.props.language} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    clients: state.clients.getAllClients,
    rentals: state.rentals.getAllRentals,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getRentalsByClient: (e) => dispatch(fetchRentalsByClient(e)),
    getClients: () => dispatch(fetchClients()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StatsHistoryRentalsContainer)
