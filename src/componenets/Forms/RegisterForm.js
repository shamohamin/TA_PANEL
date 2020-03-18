import React from 'react';
import {FormContext} from './FormContext';
import {Validate} from '../Validators/validator';
import '../../Style/Form.css';


export class RegisterForm extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            errors : {},
            isSubmited : false,
            submitedError : "",
            context : {
                showErrors : this.showErrors,
                onSubmit : this.onSubmit
            },
            dirty : {}
        }
    }

    showErrors = (field) => (this.state.errors[field] && this.state.dirty[field]) ? 
                        this.state.errors[field] || [] : [] ;

    get emptyErrors(){
        let ok = true ;
        Object.keys(this.state.errors).forEach(key => {
            if(this.state.errors[key].length !== 0){
                ok = false ;
            }
        });
        return ok ;
    }

    static getDerivedStateFromProps(props){
        return {
            errors: Validate(props.rules, props.data),
            dirty : props.dirty
        }
    }


    onSubmit = (callback) => {
        if(this.emptyErrors){
            console.log("submited");
            this.setState({isSubmited : true});
        }else{
            callback("submition wasn't successfull");
        }
    }

    render(){
        console.log(this.state.dirty)
        return <React.Fragment>
            <FormContext.Provider value={this.state.context}>
                {this.props.children}
            </FormContext.Provider>
        </React.Fragment>
    }

}