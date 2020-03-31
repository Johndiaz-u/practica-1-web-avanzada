import React, { Component } from 'react'
import { ConnectedRouter } from "connected-react-router";
import { history } from '../utils/history.js';
import { Switch, Route } from 'react-router';
import ClientContainer from "../container/client/ClientContainer";
import App from '../App.js';
import { connect } from 'react-redux';
import UsersContainer from './user/UsersContainer.js';
import DashboardComponent from '../components/dashboard/DashboardComponent.js';
import UserGetContainer from './user/UserGetContainer.js';
import UserEditComponent from '../components/users/UserEditComponent.js';
import { fetchLanguage } from '../actions/action.js';
import FamilyContainer from './family/FamilyContainer.js';
import UserEditContainer from './user/UserEditContainer.js';
import EquipmentContainer from './equipments/EquipmentContainer.js';
import RentalsContainer from './rentals/RentalsContainer.js';
import StatsContainer from './stats/StatsContainer.js';
import StatsHistoryRentalsContainer from './stats/StatsHistoryRentalsContainer.js';
import MeContainer from './me/MeContainer.js';
import MeEditContainer from './me/MeEditContainer.js';

class AppContainer extends Component {
  componentDidMount() {
    this.props.getLanguage();
  }
  render() {
    return (
      <ConnectedRouter history={history}>
        <Switch>
          {/* <Route exact path={`/`} component={DashboardComponent} /> */}
          <Route exact path={'/'} render={(props) => <EquipmentContainer {...props} language={this.props.language} />} />
          <Route exact path={'/me'} render={(props) => <MeContainer {...props} language={this.props.language} />} />
          <Route exact path={'/me/edit'} render={(props) => <MeEditContainer {...props} language={this.props.language} />} />
          <Route exact path={'/clients'} render={(props) => <ClientContainer {...props} language={this.props.language} />} />
          <Route exact path={'/families'} render={(props) => <FamilyContainer {...props} language={this.props.language} />} />
          <Route exact path={'/users'} render={(props) => <UsersContainer {...props} language={this.props.language} />} />
          <Route exact path={'/users/:id'} component={UserGetContainer} />
          <Route exact path={'/users/:id/edit'} component={UserEditContainer} />
          <Route exact path={'/equipments'} render={(props) => <EquipmentContainer {...props} language={this.props.language} />} />
          <Route exact path={'/rentals'} render={(props) => <RentalsContainer {...props} language={this.props.language} />} />
          <Route exact path={'/stats'} render={(props) => <StatsContainer {...props} language={this.props.language} />} />
          <Route exact path={'/stats/family'} render={(props) => <StatsHistoryRentalsContainer {...props} language={this.props.language} />} />
        </Switch>
      </ConnectedRouter>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  var userLang = navigator.language || navigator.userLanguage;
  // console.log("The language is: " + detectBrowserLanguage());
  // console.log(navigator)
  return {
    getLanguage: () => dispatch(fetchLanguage(userLang))
  }
}

const mapStateToProps = (state) => {
  // console.log(state, 'state language')
  return {
    language: state.language.getAllTexts,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
