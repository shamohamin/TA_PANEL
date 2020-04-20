import React from 'react' 
import { Validate } from "./Validators/validator";
import '../Style/homeWork.css';
import { Navbar } from './Navbar';
import { connect } from 'react-redux';
import { postID } from "../data/actionCreator";
import {HomeWork3} from './contents/HomeWork3';
import { ToggleLink } from "./ToggleLink";
import $ from 'jquery';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { PROJECTPOSTID, POST } from '../data/Types';
import { withRouter } from "react-router-dom";

export const HomeWork = withRouter(connect( () => ({}) , dispatch => ({
    postID : (id, successCallback, failedCallback, type) => dispatch(postID(id, successCallback, failedCallback,type))
}))(class extends React.Component {
        constructor(props){
            super(props) ;
            
            this.state = {
                type : PROJECTPOSTID ,
                card : props.card,
                PROJECTURL : 'https://docs.google.com/document/d/1ndw67EaahUM3y1E9RBQSO8du1wM5sWH20jXTvLRtSiM/edit?usp=sharing',
                HOMEWORKURL : 'https://docs.google.com/document/d/1H1k_2Is_pshtb6KgJ_tjcVNOo8BBcSXA_mnDVM62dcc/edit?usp=sharing',
                projectURL : 'https://docs.google.com/document/d/1ndw67EaahUM3y1E9RBQSO8du1wM5sWH20jXTvLRtSiM/edit?usp=sharing' ,
                homework : {
                    description : HomeWork3 ,
                    title : "HomeWork3" ,
                    name : "پروژه سوم - فریبرز در قرنطینه" ,
                },
                isSubmitted : false ,
                data :{
                    student_id : "" ,
                    exercise_id : props.card === "project" ? 3 : 4
                },
                rules : {
                    student_id : {
                        required : true ,
                        number : true ,
                        minLenght : 7,
                        check : true
                    }
                } ,
                errors : {
                    student_id : []
                } ,
                attentionError : "",
                successMsg : "",
                failedMsg : "",
                dirty : {},
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

        componentDidMount(){
            console.log('componenet did mount')
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
            
            if(this.submit && !this.state.isSubmitted){
                try{
                    this.props.postID(this.state.data ,
                        (url) => {
                            this.setState({isSubmitted : true , successMsg : "submition was successful",
                                        failedMsg:'' , attentionError : ''});
                            window.open(url , '_blank') ;
                            window.location.reload();
                        },
                        (message) => {
                            this.setState({isSubmitted : false , failedMsg : message , successMsg:''})                
                        }, this.state.type);
                }catch(ex){
                    this.forceUpdate();
                }
            }else{
                this.setState({attentionError : "Please pay attention to errors!",successMsg:''});
            }
            window.scrollTo({
                top : 0,
                behavior : "smooth"
            });
        }

        static getDerivedStateFromProps(props , state){
            const {card} = props;
            return {...state,
                card : card ,
                rules : state.rules,
                data : {
                    student_id : card !== state.card ? '' : state.data.student_id,
                    exercise_id : card === "project" ? 5 : 4
                },
                projectURL : card === "project" ? 
                    state.PROJECTURL : state.HOMEWORKURL ,
                type : POST,
                attentionError : card !== state.card ? ' ' : state.attentionError,
                successMsg : card !== state.card ? ' ' : state.successMsg,
                failedMsg : card !== state.card ? ' ' : state.failedMsg,
                errors : card !== state.card ? {student_id : []} : 
                        Validate(state.rules , state.data),
                
            }
        }

        onToggle = () => {
            $('.aside > div').toggle('slow');
            $('.aside > p > span').toggleClass('fa-caret-right') ;
        }

        makeContent = (title) => {
            return <div className="homework-component box">
                <div style={{textAlign:'center', fontSize:'2em'}}>{title}</div><hr color="yellow" />
                <div className="text-center text-danger">
                    {this.state.attentionError}
                </div>
                <div className="text-center text-danger">
                    {this.state.failedMsg}
                </div>
                <div className="text-center text-success">
                    {this.state.successMsg}
                </div>
                <a rel="noopener noreferrer" href={this.state.projectURL} target="_blank"
                    className="homework-component doc">
                    {`${title} Doc`}
                </a>
                <div style={{marginTop:'50px'}}>
                    <div className="row">
                        <div className="col-6">
                            <FormControl fullWidth >
                                <InputLabel style={{color:'white'}} htmlFor={"student_id"}>StudentID</InputLabel>
                                <Input onChange={this.onChange}
                                        autoFocus={true}
                                        style={{color:'white'}}
                                        type="text"
                                        value={this.state.data.student_id}
                                        name={"student_id"}
                                        id={"studnet_id"}
                                        autoComplete="off"
                                        />
                                <div>
                                    {
                                        this.state.errors.student_id.map(err => <div style={{color:'orange', fontSize:'1em'}} key={err}>
                                                {err}
                                            </div>)
                                    }
                                </div>
                            </FormControl>
                        </div>
                        <div className="col-6">
                            <button className="mt-4 btn btn-primary"
                                onClick={() => this.props.card === "project" ? this.setState({attentionError : "Not available for now"}) : this.onClick()}>
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        }

        render(){
            // console.log(this.state.data.exercise_id)
            return <div style={{scrollBehavior:'smooth'}} className="homework-component">
                <div>
                    <Navbar />
                </div>
                <div className="homework-component main">
                    <div className="homework-component side-bar">
                        <aside className="aside">
                            <p onClick={this.onToggle}>
                                Pages <span className="fas fa-caret-down"></span> 
                            </p>
                            <div>
                                <ToggleLink
                                    to="/homeworks/homework" name="homework" exact={true} />
                            </div>
                            <div>
                                <ToggleLink
                                    to="/homeworks/project" name="project" exact={true} />
                            </div>
                        </aside>
                    </div>
                    <div className="home-component content">
                        {this.makeContent(this.props.card)}
                    </div>
                </div>
            </div>
        }

}))