import {GETDATA , USERS, SET_PAGE_SIZE , POST} 
                        from './Types' ;
import { RestDataSource } from "./REST/RestDataSource" ;
import {URLS} from './REST/URLS' ;

export const getData = (type , params) => ({
    type : GETDATA ,
    dataType : type ,
    payload : new RestDataSource(URLS[type]).getRequest(params)
    .then(res => ({
        data : res.data.doc ,
        limit : res.data.limit ,
        page : res.data.page ,
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

export const postID = (studentID , successCallback , faildCallback, type) => ({
    type : type,
    payload : new RestDataSource(URLS[type]).postRequest(studentID)
        .then(res => {
            successCallback(res.data.web_url);
            return {
                url : res.data.web_url,
                name : res.data.name
            }
        })
        .catch(err => {
            try {
                if(typeof(err.response) === "undefined" ||
                    typeof(err.response.data) === "undefined"){
                    throw(new Error(err));
                }
                faildCallback(err.response.data);
            }catch(ex){
                console.log(ex);
                faildCallback("Something Went Wrong Please Inform To One Of Your Instructors");
            }finally {
                return {
                    err
                }
            }
        })
})

export const postMethod = (data , successCallback, failedCallback) => ({
    dataType: POST,
    payload : new RestDataSource(URLS[POST]).postRequest(data)
        .then(res => {
            successCallback();
            return {
                data : data
            }
        })
        .catch(err => {
            failedCallback();
            return {
                err
            }
        })
})