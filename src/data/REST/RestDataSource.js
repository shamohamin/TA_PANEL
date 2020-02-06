import Axios from 'axios' 

export class RestDataSource {
    constructor(url){
        this.URL = url ;
    }

    getRequest = (params) => 
                    this.sendRequest("GET" , this.URL , params) 

    sendRequest = (method , url , params , data ) => 
                    Axios.request({method , url , params , data})

}