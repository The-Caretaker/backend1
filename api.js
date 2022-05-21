const express = require("express");
const router = express.Router();
const userAcc = require("./model/user")

router.get("/users", (req, res)=>{
    res.send({method: "GET"});
});
router.post("/users", (req, res)=>{
    userAcc.create(req.body)
        .then(user => {
            res.send(user);
        })
});
router.put("/users/:id", (req, res)=>{
    res.send({method: "PUT"});
});
router.delete("/users/:id", (req, res)=>{
    res.send({method: "DELETE"});
});
module.exports = router;