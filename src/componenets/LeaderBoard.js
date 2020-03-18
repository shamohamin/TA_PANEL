import React from 'react' ;
import '../App.css' ;
import { PaginateConnector } from "./paginate/PaginateConnector";
import { PaginateControl } from "./paginate/PaginateControl";
import { USERS } from '../data/Types';
import '../Style/leaderboard.css'
import { Navbar } from "./Navbar";


const PaginateControlComponenet = PaginateConnector(USERS , PaginateControl) ;

export class LeaderBoard extends React.Component {

    render(){
        
        return <React.Fragment>
            
            <Navbar />
            <div className="main text-center">
                <div className="box">
                    {
                        !this.props.is_loading && typeof(this.props.data) != "undefined" ?<div style={{overflowX : 'scroll'}}> <table className="table table-bordered table-striped table-dark table-hover">
                                <thead className="thead-dark">
                                    <tr> 
                                        <th>ID</th><th>FirstName</th><th>LastName</th>
                                        {this.props.data[0].grade.map((g , index) => <th key={index + 1}>homeWord{index}</th>)}
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.props.data.map(item => <tr key={item.exercise_id}>
                                            <td>
                                                {item.student_id}
                                            </td>
                                            <td>
                                                {item.first_name}
                                            </td>
                                            <td>
                                                {item.last_name}
                                            </td>
                                            {
                                                item.grade.map(g => <td>
                                                    {g}
                                                </td>)
                                            }
                                        </tr>) 
                                    }
                                </tbody>
                            </table> </div> : <div className="leader-board text-white">
                                <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                                </div>
                        }
                        <div className="m-4 text-center">
                            <PaginateControlComponenet />
                        </div>  
                </div>
            </div>  
        </React.Fragment>
    }
}