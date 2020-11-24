import React, { Component } from "react";
import PhotoContextProvider from "./context/PhotoContext";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Header from "./components/Header";
import Item from "./components/Item";
import Search from "./components/Search";
import NotFound from "./components/NotFound";

class App extends Component {
  // Prevent page reload, clear input, set URL and push history on submit

  state = {};

  handleSubmit = (e, history, searchInput, clearInput) => {
    e.preventDefault();
    e.currentTarget.reset();
    let url = `/search/${searchInput}`;
    history.push(url);
    this.setState(() => ({ clearInput }));
  };

  render() {
    const { clearInput } = this.state;

    return (
      <PhotoContextProvider>
        <Router>
          <div className="container">
            <Route
              render={props => (
                <Header
                  handleSubmit={this.handleSubmit}
                  history={props.history}
                />
              )}
            />
            <Switch>
              <Route
                exact
                path="/"
                render={() => <Redirect to="/mountain" />}
              />

              <Route
                path="/mountain"
                render={() => <Item searchTerm="mountain" clearInput={clearInput}/>}
              />
              <Route path="/beach" render={() => <Item searchTerm="beach" clearInput={clearInput} />} />
              <Route path="/bird" render={() => <Item searchTerm="bird" clearInput={clearInput} />} />
              <Route path="/food" render={() => <Item searchTerm="food" clearInput={clearInput} />} />
              <Route
                path="/search/:searchInput"
                render={props => (
                  <Search searchTerm={props.match.params.searchInput} />
                )}
              />
              <Route component={NotFound} />
            </Switch>
          </div>
        </Router>
      </PhotoContextProvider>
    );
  }
}

export default App;
