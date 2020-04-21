import React from 'react' ;
import {HashRouter} from 'react-router-dom';
import { Route , Redirect , Switch } 
                from "react-router-dom";
import { LeaderBoard } from "./componenets/LeaderBoard";
import { DataGetterConnector } from "./componenets/Connectors/DataGetterConnector";
import { USERS } from './data/Types';
import { HomeWork } from "./componenets/HomeWork";
import Home from "./componenets/Home";
import { FormComponent } from "./componenets/Forms/FormComponent";


const LeaderBoardComponenet = DataGetterConnector(USERS , LeaderBoard) ;

export class Connect extends React.Component {
    
    selectComponent(routeProps){
        const page = routeProps.match.params.page ;
        switch(routeProps.match.params.section){
            case "homeworks" :
                if(page === "project")
                    return <HomeWork time={new Date().toString()} card="project" />
                else if(typeof page === "undefined")
                    return <Redirect from="/homeworks" to="/homeworks/project" />
                else if(page === "workshop")
                    return <HomeWork card="workshop" time={new Date().toString()} />
                else
                    return <HomeWork time={new Date().toString()} card="homework" />
            case "leaderboard":
                if (typeof(page) === "undefined")
                    return <Redirect to="/leaderboard/1" />
                return <LeaderBoardComponenet />
            case "home":
                return <Home />
            case "register":
                return <FormComponent />
            default:
                return <Redirect to="/home" />
        }
    }


    render(){
        document.getElementsByTagName("META")[3].content="Advance Programming with Java";
        console.log(document.getElementsByTagName("META")[3].content);
        return <HashRouter>
            <Switch>
                <Route path="/:section/:page?/" render = {routeProps => 
                            this.selectComponent(routeProps)} />
                <Redirect to="/home" from="/"/>
            </Switch>
        </HashRouter>
    }

}