import React from 'react' 
import { Validate } from "./Validators/validator";
import '../Style/homeWork.css';
import {Navbar} from './Navbar';
import { connect } from 'react-redux';
import { postID } from "../data/actionCreator";


export const HomeWork = connect( () => ({}) , dispatch => ({
    postID : (id, successCallback, failedCallback) => dispatch(postID(id, successCallback, failedCallback))
}))(class extends React.Component {
        constructor(props){
            super(props) ;

            this.state = {
                homework : {
                    description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." ,
                    title : "HomeWork1" ,
                    name : "fariborz" ,
                },
                isSubmitted : false ,
                data :{
                    student_id : "" ,
                },
                rules : {
                    student_id : {
                        required : true ,
                        number : true ,
                        maxlen : 7
                    }
                } ,
                errors : {} ,
                attentionError : "",
                successMsg : "",
                failedMsg : ""
            }
        }

        get submit(){
            let ok = true ;
            
            Object.keys(this.state.errors).forEach(key => {
                if(this.state.errors[key].length !== 0)
                    ok = false ;
            });

            return ok ;
        }

        onChange = (event) => {
            event.persist() ;
            this.setState(state => state.data[event.target.name] = event.target.value.trim())
        }

        onClick = () => {
            if(this.submit && !this.state.isSubmitted)
                this.props.postID(this.state.data ,
                    () => this.setState({isSubmitted : true , successMsg : "submition was successfull"}),
                    () => this.setState({isSubmitted : false , failedMsg : "submittion wasn't successfull"}))
            else
                this.setState({attentionError : "Please pay attention to errors!"});
        }

        static getDerivedStateFromProps(props , state){
            return {
                errors : Validate(state.rules , state.data)
            }
        }

        render(){
            return <div>
                <Navbar />
                <div className="main">
                    <div style={{boxShadow:'0 2px 2px 0 rgba(34,36,38,.15)' , borderRadius : '20px'}}>
                        <div className="card"  style={{width:'100%'}}>
                            <div className="card-header text-center head">
                                {this.state.homework.title}
                            </div>
                            <div className="card-body">
                                <div className="wrapper">
                                    <div className="h3 alert-success text-center">{this.state.successMsg}</div>
                                    <div className="h3 alert-danger text-center">{this.state.failedMsg}</div>
                                    <div className="h3 alert-danger text-center">{this.state.attentionError}</div>
                                    <h5 className="card-title pl-3">{this.state.homework.name}</h5>
                                    <hr className="ml-4 mr-4"/>
                                    <p className="card-text text p-2">{this.state.homework.description}</p>
                                </div>
                                <hr />
                                <div className="col-4">
                                    <div className="label pb-2 ml-1">  StudentID :</div>
                                    <input className="form-control input" type="text" value={this.state.data.student_id}
                                                placeholder="StudentID" name="student_id"
                                                onChange = {(event) => this.onChange(event)} />
                                    {
                                        this.state.errors.student_id.map(item => <div style={{borderRadius : '10px' , fontSize : '15px' , fontFamily:'Times' ,  color : 'red'}} className="p-1 mt-1" key={item}>
                                            {item}
                                        </div>)    
                                    }
                                    <div>
                                        <button className="btn mt-2 btn-primary" 
                                                onClick={() => this.onClick()}>
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }

})