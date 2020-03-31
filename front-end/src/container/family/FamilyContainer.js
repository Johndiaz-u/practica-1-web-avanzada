import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fetchFamilies, fetchFamily, addFamily } from '../../actions/action';
import Family from '../../components/family/Family'
import { fetchEquipments } from '../../actions/action';
import { meUser } from '../../actions/action';
import { throwStatement } from '@babel/types';


class FamilyContainer extends Component {
  componentDidMount() {
    this.props.getFamilies();
    this.props.fetchEquipments();
    this.props.getUserLogged();
  }

  render() {
    return (
      <div>
        <Family history={this.props.history} families={this.props.families} language={this.props.language} equipments={this.props.equipments} addFamily={this.props.addFamily} userLogged={this.props.userLogged} />
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getFamilies: () => dispatch(fetchFamilies()),
    getFamily: (e) => dispatch(fetchFamily(e)),
    fetchEquipments: () => dispatch(fetchEquipments()),
    addFamily: (e) => dispatch(addFamily(e)),
    getUserLogged: () => dispatch(meUser())
  }
}

const mapStateToProps = (state) => {
  // console.log(state, 'state')
  return {
    families: state.families.getAllFamilies,
    equipments: state.equipments.getAllEquipments,
    userLogged: state.users.userLogin
    // isLoading: state.users.isLoading,
    // errors: state.users.errors,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FamilyContainer);
