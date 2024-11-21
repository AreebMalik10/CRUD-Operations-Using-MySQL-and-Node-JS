const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

const db= mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'',
    database: 'person',
});

db.connect((err) =>{
    if(err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database.');
});

//Routes

//CREATE: Add a new Person

app.post('/persondata', (req, res)=>{
    const { name, age, email} = req.body;
    const sql = 'Insert into persons_data (name, age, email) Values ( ?, ?, ?)';
    db.query(sql,[name, age, email], (err, result)=>{
        if(err){
            return res.status(500).send(err);

        }
        res.send({message: 'Persons Added Successfully!', result});
    })
})

//Read: Get all Persons
app.get('/persons_data', (req, res)=>{
    const sql = 'Select * from persons_data';
    db.query(sql, (err, results)=>{
        if(err){
            return res.status(500).send(err);
        }
        res.send(results);
    })
})


//Update: Update a Person's Information
app.put('/persons_data/:id', (req, res)=>{
    const {id} = req.params;
    const {name, age, email} = req.body;
    const sql = 'Update Persons_data set name=?, age=?, email=? where id=?  ';
    db.query(sql, [name, age, email, id], (err, result)=>{
        if(err){
            return res.status(500).send(err);

        }
        res.send({message:'Person Updated Successfully!'})
    })
})

//Delete: Delete a Person

app.delete('/persons_data/:id', (req, res) =>{
    const {id} = req.params;
    const sql = "Delete from Persons_data where id = ?";
    db.query(sql, [id], (err, result) =>{
        if(err){
            return res.status(500).send(err);

        }
        res.send({ message:'Person Deleted Successfully!'})
    })
})

//Start Server 
app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`);
});
