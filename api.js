const dboperations = require('./dboperations');
const user = require('./routes/User-route');
var Employees = require('./Employee');
var users = require('./model/User');
const Debugger = require('debug')('app:startup');


const express = require('express');
var app = express();
var bodyParser = require('body-parser');
var router = express.Router();
var cors = require('cors');


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);
app.use('/users', user);


router.use((request,response,next)=>{
    //console.log('middleware');
    Debugger('middleware running from debugger package');
    next();
})


//GET ALL EMPLOYEES
router.route('/Employees').get((request, response)=>{
    dboperations.getEmployees().then(result=>{
        response.json(result[0]);
    })
})

//GET EMPLOYEE BY ID
router.route('/Employees/:id').get((req,res)=>{
    dboperations.getEmployeeByID(req.params.id).then((result)=>{
        res.json(result[0]);
    })
})

router.route('/users').post((req,res)=>{

    let users = {...req.body}
    user.createUser(users).then(result=>{
        res.status(201).json(result[0]);
    })
})

//CREATE A EMPLOYEE
router.route('/Employees').post((req,res)=>{
    let employees = {...req.body}

    dboperations.createEmployee(employees).then(result => {
        res.status(201).json(result);
        //console.log(result);
    })
})

//DELETE EMPLOYEE
router.route('/Employees/:id').delete((req, res)=>{
dboperations.deleteEmployee(req.params.id).then(result => {
    res.status(201).statusMessage(`Employee with Id $(req.params.id) deleted`);
})
})


//EDIT EMPLOYEE
router.route('/Employees/:id').put((req,res)=>{
    let employees = {...req.body}
    var id = req.params.id;
    dboperations.updateEmployee(employees,id).then(result=>{
        res.status(201).json(result);
    })
})


var port = process.env.PORT || 3000;
app.listen(port);
console.log('Listing to ' + port);



/*dboperations.getEmployees().then(result => {
    console.log(result);
})*/