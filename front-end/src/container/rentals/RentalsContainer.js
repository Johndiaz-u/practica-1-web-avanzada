import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fetchRentalsByClient, addRental, updateEquipmentRental } from '../../actions/action';
import Rentals from '../../components/rentals/Rentals';
import { fetchEquipments } from '../../actions/action';
import { meUser } from '../../actions/action';

class RentalsContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loadedRentals: false
    }
  }
  componentDidMount() {
    this.props.getUserLogged();
    this.props.fetchEquipments();
  }

  componentWillReceiveProps(props) {
    if (props.userLogin && this.state.loadedRentals === false) {
      this.props.getRentalsByClient(props.userLogin.id);
      this.setState({ loadedRentals: true })
    }
  }

  render() {
    return (
      <div>
        <Rentals
          rentals={this.props.rentals}
          language={this.props.language}
          equipments={this.props.equipments}
          addRental={this.props.addRental}
          userLogged={this.props.userLogin}
          updateEquipmentRental={this.props.updateEquipmentRental} />
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getRentalsByClient: (e) => dispatch(fetchRentalsByClient(e)),
    addRental: (e) => dispatch(addRental(e)),
    updateEquipmentRental: (e) => dispatch(updateEquipmentRental(e)),
    fetchEquipments: () => dispatch(fetchEquipments()),
    getUserLogged: () => dispatch(meUser()),
  }
}

const mapStateToProps = (state) => {
  return {
    rentals: state.rentals.getAllRentals,
    equipments: state.equipments.getAllEquipments,
    userLogin: state.users.userLogin
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RentalsContainer);
