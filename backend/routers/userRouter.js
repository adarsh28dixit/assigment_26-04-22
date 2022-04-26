import express from "express";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils.js";
import { isAuth } from "../utils.js";

const userRouter = express.Router();

userRouter.post('/register', async(req,res) => {
    const user = await User.findOne({email : req.body.email});
    if(user){
        res.status(400).send({msg: err.msg})
    } else {
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
            contact: req.body.contact,
        })

        const createdUser = await newUser.save();
        res.status(200).send({
            _id : createdUser._id,
            name: createdUser.name,
            email: createdUser.email,
            contact: createdUser.contact,
            token: generateToken(createdUser)
        });
    }
})

userRouter.post('/login', async(req,res) => {
    const user = await User.findOne({email: req.body.email});
    if(!user){
        res.status(400).send({msg: "email not registered"})
    } else{
        if(bcrypt.compareSync(req.body.password, user.password)){
            res.send({
                _id : user._id,
                name: user.name,
                email: user.email,
                contact: user.contact,
                token: generateToken(user)
            });
            
        } else{
            res.status(400).send({msg: "wrong password"})
        }
    }
    
})

userRouter.get('/users', isAuth, async(req, res) => {
    User.find((err, data) => {
        if(err){
            res.status(404).send("not found")
        }else{
            res.status(200).send(data);
        }
    })
})

export default userRouter;