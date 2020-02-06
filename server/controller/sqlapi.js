const con = require('../../msqlConnection') ;
const _ = require('lodash') ;

const sqlController = {
    MakeUser : (req , res) => {
        const cre = _.pick(req.body , 
            ['student_id' , 'first_name' ,'last_name' , 'email' , 'gitlab_url']) ;
        const stmt =  `insert ignore into students(student_id , first_name , last_name ,
                                email , git_url)
                values(${Number(cre.student_id)} , '${cre.first_name}' , '${cre.last_name}' ,
                            '${cre.email}' , '${cre.gitlab_url}')`;

        con.query(stmt , (err , result , field) => {
            if(err) {
                console.log(err)  ;
                return res.status(500).send({msg : "error occure while saving record"})
            }
            console.log(result) ;
            res.status(200).send({msg : "everything is okay"}) ;
        }); 
    },
    getSubmmitionScore : (req , res) => {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5 ;
        console.log(page);
        console.log(limit);

        const stmt = `select * from submitions join students where exercise_id
            between ${(page - 1) * limit} AND ${page * limit}`;
        
        con.query(stmt , (err , result , field) => {
            if(err){
                console.log(err);
                return res.status(500).send({msg : "error occure while selecting elements"}) ;
            }
            // console.log(result) ;
            let total ;
            const stmt2 = `select count(*) from submitions join students where
                exercise_id >= ${(page - 1) * limit} AND exercise_id <= ${page * limit}`;
            con.query(stmt2 , (err , result1 , field) => {
                if(err)
                    return res.status(500).send({msg : "error occure while getting total elements"}) ;
                total = result1 ;
                let d = [] ;
                console.log(total[0]['count(*)']);
                for(let item of result){
                    // console.log(item)
                    let arr = [] ;
                    for(let itr of result){
                        // console.log(item.student_id)
                        if(itr.student_id === item.student_id)
                            arr.push(itr.grade) ;
                    }
                    
                    if(!d.find(it => it.student_id === item.student_id))
                        d.push({...item ,grade : arr}) ;    

                }
                // console.log(d) ;

                const data = {
                    doc : [...d] ,
                    total : d.length,
                    page : page ,
                    limit : limit
                }

                res.status(200).send(data);

            });

            
        })
    }
}

module.exports = sqlController ;