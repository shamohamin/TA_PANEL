import React from 'react' 
import { PaginateButton } from "./PaginateButton";

export class PaginateControl extends React.Component {
    constructor(props){
        super(props)
        console.log(props)
        this.state = {
            pageSizeGroup : [5 , 10 , 20],
            pageSize : props.pageSize
        }
    }

    onChange = (event) => {
        event.persist() ;
        console.log(event.target.value)
        this.setState({pageSize : event.target.value} ,
                        () => this.props.setPageSize(event.target.value))

    }


    render() {
        return <div className="row text-center">
            <div className="container m-4">
                <div className=" float-right col-6">
                    <PaginateButton {...this.props} />
                </div>
                <div className="text-center col-6">
                    {
                        <select className="form-control-sm" value={this.state.pageSize}
                                onChange={(event) => this.onChange(event)}>  
                            {
                                this.state.pageSizeGroup.map(item => 
                                        <option key={item} value={Number(item)}>
                                            {item}
                                        </option>)
                            }
                        </select>
                    }
                </div>
            </div>
        </div>
    }

}