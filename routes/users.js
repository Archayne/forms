const express = require('express');
const router = express.Router();

  
router.get('/', (req, res)=>{
res.send('User List');
});

router.get('/new', (req, res)=>{ // /users/
res.send('User New Form');
});
router.get('/:id', (req, res)=>{
    res.send(`getting User Data: ${req.params.id}`)
});
module.exports = router;