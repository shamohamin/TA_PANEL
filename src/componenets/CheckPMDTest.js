import React,{useState , useEffect} from 'react';
import {keyboards} from './EditorHandler';
import text from "./contents/CheckPMDTest";
import ContentEditable from 'react-contenteditable';
import "../Style/Content.css";

export const CheckPMDTest = (props) => {
    
    const [content, setContent] = useState("");

    const makeDivStyle = () => {
        
        let cont = text ;
        // let styledContent = "";
        
        let array = cont.split(/\n/);

        for(let i = 5 ; i < array.length ;i++){
            let sentence = array[i].split(/\s/);
            
            for(let j = 0 ; j < sentence.length ; j++){
                
                for(let k = 0 ; k < sentence[j].length ; k++){
                    let flag = false ;
                    if(sentence[j].charAt(k) === "\""){
                        let green = "<font>";
                        for(let word = j ; word < sentence.length ; word++){
                            for(let letter = 0 ; letter < sentence[word].length ; letter++){
                                if(sentence[word].charAt(letter) === "\""){
                                    flag = true ;
                                    break;
                                }
                                
                            }
                            green += sentence[word] ;
                            if(flag){
                                green += "</font>" ;
                                sentence[j] = green ; 
                                break;
                            }
                            
                        }
                    }
                    if(flag)
                        break;
                }
                
                if(sentence[j] === ""){
                    sentence[j] = `&nbsp;`;
                    continue;
                }
                
                if(sentence[j] === "@Test"){
                    sentence[j] = `<font style='color:'yellow''>${sentence[j]}</font>`;
                    continue ;
                }
                
                // console.log(sentence);
                let style = sentence[j];
                if(keyboards.includes(style)){
                    style = `<span>${style}</span>`;
                    sentence[j] = style;
                }
            }
            array[i] = sentence.join(" ");
        }
        
        

        
        // console.log(array);
        array.join("<br/>")
        setContent(array.join("<br/>"));
    }

    useEffect(() => {
        makeDivStyle();
    }, [])



    return <div className="content">
        <ContentEditable html={content} />
    </div>
}