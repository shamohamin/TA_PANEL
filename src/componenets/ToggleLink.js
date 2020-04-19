import React from 'react' 
import {Route, Link } from 'react-router-dom'


export const ToggleLink = ({to , exact , name}) => {
    return <Route path={to} exact={exact}  children={routeProps => {
        const baseclass = "nav-link text-secondary" ;
        const activeclass = "text-warning" ;
        const combineClass = `${baseclass} ${routeProps.match ? activeclass : ""}` ;

        return <Link to={to} exact={exact.toString()} className={combineClass} replace>
            {name}
        </Link>
    }} />
}