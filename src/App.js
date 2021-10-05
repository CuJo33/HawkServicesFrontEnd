import React, { useState } from "react";
import Dashboard from "./Dashboard";
import { ApiClient } from "./apiClient";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
// import Cujo_head from "./cujo_head.jpg";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Test from "./test/Test";
import Booking from "./pages/Booking";

import { ProtectedRoute } from "./protectedRoute/ProtectedRoute";
import Footer from "./components/Footer";
import About from "./pages/About";
import Quotes from "./pages/Quotes";

function App() {
  const [token, changeToken] = useState(window.localStorage.getItem("token"));
  const client = new ApiClient(
    () => token,
    () => logout()
  );

  const login = (t) => {
    window.localStorage.setItem("token", t);
    changeToken(t);
  };

  const logout = () => {
    window.localStorage.removeItem("token");
    // changeToken(undefined);
  };

  return (
    <>
      <Router>
        <Navbar token={token} />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/services" exact>
            <Services />
          </Route>
          <Route exact path="/contact">
            <Contact />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/quotes">
            {token ? (
              <Quotes client={client} />
            ) : (
              <Login loggedIn={(t) => login(t)} client={client}></Login>
            )}
          </Route>
          <Route exact path="/booking">
            <Booking />
          </Route>
          <Route path="/test">
            <Test />
          </Route>
          <Route path="/login">
            <Login loggedIn={(t) => login(t)} client={client}></Login>
          </Route>
          <Route path="/signup">
            <Signup client={client} />
          </Route>
          <Route path="/test">
            {token ? (
              <Test client={client} />
            ) : (
              <Container>
                <Row>
                  <Col>
                    <Login loggedIn={(t) => login(t)} client={client}></Login>
                  </Col>
                  <Col>
                    <Signup client={client} />
                  </Col>
                </Row>
              </Container>
            )}
          </Route>
        </Switch>
        <Footer />
      </Router>
    </>
  );
}

export default App;
