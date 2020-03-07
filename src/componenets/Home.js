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

    const linkTo = () => history.push('/homeworks')
    
    useEffect(() => {
        updateWord();
    }, []);

    useEffect(() => {
        if(word.length === 4){
            console.log("hello");
            setTimeout(() =>{
                setWord(() => "") 
                updateWord()
            }, 2000) ;
        }
    }, [word])
 
    return <React.Fragment>
        <div className="home-component">
            <div>
                <Navbar />
            </div>
            <div className="container-made">
                <div className="text-wrapper">
                    <h1 className="text" onClick={() => linkTo()}>
                        {word}
                    </h1>
                </div>
            </div>
        </div>
    </React.Fragment>
}

export default withRouter(Home) ;