import React,{useEffect , useState} from 'react';
import "../Style/Home.css";
import { Navbar } from "./Navbar";
import {withRouter}  from 'react-router-dom'
import {HomeToolbar} from './HomeToolbar';

const Home = ({history}) => {

    const [word , setWord] = useState("") ;
    const [word2 , setWord2] = useState("") ;
    const [word3 , setWord3] = useState("") ;
    const [word4 , setWord4] = useState("") ;
    const [timerArray , setTimer] = useState([]);


    const updateWord = () => {
        const JAVAWORD = "public class Classroom {";
        const FINALHOMEWORK = "final static String HOMEWORK ;" ;
        const FINAlLEADERBOARD = "final static String LEADERBOARD ;";
        
        // let count = 0 ;

        for(let i = 0 ; i <= JAVAWORD.length ; i++){
            
            setTimer(state => {
                
                state.push(setTimeout(() => setWord(() => JAVAWORD.substr(0,i)),i*150))
                return state ;
            });
            // console.log(count)
        }

        let time = setTimeout(() => {
            for(let i = 0 ; i < FINALHOMEWORK.length + 1 ; i++){
                
                setTimeout(() => {
                    setWord2(() => FINALHOMEWORK.substring(0,i))
                }, i*150);
            }
        }, 3950);
    
        let time2 = setTimeout(() => {
            clearTimeout(time);
            for(let i = 0 ; i <= FINAlLEADERBOARD.length ; i++){
                
                setTimer(state => {
                    state.push(setTimeout(() => {
                        setWord3(() => FINAlLEADERBOARD.substring(0,i))
                    }, i*150));
                    return state ;
                })
            }
            // console.log(count)
        }, 8500);
        
        setTimer(state => { 
            state.push(setTimeout(() => {
                clearTimeout(time2);
                setWord4("}");
            }, 13600));
            return state ;
        });
        
    }
    
    useEffect(() => {
        updateWord();
    }, []);

    useEffect(() => {
        return () => {
            for(let timer in timerArray){
                clearTimeout(timer);
            }
        } 
    },[timerArray]);

    return <React.Fragment>
        <div className="home-component">
            <div>
                <Navbar />
            </div>
            <div className="container-made">
                <div className="menu">
                    <span className="exit" onClick={() => {
                        setWord("");
                        setWord2("");
                        setWord3("");
                        setWord4("");
                    }}></span>
                    <span className="minimum"></span>
                    <span className="maximum"></span>
                </div>
                <div style={{backgroundColor:'#2d132c'}}>
                    <HomeToolbar />
                </div>
                <div style={{marginLeft:'-10px',color:'white'}}>
                    <div className="container">
                        <div className="row ">
                            <div className="col-3"style={{color:'white'}} >
                                <div style={{borderBottom: '1px solid white'}}>Project<span style={{paddingLeft:'5px' , paddingTop:'5px'}} className="fas fa-angle-down"></span></div>
                                <div>
                                    <div> <span className="fas fa-caret-down"></span> Factor</div>
                                    <div className="ml-2"> <span className="fas fa-caret-right"> </span> .idea</div>
                                    <div className="ml-2"> 
                                        <span className="fas fa-caret-down"> </span> src
                                        <div className="ml-2"> 
                                            <span className="fas fa-caret-down"> </span> main 
                                            <div className="ml-2"> 
                                                <span className="fas fa-caret-down"> </span> java 
                                                <div className="ml-2">
                                                    <span className="fas fa-caret-down"> </span> ir.ac.kntu
                                                    <div className="ml-2"> <span style={{color:'red'}} className="fab fa-java"> </span> Classroom.java </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="ml-2">
                                            <span className="fas fa-caret-down"> </span> test
                                            <div className="ml-2">
                                                <span className="fas fa-caret-down"> </span>java
                                                <div className="ml-2">
                                                    <span className="fas fa-caret-down"></span> ir.ac.kntu.style
                                                    <div className="ml-2">
                                                        <span style={{color:'red' , display:"block", marginBottom:'3px'}} className="fab fa-java"><span style={{color:'white',fontSize:'17px'}}> SolutionTest.java </span></span> 
                                                        <span style={{color:'red' , display:"block", marginBottom:'3px'}} className="fab fa-java"><span style={{color:'white', fontSize:'17px'}}> CheckPMDTest.java </span></span> 
                                                        <span style={{color:'red' ,display:"block"}} className="fab fa-java"><span style={{color:'white', fontSize:'17px'}}> CheckStyleTest.java </span></span> 
                                                        <span style={{display:"block", marginBottom:'3px'}} className="fas fa-file-code"><span style={{color:'white',fontSize:'17px'}}> config.xml </span></span> 
                                                        <span style={{display:"block", marginBottom:'3px'}} className="fas fa-file-code"><span style={{color:'white',fontSize:'17px'}}> naming.xml </span></span> 
                                                    </div>
                                                </div>
                                             </div>
                                        </div>
                                    </div>
                                    <div className="ml-2"> <span className="fas fa-caret-right"> </span> target </div>
                                    <div className="ml-1"> <span style={{color:'deepskyblue'}} className="fab fa-medium-m"></span> pom.xml</div>
                                    <div className="ml-2"> <span className="fas fa-caret-down"> </span> External Libraries</div>
                                    <div className="ml-1"> <span style={{color:'gray'}} className="fas fa-terminal"> </span> Scratches and Console</div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="row" style={{borderBottom:'1px solid white', paddingTop:'5px'}}>
                                    <span style={{color:'red', borderRight:'1px solid gray' , padding:'1px' , paddingRight:'10px' ,display:"block"}} className="fab fa-java"><span style={{color:'white', fontSize:'17px'}}> Classroom.java </span></span> 
                                </div>
                                <div style={{paddingTop: '10p', overflow:'scroll'}}>
                                    <div>
                                        <span style={{color:'orange'}}>
                                            package
                                        </span>
                                        <span> ir.ac.kntu</span>
                                        <span style={{color:'orange' ,fontStyle:'bold'}}> ; </span>
                                    </div>
                                    <div className="te">
                                        <span>{word.substr(0,12)}</span>
                                        {word.substring(12)}
                                    </div>        
                                    <div className="right-link"
                                            onClick={() => history.push("/homeworks")} >
                                            <span>{word2.substr(0,12)}</span>
                                            <span style={{color:'white'}}> {word2.substr(12,20)} </span>
                                    </div>
                                    <div className="left-link " onClick={() => history.push('/leaderboard/1')}>
                                        <span>{word3.substr(0,12)}</span>
                                        { 
                                            word3.length !== 0 ? word3.substr(12) : ''
                                        }      
                                    </div>
                                    <div className="bracket">
                                        {word4}
                                    </div>        
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </React.Fragment>
}

export default withRouter(Home) ;