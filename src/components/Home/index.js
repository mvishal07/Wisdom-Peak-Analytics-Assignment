import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../App";
import { Oval } from "react-loader-spinner";

class HomePage extends Component {
  state = {
    users: [],
    filteredUsers: [],
    search: "",
    sortOrder: "asc",
    loading: true,
    error: null,
  };

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) =>
        this.setState({ users: data, filteredUsers: data, loading: false })
      )
      .catch((error) =>
        this.setState({ error: error.message, loading: false })
      );
  }

  handleSearch = (event) => {
    const search = event.target.value.toLowerCase();
    const filteredUsers = this.state.users.filter((user) =>
      user.name.toLowerCase().includes(search)
    );
    this.setState({ search, filteredUsers });
  };

  handleSort = () => {
    const { filteredUsers, sortOrder } = this.state;
    const sortedUsers = [...filteredUsers].sort((a, b) =>
      sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );
    this.setState({
      filteredUsers: sortedUsers,
      sortOrder: sortOrder === "asc" ? "desc" : "asc",
    });
  };

  render() {
    const { filteredUsers, loading, error } = this.state;
    const res = filteredUsers.length
    return (
      <ThemeContext.Consumer>
        {({ darkMode }) => (
          <div className={`home-page ${darkMode ? "dark" : ""}`}>
            <h1>User List</h1>
            <input
              type="text"
              placeholder="Search by name..."
              onChange={this.handleSearch}
              className="search-bar"
            />
            <button onClick={this.handleSort} className="sort-button">
              Sort by Name
            </button>
            {loading && (
              <div  className="loader">
              <Oval
                height={40}
                width={40}
                color="#4fa94d"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="oval-loading"
                secondaryColor="#4fa94d"
                strokeWidth={2}
                strokeWidthSecondary={2}
               
              /></div>
            )}
            {error && <p>Error: {error}</p>}
           
            <div className="user-list">
              { res>0 ?  filteredUsers.map((user) => (
                <div key={user.id} className="user-card">
                  <h3>{user.name}</h3>
                  <p>{user.email}</p>
                  <p>{user.address.city}</p>
                  <Link to={`/user/${user.id}`} className="details-link">
                    View Details
                  </Link>
                </div>
              )) : " NO USER FOUND"}
            </div>
          </div>
        )}
      </ThemeContext.Consumer>
    );
  }
}

export default HomePage;
