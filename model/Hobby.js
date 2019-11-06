// id: {type: GraphQLID},
// name: { type: GraphQLString},
// age: {type: GraphQLInt},
// job: { type: GraphQLString},

const mongoose = require('mongoose')
const MSchema = mongoose.Schema;

const hobbySchema = new MSchema({
    title: String,
    description: String,
    userId: String,
})

module.exports = mongoose.model('Hobby', hobbySchema)