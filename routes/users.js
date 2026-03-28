const express = require('express');
const router = express.Router();

  
router.route('/').get((req, res)=>{
    res.send('User List');
}).post((req, res)=>{
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const gender = req.body.gender;
    const age = parseInt(req.body.age);
    const isValidFirstName = firstName !=="";
    const isValidLastName = lastName !=="";
    const isValidGender = gender !=="";
    const isValidAge = age !=="";
    if(isValidFirstName && isValidLastName && isValidGender && isValidAge){
        console.log(`Adding user: ${firstName} - ${lastName} - ${gender} - ${age}`);
        console.log(`Adding user: ${age}`);
        users.push({firstName, lastName, gender, age});
        res.render('users/list', {users});
    }else{
        console.log("Error adding user!");
        res.render("users/new", {firstName:firstName, lastName:lastName, gender:gender, age:age});
    }
});
router.get('/list', (req, res)=>{
res.render('users/list', {users});
});
router.get('/new', (req, res)=>{ // /users/new
    res.render('users/new', {
        firstName:"Enter first Name",
        lastName:"Enter last Name",
        gender:"Enter gender",
        age:"Enter age"
    });
});
/*
router.get('/:id', (req, res)=>{
    res.send(`getting User Data: ${req.params.id}`)
});
*/
router.route('/:id').get((req, res)=>{
    console.log(req.user);
    console.log("Getting user data!");
    res.send(`getting User Data for id: ${req.user}`);
}).delete((req, res)=>{
    res.send(`Deleting User Data for id: ${req.params.id}`);
}).put((req, res)=>{
    res.send(`Updating User Data for id: ${req.params.id}`);
});

//const users = [{name:"George"}, {name:"Justyna"}];
const users = [{ firstName: "George", lastName: "Smith", gender: "Male", age: 30 },
    {firstName: "Justyna", lastName: "Kowalski", gender: "Female", age: 25}];
        router.param("id", (req, res, next, id)=>{
    console.log("Access attmept by User:", id);
    console.log("Type of ID:", typeof id);
    console.log("Users array:", users);
    //console.log(id);
    req.user = users[id];
    next();
})
module.exports = router;