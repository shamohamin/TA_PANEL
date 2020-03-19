import React from 'react' 
import { Validate } from "./Validators/validator";
import '../Style/homeWork.css';
import { Navbar } from './Navbar';
import { connect } from 'react-redux';
import { postID } from "../data/actionCreator";


export const HomeWork = connect( () => ({}) , dispatch => ({
    postID : (id, successCallback, failedCallback) => dispatch(postID(id, successCallback, failedCallback))
}))(class extends React.Component {
        constructor(props){
            super(props) ;
            
            this.state = {
                homework : {
                    description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.A condimentum vitae sapien pellentesque. Adipiscing enim eu turpis egestas pretium aenean pharetra. Diam maecenas sed enim ut sem viverra aliquet eget sit. Est sit amet facilisis magna etiam. Consectetur adipiscing elit ut aliquam purus sit. Porttitor massa id neque aliquam vestibulum morbi blandit. Non sodales neque sodales ut etiam sit amet nisl purus. Eu nisl nunc mi ipsum faucibus vitae aliquet. Fermentum leo vel orci porta non pulvinar neque laoreet. Elementum facilisis leo vel fringilla est ullamcorper. Amet cursus sit amet dictum sit amet justo donec enim. Egestas egestas fringilla phasellus faucibus.Vel facilisis volutpat est velit egestas. Ac felis donec et odio pellentesque. Sollicitudin aliquam ultrices sagittis orci a scelerisque purus semper eget. Cursus metus aliquam eleifend mi in nulla posuere. Quis blandit turpis cursus in hac habitasse platea dictumst. Mauris vitae ultricies leo integer malesuada nunc vel risus commodo. Enim ut tellus elementum sagittis vitae et. Odio ut sem nulla pharetra diam sit amet. Tempor orci dapibus ultrices in iaculis nunc sed augue. Auctor eu augue ut lectus arcu bibendum at varius vel. Duis ultricies lacus sed turpis tincidunt id aliquet. Imperdiet proin fermentum leo vel orci porta. Nunc mattis enim ut tellus elementum sagittis vitae et." ,
                    title : "HomeWork1" ,
                    name : "fariborz" ,
                },
                isSubmitted : false ,
                data :{
                    student_id : "" ,
                    exercise_id : 1
                },
                rules : {
                    student_id : {
                        required : true ,
                        number : true ,
                        minLenght : 7,
                        check : true
                    }
                } ,
                errors : {} ,
                attentionError : "",
                successMsg : "",
                failedMsg : "",
                dirty : {}
            }
        }

        get submit(){
            let ok = true ;
            
            Object.keys(this.state.errors).forEach(key => {
                if(this.state.errors[key].length !== 0)
                    ok = false;
            });

            return ok ;
        }

        onChange = (event) => {
            event.persist() ;
            this.setState(state => {
                state.data[event.target.name] = event.target.value.trim() ;
                state.dirty[event.target.name] = true ;
                return {...state} 
            })
        }

        onClick = () => {
            if(this.submit && !this.state.isSubmitted)
                this.props.postID(this.state.data ,
                    (url) => {
                        this.setState({isSubmitted : true , successMsg : "submition was successfull"});
                        window.open(url , '_blank') ;
                    },
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
            return <div className="homework-component">
                <div>
                    <Navbar />
                </div>
                <div className="main">
                
                    <div style={{boxShadow:'0 2px 2px 0 rgba(34,36,38,.15)' , borderRadius : '20px' }}>
                        <div className="card card-animation"  style={{width:'100%'}}>
                            <div className="card-header  text-center head">
                                {this.state.homework.title}
                            </div>
                            <div className="card-body ">
                                <div className="wrapper">
                                    <div className="h3 alert-success text-center">{this.state.successMsg}</div>
                                    <div className="h3 alert-danger text-center">{this.state.failedMsg}</div>
                                    <div className="h3 alert-danger text-center">{this.state.attentionError}</div>
                                    <h5 className="card-title pl-3">{this.state.homework.name}</h5>
                                    <hr className="ml-4 mr-4"/>
                                    <p className="card-text text p-2">{this.state.homework.description}</p>
                                </div>
                                <hr />
                                <div className="col-6">
                                    <div className="label pb-2 ml-1">  StudentID :</div>
                                    <div className="row">
                                        <div className="col-9">
                                        <input className="form-control input ml-3" type="text" value={this.state.data.student_id}
                                                placeholder="StudentID" name="student_id"
                                                onChange = {(event) => this.onChange(event)} />
                                        </div>
                                        <div className="col-2 loading"><div></div><div></div><div></div></div>
                                    </div>
                                    {
                                        this.state.dirty["student_id"] && this.state.errors.student_id.map(item => <div style={{borderRadius : '10px' , fontSize : '15px' , fontFamily:'Times' ,  color : 'red'}} className="p-1 mt-1" key={item}>
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