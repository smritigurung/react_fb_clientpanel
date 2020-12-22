// This is going to be class
import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import Spinner from "../layout/Spinner";

class Clients extends Component {
  state = {
    totalOwed: null,
  };

  static getDerivedStateFromProps(props, state) {
    const { clients } = props;

    if (clients) {
      // Looping through and adding together balances, and putting in variable named 'total'
      const total = clients.reduce((total, client) => {
        return total + parseFloat(client.balance.toString());
      }, 0);

      // return state value which is totalOwed and we wanna define it as total
      return { totalOwed: total };
    }
    return null;
  }

  render() {
    // clients are array of objects
    const { clients } = this.props;
    const { totalOwed } = this.state;

    if (clients) {
      return (
        <div>
          <div className="row">
            {/* 6 column div */}
            <div className="col-md-6">
              <h2>
                <i className="fas fa-users" /> Clients
              </h2>
            </div>
            {/* 6 column div */}
            <div className="col-md-6">
              <h5 className="text-right text-secondary">
                Total Owed{" "}
                <span className="text-primary">
                  ${parseFloat(totalOwed).toFixed(2)}
                </span>
              </h5>
            </div>
          </div>
          <table className="table table-striped">
            {/* inverse will make it dark */}
            <thead className="thead-inverse">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Balance</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client.id}>
                  <td>
                    {client.firstName} {client.lastName}
                  </td>
                  <td>{client.email}</td>
                  <td>${parseFloat(client.balance).toFixed(2)}</td>
                  <td>
                    <Link
                      to={`/client/${client.id}`}
                      className="btn btn-secondary btn-sm"
                    >
                      <i className="fas fa-arrow-circle-right" /> Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}

Clients.propTypes = {
  firestore: PropTypes.object.isRequired, // firestore is a prop
  clients: PropTypes.array, // clients is also a property
};

export default compose(
  firestoreConnect([{ collection: "clients" }]), // it's going to get clients from firestore, and we're going to put that into 'clients' props
  connect((state, props) => ({
    clients: state.firestore.ordered.clients, // here, ordered is an array
  }))
)(Clients); // Clients is the name of our component
