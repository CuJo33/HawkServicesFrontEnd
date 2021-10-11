import React, { useEffect, useState } from "react";
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
import Dashboard from "./pages/Dashboard";

function App() {
  const [token, changeToken] = useState(
    window.localStorage.getItem("authToken")
  );
  const [clientId, cClientId] = useState(
    window.localStorage.getItem("clientId")
  );
  const [employeeId, cEmployeeId] = useState(
    window.localStorage.getItem("employeeId")
  );
  // const [employeeId, cEmployeeId] = useState(
  //   window.localStorage.getItem("employeeId")
  // );
  const client = new ApiClient(
    () => token,
    () => logout()
  );

  // need to remove this later - it's here because we don't have a employee login page
  useEffect(() => {
    cEmployeeId("614dab91d76d0c1576f8b9e5");
  }, []);

  // need to make an employeeId version of the login
  // need to make an employeeId version of the login
  // need to make an employeeId version of the login
  // need to make an employeeId version of the login
  // need to make an employeeId version of the login
  // need to make an employeeId version of the login
  // need to make an employeeId version of the login
  // need to make an employeeId version of the login
  // need to make an employeeId version of the login
  // need to make an employeeId version of the login
  // need to make an employeeId version of the login

  const login = (t, c) => {
    window.localStorage.setItem("authToken", t);
    window.localStorage.setItem("clientId", c);
    changeToken(t);
    cClientId(c);
  };

  const logout = () => {
    window.localStorage.removeItem("authToken");
    window.localStorage.removeItem("clientId");
    window.localStorage.removeItem("employeeId");
    changeToken(undefined);
    cClientId(undefined);
    cEmployeeId(undefined);
  };

  return (
    <>
      <Router>
        <Navbar token={token} logout={logout} />
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
              <Quotes
                client={client}
                token={token}
                employeeId={employeeId}
                clientId={clientId}
              />
            ) : (
              <Login loggedIn={(t, c) => login(t, c)} client={client}></Login>
            )}
          </Route>
          <Route exact path="/booking">
            <Booking client={client} token={token} clientId={clientId} />
          </Route>
          <Route exact path="/dashboard">
            <Dashboard client={client} token={token} clientId={clientId} />
          </Route>
          <Route path="/test">
            <Test />
          </Route>
          <Route path="/login">
            <Login loggedIn={(t, c) => login(t, c)} client={client}></Login>
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
                    <Login
                      loggedIn={(t, c) => login(t, c)}
                      client={client}
                    ></Login>
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
