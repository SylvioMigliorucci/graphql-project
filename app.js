const express = require('express')
const graphqlHTTP = require('express-graphql')
const mongoose = require('mongoose')
const assert = require('assert')




const schema = require('./schemas/schema')
const app = express();

app.listen(4000, () => {
    console.log('Listening for requests on my awesome port 4000')
})

app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema: schema
}))