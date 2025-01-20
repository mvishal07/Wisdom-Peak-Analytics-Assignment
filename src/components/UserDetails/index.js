import React, { Component } from "react";
import { Link, useParams } from "react-router-dom";
import { ThemeContext } from "../../App";
import { Oval } from "react-loader-spinner";

class UserDetail extends Component {
  state = {
    user: null,
    loading: true,
    error: null,
  };

  componentDidMount() {
    const { id } = this.props.params;
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((response) => response.json())
      .then((data) => this.setState({ user: data, loading: false }))
      .catch((error) =>
        this.setState({ error: error.message, loading: false })
      );
  }

  render() {
    const { user, loading, error } = this.state;
    return (
      <ThemeContext.Consumer>
        {({ darkMode }) => (
          <div className={`user-detail ${darkMode ? "dark" : ""}`}>
            <Link to="/" className="go-back">
              Go Back
            </Link>
            {loading && (
              <div className="loader-container">
                <Oval
                  height={40}
                  width={40}
                  color="#4fa94d"
                  wrapperStyle={{}}
                  visible={true}
                  ariaLabel="oval-loading"
                />
              </div>
            )}
            {error && <p>Error: {error}</p>}
            {user && (
              <div>
                <h1>{user.name}</h1>
                <p>
                  <strong>Username:</strong> {user.username}
                </p>
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
                <p>
                  <strong>Phone:</strong> {user.phone}
                </p>
                <p>
                  <strong>Website:</strong>{" "}
                  <a href={`https://${user.website}`} target="_blank" rel="noreferrer">
                    {user.website}
                  </a>
                </p>
                <h2>Address</h2>
                <p>
                  <strong>Street:</strong> {user.address.street}
                </p>
                <p>
                  <strong>Suite:</strong> {user.address.suite}
                </p>
                <p>
                  <strong>City:</strong> {user.address.city}
                </p>
                <p>
                  <strong>Zipcode:</strong> {user.address.zipcode}
                </p>
                <p>
                  <strong>Geo:</strong> {`Lat: ${user.address.geo.lat}, Lng: ${user.address.geo.lng}`}
                </p>
                <h2>Company</h2>
                <p>
                  <strong>Name:</strong> {user.company.name}
                </p>
                <p>
                  <strong>Catchphrase:</strong> {user.company.catchPhrase}
                </p>
                <p>
                  <strong>Business:</strong> {user.company.bs}
                </p>
              </div>
            )}
          </div>
        )}
      </ThemeContext.Consumer>
    );
  }
}

export default (props) => <UserDetail {...props} params={useParams()} />;
