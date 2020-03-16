import React,{ useContext } from "react";
import { FormContext } from "./FormContext";

export const ButtonComponent = ({callback}) => {
    const context = useContext(FormContext);

    return <div className="button">
        <button onClick={() => context.onSubmit(callback)}
            className="btn btn-primary bg-transparent">
            submit
        </button>
    </div>
}