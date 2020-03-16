import React from "react";


export const FormContext = React.createContext({
    showErrors : (field) => [],
    onSubmit : () => false
});