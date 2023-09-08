

const express = require('express')
const bcrypt = require('bcrypt')
const { UserModel } = require('../model/UserModel')
const UserRouter = express.Router()
const jwt = require('jsonwebtoken')



UserRouter.get("/", async (req, res) => {

    try {
        const data = await UserModel.find()
        res.send(data)
    } catch (err) {
        res.send({ "msg": "Something went wrong ! unable to get users", "err": err.message })
    }
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
                    }, 'jitendra', { expiresIn: '1h' });


                    console.log("initial token", token)

                    // let reftoken = jwt.sign({
                    //     UserId: userData._id
                    // }, 'akshay', { expiresIn: '5m' });

                    // console.log("refresh token", reftoken)

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


UserRouter.patch("/:id", async (req, res) => {
    const id = req.params.id
    const { name, password, mobile } = req.body

    try {

        bcrypt.hash(password, 8, async function (err, hash) {
            if (hash) {
                console.log(hash)
                let newData = await UserModel.findByIdAndUpdate({ _id: id }, { name: name, mobile: mobile, password: hash })


                res.send({ "msg": "User Data Updated Successfully" })
            } else {
                res.send({ "msg": "Unable to hash password" })
            }
        });


    } catch (err) {
        res.send({ "msg": "Something went wrong ! User unable to update data ", "err": err.message })
    }
})




UserRouter.delete("/:id", async (req, res) => {
    const id = req.params.id
    try {
        await UserModel.findByIdAndDelete({ _id: id })
        res.send({ "msg": "User Deleted Successfully" })
    } catch (err) {

        res.send({ "msg": "Something went wrong ! User unable to delete data ", "err": err.message })
    }
})




module.exports = {
    UserRouter
}
