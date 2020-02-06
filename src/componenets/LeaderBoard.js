import React from 'react' ;
import logo from '../logo.svg' ;
import '../App.css' ;
import { PaginateConnector } from "./paginate/PaginateConnector";
import { PaginateControl } from "./paginate/PaginateControl";
import { USERS } from '../data/Types';
import '../Style/leaderboard.css'
import { Navbar } from "./Navbar";


const PaginateControlComponenet = PaginateConnector(USERS , PaginateControl) ;

export class LeaderBoard extends React.Component {
    

    render(){
        return <div>
            <Navbar />
        <div className="main text-center">
            <div className="box">
                {
                    !this.props.is_loading ?<div> <table className="table table-bordered table-striped table-dark table-hover">
                            <thead className="thead-dark">
                                <tr>
                                    <th>ID</th><th>FirstName</th><th>LastName</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.props.data.map(user => <tr key={user._id}>
                                        <td>
                                            {user.id}
                                        </td>
                                        <td>
                                            {user.first_name}
                                        </td>
                                        <td>
                                            {user.last_name}
                                        </td>
                                    </tr>) 
                                }
                            </tbody>
                        </table> </div> : <div className="text-white">
                                <img src={logo} className="App-logo" alt="logo" />
                                    is_loading...........
                            </div>
                    }
                    <div className="m-4 text-center">
                        <PaginateControlComponenet />
                    </div>  
            </div>
        </div>
        </div>
    }
}