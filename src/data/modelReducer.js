import { GETDATA , SET_PAGE_SIZE, HOMEWORKPOSTID, POST, PROJECTPOSTID } from "./Types";

export const modelReducer = (store , action) => {
    switch(action.type){
        case SET_PAGE_SIZE:
            return {
                ...store , [`${action.dataType}_limit`] : action.payload
            }
        case GETDATA :
            return {
                ...store , 
                [action.dataType] : action.payload.data ,
                [`${action.dataType}_loading`] : action.payload.isLoading ,
                [`${action.dataType}_total`] : action.payload.total ,
                [`${action.dataType}_params`] : action.payload.params ,
                [`${action.dataType}_limit`] : action.payload.limit
            }
        case PROJECTPOSTID:
        case HOMEWORKPOSTID:
            return {
                ...store ,
                web_url : action.payload.web_url,
                name : action.payload.name
            }
        case POST:
            return {
                ...store ,
                data : action.payload.data
            }
        default:
            return store || {}
    }
}
