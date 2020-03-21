import Axios from 'axios' 

export class RestDataSource {
    constructor(url){
        this.URL = url ;
        this.auth = {
            user : 'MohAminShafiee',
            pass : 'MohAminShafiee'
        }
        this.header = {
            "Authorization" : 'Basic TW9oQW1pblNoYWZpZWU6TW9oQW1pblNoYWZpZWU=',
            "Content-Type": "application/json"
        }
    }

    getRequest = (params) => 
                    this.sendRequest("GET" , this.URL , params) 

    postRequest = (data) => 
                    this.sendRequest("POST" , this.URL , {} , data)
    
    sendRequest = (method , url , params , data ) => 
                    Axios.request({method , url , params , data , headers : this.header})

}