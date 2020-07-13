import React from "react";
import { Route, Redirect, Switch, HashRouter } from "react-router-dom";
import { LeaderBoard } from "./componenets/LeaderBoard";
import { DataGetterConnector } from "./componenets/Connectors/DataGetterConnector";
import { USERS } from "./data/Types";
import { HomeWork } from "./componenets/HomeWork";
import Home from "./componenets/Home";
import { FormComponent } from "./componenets/Forms/FormComponent";

const LeaderBoardComponenet = DataGetterConnector(USERS, LeaderBoard);

export class Connect extends React.Component {
  selectComponent(routeProps) {
    const page = routeProps.match.params.page;
    const pages = [
      "project",
      "thaw12-recursion",
      "tahw13-tree-gui",
      "tahw13-file-gui",
      "tahw14-file-serializable",
      "tahw15-dao-file",
      "fariborz-square",
      "pattern-recognition",
      "bomberman",
      'concurrency-report',
      'hospital-file-manager'
    ];
    switch (routeProps.match.params.section) {
      case "homeworks":
        return pages.find((item) => item === page) ? (
          <HomeWork time={new Date().toString()} card={`${page}`} />
        ) : (
          <Redirect to="/homeworks/project" />
        );
      case "leaderboard":
        if (typeof page === "undefined")
          return <Redirect to="/leaderboard/1" />;
        return <LeaderBoardComponenet />;
      case "home":
        return <Home />;
      case "register":
        return <FormComponent />;
      default:
        return <Redirect to="/home" />;
    }
  }

  render() {
    document.getElementsByTagName("META")[3].content =
      "Advance Programming with Java";
    console.log(document.getElementsByTagName("META")[3].content);
    return (
      <HashRouter>
        <Switch>
          <Route
            path="/:section/:page?/"
            render={(routeProps) => this.selectComponent(routeProps)}
          />
          <Redirect to="/home" from="/" />
        </Switch>
      </HashRouter>
    );
  }
}
