

const express = require('express')
const bcrypt = require('bcrypt')
const { UserModel } = require('../model/UserModel')
const UserRouter = express.Router()
const jwt = require('jsonwebtoken')
UserRouter.get("/", (req, res) => {
    res.send('welcome to userRouter')
})


UserRouter.post("/register", async (req, res) => {
    let { name, email, mobile, password } = req.body

    try {


        bcrypt.hash(password, 8, async function (err, hash) {
            if (hash) {
                let newData = new UserModel({ name, email, mobile, password: hash })
                await newData.save()

                res.send({ "msg": "User Registred Successfully" })
            } else {
                res.send({ "msg": "Unable to hash password" })
            }
        });


    } catch (err) {
        res.send({ "msg": "Something went wrong ! User unable to Registred ", "err": err.message })
    }
})


UserRouter.post("/login", async (req, res) => {
    let { email, password } = req.body

    try {
        let userData = await UserModel.findOne({ email: email })
        console.log(userData)
        if (userData) {
            bcrypt.compare(password, userData.password, function (err, result) {
                if (result) {
                    let token = jwt.sign({
                        UserId: userData._id
                    }, 'jitendra', { expiresIn: '1m' });


                    console.log("initial token", token)

                    let reftoken = jwt.sign({
                        UserId: userData._id
                    }, 'akshay', { expiresIn: '2m' });

                    console.log("refresh token", reftoken)

                    res.send({ "msg": "User Login Successfully", "token": token })
                } else {
                    res.send({ "msg": "unable to generate token" })
                }
            });
        } else {
            res.send({ "msg": "unable get UserData please enter valid credentials" })
        }
    } catch (err) {
        res.send({ "msg": "Something went wrong ! User unable to Login ", "err": err.message })
    }
})


// UserRouter.get("/login", async (req, res) => {
//     try { } catch (err) { }
// })
module.exports = {
    UserRouter
}
