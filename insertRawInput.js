const con = require('./msqlConnection');
const arr = require('./rawSubmissionInput');

module.exports = {
    makeSubmition : () => {
        for(item of arr.submissions){
            const stmt = `insert ignore into submitions
                    (exercise_id, grade, student_id) 
                    values(${item.exercise_id} , ${item.grade} , ${item.student_id})`;
            con.query(stmt , (err , result , field) => {
                if(err)
                    return console.log(err) ;
                console.log(result) ;
            });
        }
    },
    makeStudents : () => {
        for(item of arr.student){
            const stmt =  `insert ignore into students(student_id , first_name , last_name ,
                                email , git_url)
                    values(${Number(item.student_id)} , '${item.first_name}' , '${item.last_name}' ,
            '${item.email}' , '${item.gitlab_url}')`;
        
            con.query(stmt , (err , result , field) => {
                if(err){
                    console.log(err);
                    return res.status(500).send({msg : "error occure while selecting elements"}) ;
                }
                console.log(result) ;
            });
        }
    }
}