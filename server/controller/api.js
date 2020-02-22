const UserModel = require('../dataShema/User') ;
const _ = require('lodash') ;

const controller = {
    just_for_test : (req , res) => {
        const credential = _.pick(req.body , ['studentId'])
        console.log(credential.studentId)
        res.status(200).send({msg : 'register'})
    },
    makeUser : (req , res) => {

        const credential = _.pick(req.body , 
                    ['first_name' , 'last_name' , 'id']) ;

        const user = new UserModel({
            first_name : credential.first_name ,
            last_name : credential.last_name ,
            id : credential.id});

        user.saveUser(res) ;
    },
    getUser : (req , res) => {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5 ;

        const myCustomLabels = {
            totalDocs: 'itemCount',
            docs: 'itemsList',
            limit: 'perPage',
            page: 'currentPage',
            nextPage: 'next',
            prevPage: 'prev',
            totalPages: 'pageCount',
            pagingCounter: 'slNo',
            meta: 'paginator'
        };

        const option = {
            page , limit , myCustomLabels 
        };

        UserModel.paginate({} , option , (err , users) => {
            if(err) console.log(err) , res.status(500).send(err)
            else {

                const user = {
                    doc : [...users.docs],
                    limit : users.limit ,
                    page : users.page ,
                    total : users.total 
                };

                res.status(200).send(user)
            }
        })

    }
}


module.exports = controller ;