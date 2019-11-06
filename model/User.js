// id: {type: GraphQLID},
// name: { type: GraphQLString},
// age: {type: GraphQLInt},
// job: { type: GraphQLString},

const mongoose = require('mongoose')
const MSchema = mongoose.Schema;

const userSchema = new MSchema({

    name: String,
    age: Number,
    job: String,
})

module.exports = mongoose.model('User', userSchema)