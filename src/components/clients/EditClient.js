import React, { Component } from "react";
import { Link } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";

class EditClient extends Component {
  state = {
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    balance: "",
  };
  static getDerivedStateFromProps({ client }, state) {
    if (state.id === "" && client) {
      return client;
    } else return state;
  }
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  onSubmit = (e) => {
    e.preventDefault();
    const updClient = this.state;
    if (updClient.balance === "") {
      updClient.balance = 0;
    }
    const { firestore, client, history } = this.props; // take client, firestore and history out of the props
    firestore
      .update({ collection: "clients", doc: client.id }, updClient)
      .then(history.push("/"));
  };
  render() {
    const { client } = this.props; // destructing client from this.props
    const { disableBalanceOnEdit } = this.props.settings;

    // if the client comes in from firebase, we'll return this
    if (client) {
      return (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/" className="btn btn-link">
                <i className="fas fa-arrow-circle-left" /> Back to Dashboard
              </Link>
            </div>
          </div>
          <div className="card">
            <div className="card-header">Edit Client</div>
            <div className="card-body">
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="firstName"
                    minLength="2"
                    required
                    onChange={this.onChange}
                    value={this.state.firstName}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="lastName"
                    minLength="2"
                    required
                    onChange={this.onChange}
                    value={this.state.lastName}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    required
                    onChange={this.onChange}
                    value={this.state.email}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    name="phone"
                    minLength="10"
                    onChange={this.onChange}
                    value={this.state.phone}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="balance">Balance</label>
                  <input
                    type="text"
                    className="form-control"
                    name="balance"
                    onChange={this.onChange}
                    value={this.state.balance}
                    disabled={disableBalanceOnEdit}
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      );
    } else return <Spinner />;
  }
}

EditClient.propTypes = {
  firestore: PropTypes.object.isRequired,
};

export default compose(
  firestoreConnect((props) => [
    { collection: "clients", storeAs: "client", doc: props.match.params.id },
  ]),
  connect(({ firestore: { ordered }, settings }, props) => ({
    client: ordered.client && ordered.client[0],
    settings, // or you can write settings: settings
  }))
)(EditClient); // EditClient is the name of our component
