import React,{useEffect , useState} from 'react';
import "../Style/Home.css";
import { Navbar } from "./Navbar";
import {withRouter}  from 'react-router-dom'

const Home = ({history}) => {

    const [word , setWord] = useState("");

    const updateWord = () => {
        const JAVAWORD = "JAVA";
        for(let i = 0 ; i <= JAVAWORD.length ; i++){
            setTimeout(() => setWord(() => JAVAWORD.substr(0,i)),i*400) ;
        } 
    }
    
    useEffect(() => {
        updateWord();
    }, []);

    useEffect(() => {
        let time ;
        if(word.length === 4){
            time = setTimeout(() =>{
                setWord(() => "") 
                updateWord()
            }, 2000) ;
        }
        return () => clearTimeout(time);
    }, [word])
 


    return <React.Fragment>
        <div className="home-component">
            <div>
                <Navbar />
            </div>
            <div className="container-made">
                <div className="text-wrapper">
                    <h1 className="text">
                        {word}
                    </h1>
                </div>
                <div style={{textAlign:"center"}}>
                    <div className="right-link" 
                            onClick={() => history.push('/homeworks')}>
                        <h3>HomeWork</h3>
                    </div>
                    <div className="left-link" onClick={() => history.push('/leaderboard/1')}>
                        <h3>leaderboard</h3>
                    </div>
                </div>
            </div>
        </div>
    </React.Fragment>
}

export default withRouter(Home) ;