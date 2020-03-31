import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fetchClients, fetchRentalsFiltered } from '../../actions/action';
import Stats from '../../components/stats/Stats';

class StatsContainer extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getClients();
    }

    render() {
        return (
            <div>
                <Stats clients={this.props.clients} language={this.props.language} rentals={this.props.rentals} getRentalsFiltered={this.props.getRentalsFiltered} rentals={this.props.rentals} />
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getClients: () => dispatch(fetchClients()),
        getRentalsFiltered: (e) => dispatch(fetchRentalsFiltered(e))
    }
}

const mapStateToProps = (state) => {
    return {
        clients: state.clients.getAllClients,
        rentals: state.rentals.getAllRentalsFiltered
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StatsContainer);
