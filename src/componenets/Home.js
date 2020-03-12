import React,{useEffect , useState} from 'react';
import "../Style/Home.css";
import { Navbar } from "./Navbar";
import {withRouter}  from 'react-router-dom'

const Home = ({history}) => {

    const [word , setWord] = useState("") ;
    const [word2 , setWord2] = useState("") ;
    const [word3 , setWord3] = useState("") ;
    const [word4 , setWord4] = useState("") ;
    const [timerArray , setTimer] = useState([]);

    const updateWord = () => {
        const JAVAWORD = "public class Classrome {";
        const FINALHOMEWORK = "final static string HOMEWORK ;" ;
        const FINAlLEADERBOARD = "final static string LEADERBOARD ;";
        for(let i = 0 ; i <= JAVAWORD.length ; i++){
            setTimer(state => {
                state.push(setTimeout(() => setWord(() => JAVAWORD.substr(0,i)),i*150))
                return state ;
            });
        }

        let time = setTimeout(() => {
            for(let i = 0 ; i < FINALHOMEWORK.length + 1 ; i++){
                setTimeout(() => {
                    setWord2(() => FINALHOMEWORK.substring(0,i))
                }, i*150);
            }
        }, 4000);
    
        let time2 = setTimeout(() => {
            clearTimeout(time);
            for(let i = 0 ; i <= FINAlLEADERBOARD.length ; i++){
                setTimer(state => {
                    state.push(setTimeout(() => {
                        setWord3(() => FINAlLEADERBOARD.substring(0,i))
                    }, i*100));
                    return state ;
                })
            }
        }, 8700);
        
        setTimer(state => { 
            state.push(setTimeout(() => {
                clearTimeout(time2);
                setWord4("}");
            }, 12400));
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
                <div className="welcome-wrapper">
                    <div className="wrapper">
                        <div className="te">
                            {word}
                        </div>        
                        <div className="right-link"
                                onClick={() => history.push("/homeworks")} >
                            { 
                                word2.length !== 0 ? word2 : ''
                            }
                        </div>
                        <div className="left-link " onClick={() => history.push('/leaderboard/1')}>
                            { 
                                word3.length !== 0 ? word3 : ''
                            }      
                        </div>
                        <div className="bracket">
                            {word4}
                        </div>        
                    </div>
                </div>
            </div>
        </div>
    </React.Fragment>
}

export default withRouter(Home) ;