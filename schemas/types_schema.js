const graphql = require('graphql');

const { 
    GraphQLObjectType,
} = graphql


//Scalar Type


//RootQuery
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    description: 'Description',
    fields: {

    }
})