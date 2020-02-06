const mongoose = require('mongoose') ;
const mongoosePaginate = require('mongoose-paginate') ;

const UserShema = new mongoose.Schema({
    firstName : {type : String , required : true},
    lastName : {type : String , required : true},
    id : {type : String , required : true }
});

UserShema.plugin(mongoosePaginate) ;

UserShema.methods.saveUser = function(res){
    
    this.save((err , data) => {
        if(err)
            console.log(err) , res.status(500).send({msg : "faild to save data!!!!"});
        else
            console.log(data) , res.status(200).send({msg : "everything is okay!!!!"});
    })
};

const userModel = mongoose.model('Users' , UserShema) ;

module.exports = userModel ;