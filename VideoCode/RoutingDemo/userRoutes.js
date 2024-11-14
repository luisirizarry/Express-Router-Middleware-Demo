const express = require('express');
const router = new express.Router();

const USERS = [
    {   id: 1, 
        username: "HUMMINGBIRD123" },
    {   id: 2, 
        username: "IMBIGBIRD"
     }
];

router.get('/', function(req, res){
    return res.json({ users: USERS })
})

router.get('/:id', function(req, res){
    const user = USERS.find(u => u.id === +req.params.id)
    return res.json({ users: user })
})

module.exports = router;