import React from "react";
import "bootstrap/js/src/collapse.js";
// import Sidebar from 'react-sidebar';
import {ToggleLink} from './ToggleLink' ;
// import {inlineStyle} from '../Style/navBarStyle'
import {GITURL} from '../data/Types';
import {URLS} from '../data/REST/URLS';

const mql = window.matchMedia(`(min-width: 700px)`);

export class Navbar extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            slideBarOpen : false,
            slidebarDocked : mql.matches
        }
    }


    UNSAFE_componentWillMount(){
        mql.addListener(this.onSetSideBarOpen);
    }
    

    componentWillUnmount(){
        mql.removeListener(this.mediaQueryChanged);
    }

    onSetSideBarOpen = (open) => 
        this.setState({slideBarOpen : open});

    mediaQueryChanged = () => 
        this.setState({slidebarDocked : mql.matches , slideBarOpen:false});


    renderNav = () => {
        return <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
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
                <li className="nav-item">
                    <ToggleLink to="/register" exact={true}
                                name="Register" />
                </li>
                <li>
                    <a target="_blank" style={{float:"left", marginLeft:'4px' , paddingTop:'4px', marginTop:'6px' , cursor:'pointer' ,color:'orange' , paddingRight : '8px'}} href={URLS[GITURL]} rel="noopener noreferrer"  arial-hidden="true"><span className="fab fa-gitlab"><span style={{paddingRight:'2px'}}> Gitlab </span></span> </a>
                </li>
            </ul>
        </div>
    }


    render() {
        return <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <button onClick={() => this.onSetSideBarOpen(true)} className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <span className="navbar-brand">AP</span>
            {
                this.renderNav()
            }
        </nav>
    }

}