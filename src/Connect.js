import React from 'react' ;
import {HashRouter} from 'react-router-dom';
import { Route , Redirect , Switch } 
                from "react-router-dom";
import { LeaderBoard } from "./componenets/LeaderBoard";
import { DataGetterConnector } from "./componenets/Connectors/DataGetterConnector";
import { USERS } from './data/Types';
import { HomeWork } from "./componenets/HomeWork";
import Home from "./componenets/Home";

const LeaderBoardComponenet = DataGetterConnector(USERS , LeaderBoard) ;

export class Connect extends React.Component {
    
    selectComponent(routeProps){
        const page = routeProps.match.params.page ;
        switch(routeProps.match.params.section){
            case "homeworks" :
                return <HomeWork />
            case "leaderboard":
                if (typeof(page) === "undefined")
                    return <Redirect to="/leaderboard/1" />
                return <LeaderBoardComponenet />
            case "home":
                return <Home />
            default:
                return <Redirect to="/home" />
        }
    }


    render(){
        return <HashRouter>
            <Switch>
                <Route path="/:section/:page?/" render = {routeProps => 
                            this.selectComponent(routeProps)} />
                <Redirect to="/home" from="/"/>
            </Switch>
        </HashRouter>
    }

}