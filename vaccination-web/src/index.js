import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import history from "./history";
import {Route, Router, Switch} from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Header from "./Header";
import Footer from "./Footer";
import MyProfile from "./MyProfile";
import BookVaccination from "./BookVaccination";
import EditProfile from "./EditProfile";

ReactDOM.render(
    <Router history={history}>
        <Header />
        <div className="appContainer">
            <Switch>
                <Route exact path="/" component={MyProfile} />
                <Route path="/login" component={Login} />
                <Route path="/signup" component={Signup} />
                <Route path="/my" component={MyProfile} />
                <Route path="/book" component={BookVaccination} />
                <Route path="/editProfile" component={EditProfile} />
            </Switch>
        </div>
        <Footer />
    </Router>, document.getElementById('root'));
