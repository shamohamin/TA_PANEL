import React from 'react' ;
import {HashRouter} from 'react-router-dom';
import { Route , Redirect , Switch } 
                from "react-router-dom";
import { LeaderBoard } from "./componenets/LeaderBoard";
import { DataGetterConnector } from "./componenets/Connectors/DataGetterConnector";
import { USERS } from './data/Types';
import { HomeWork } from "./componenets/HomeWork";

const LeaderBoardComponenet = DataGetterConnector(USERS , LeaderBoard) ;

export class Connect extends React.Component {
    
    selectComponent(routeProps){
        switch(routeProps.match.params.section){
            case "homeworks" :
                return <HomeWork />
            case "leaderboard":
                return <LeaderBoardComponenet />
            default:
                return <Redirect to="/leaderboard/1" from="/"/>
        }
    }


    render(){
        return <HashRouter>
            <Switch>
                <Route path="/:section/:page?/" render = {routeProps => 
                            this.selectComponent(routeProps)} />
                <Redirect to="/leaderboard/1" from="/"/>
            </Switch>
        </HashRouter>
    }

}