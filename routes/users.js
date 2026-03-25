const express = require('express');
const router = express.Router();

  
router.route('/').get((req, res)=>{
    res.send('User List');
}).post((req, res)=>{
    const firstName = req.body.firstName;
    const isValid = firstName !=="";
    if(isValid){
        console.log(`Adding user: ${firstName}`);
        users.push({firstName});
        res.render('users/list', {users});
    }else{
        console.log("Error adding user!");
        res.render("users/new", {firstName:firstName});
    }
});
router.get('/list', (req, res)=>{
res.render('users/list', {users});
});
router.get('/new', (req, res)=>{ // /users/new
res.render('users/new', {firstName:"Test"});
});
/*
router.get('/:id', (req, res)=>{
    res.send(`getting User Data: ${req.params.id}`)
});
*/
router.route('/:id').get((req, res)=>{
    console.log(req.user);
    console.log("Gettingg user data!");
    res.send(`getting User Data for id: ${req.user}`);
}).delete((req, res)=>{
    res.send(`Deleting User Data for id: ${req.params.id}`);
}).put((req, res)=>{
    res.send(`Updating User Data for id: ${req.params.id}`);
});

const users = [{name:"George"}, {name:"Justyna"}];
router.param("id", (req, res, next, id)=>{
    console.log("Access attmept by User:", id);
    req.user = users[id];
    next();
})
module.exports = router;