import React, { Component } from 'react'
import { connect } from 'react-redux';
import EquipmentComponent from '../../components/equipments/EquipmentComponent';
import { fetchEquipments, addEquipment, fetchFamilies } from '../../actions/action';
import { meUser } from '../../actions/action';

class EquipmentContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      addEquipment: {}
    }
  }

  componentDidMount() {
    this.props.fetchEquipments();
    this.props.getFamilies();
    this.props.getUserLogged();
  }


  onChangeEquipment = (e) => {
    e.preventDefault();

    this.setState({
      addEquipment: {
        ...this.state.addEquipment,
        [e.target.name]: e.target.value
      }
    })
  }

  onChangeEquipmentFamilyId = (value) => {
    this.setState({
      addEquipment: {
        ...this.state.addEquipment,
        familyId: value
      }
    })
  }

  onSubmit = () => {
    this.props.addEquipment(this.state.addEquipment);
  }

  render() {

    const { equipments } = this.props;

    return (
      <EquipmentComponent
        language={this.props.language}
        onChangeEquipment={this.onChangeEquipment}
        equipments={equipments.length > 0 ? equipments : []}
        onSubmit={this.onSubmit}
        families={this.props.families}
        onChangeEquipmentFamilyId={this.onChangeEquipmentFamilyId}
        userLogged={this.props.userLogged}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    equipments: state.equipments.getAllEquipments,
    families: state.families.getAllFamilies,
    userLogged: state.users.userLogin
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getFamilies: () => dispatch(fetchFamilies()),
    fetchEquipments: () => dispatch(fetchEquipments()),
    addEquipment: (data) => dispatch(addEquipment(data)),
    getUserLogged: () => dispatch(meUser())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EquipmentContainer);
