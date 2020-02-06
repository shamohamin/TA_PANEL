import {GETDATA , USERS, SET_PAGE_SIZE} from './Types' ;
import { RestDataSource } from "./REST/RestDataSource";
import {URLS} from './REST/URLS' ;

export const getData = (type , params) => ({
    type : GETDATA ,
    dataType : type ,
    payload : new RestDataSource(URLS[type]).getRequest(params)
    .then(res => ({
        data : res.data.doc ,
        limit : res.data.limit ,
        page : res.data.res ,
        params ,
        total : res.data.total ,
        isLoading : false ,
    })) 
    .catch(err => ({
        err   
    }))
}) 

export const setPageSize = (newSize) => ({
    type : SET_PAGE_SIZE ,
    payload : newSize ,
    dataType : USERS
})