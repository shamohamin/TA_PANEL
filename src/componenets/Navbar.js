import React from "react";
import "bootstrap/js/src/collapse.js";
import {ToggleLink} from './ToggleLink' ;


export class Navbar extends React.Component {
    
    render() {
        return <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <span className="navbar-brand">AP</span>

            <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li className="nav-item">
                        <ToggleLink to="/home" exact={false}
                                    name="home"/>
                    </li>
                    <li className="nav-item active">
                        <ToggleLink to="/leaderboard/1" exact={false}
                                    name="Leaderboard" />
                    </li>
                    <li className="nav-item">
                        <ToggleLink to="/homeworks" exact={false}
                                    name="HomeWorks"/>
                    </li>
                </ul>
            </div>
        </nav>
    }

}