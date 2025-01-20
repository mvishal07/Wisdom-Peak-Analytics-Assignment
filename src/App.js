import React, { Component, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import UserDetail from "./components/UserDetails";
import "./App.css";

export const ThemeContext = createContext();

class App extends Component {
  
state = {
  darkMode: false,
}
  toggleTheme = () => {
    this.setState((prevState) => ({ darkMode: !prevState.darkMode }));
  };

  render() {
    return (
      <ThemeContext.Provider value={{ ...this.state, toggleTheme: this.toggleTheme }}>
        <Router basename="/repo-name">
          <div className={this.state.darkMode ? "app dark" : "app"}>
            <button className="theme-toggle" onClick={this.toggleTheme}>
              {this.state.darkMode ? "Light Mode" : "Dark Mode"}
            </button>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/user/:id" element={<UserDetail />} />
            </Routes>
          </div>
        </Router>
      </ThemeContext.Provider>
    );
  }
}

export default App;
