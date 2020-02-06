const con = require('../../msqlConnection') ;

module.exports = () => { 

    const stmt = `create table if not exists students(
        student_id int(7) primary key ,
        email varchar(100) NOT NULL ,
        first_name varchar(100) NOT NULL ,
        last_name varchar(100) NOT NULL ,
        git_url varchar(100)
    )`;

    const stmt2 = `create table if not exists submitions(
        submission_id int auto_increment primary key ,
        exercise_id int not null ,
        grade double default 0 ,
        submition_time timestamp default
            CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        student_id int not null ,
        foreign key(student_id) references students(student_id)
    )`;

    const stmt3 = `create table if not exists exercise_url (
        exercise_id int primary key, 
        starter_url varchar(150)
    )`;

    const queryArr = [stmt , stmt2 , stmt3] ;
    for(q of queryArr){
        con.query(q , (err , result , fileds) => {
            if(err) 
                return console.log(err) ;
            console.log(result) ;
        });
    }
}