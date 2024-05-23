const mongoose = require('mongoose')
require('dotenv').config()


const connection = mongoose.connect("mongodb+srv://jitendra:jitendrakumarghadei@cluster0.e4vb2oc.mongodb.net/placement2o?retryWrites=true&w=majority")






module.exports = {
    connection
}