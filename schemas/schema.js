const graphql = require('graphql')
const _ = require('lodash')

const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt
} = graphql

//data sources
var usersData = [
    {id: '1', age: 24, name: 'sylvio', job: 'Programmer', }, 
    {id: '325',age: 26, name: 'joao',job: 'Artist' }, 
    {id: '326',age: 21, name: 'maria',job: 'actor'},
]

var hobbyData = [
    {id: '1', title: 'Programming', description: 'Using computers for world better place', userId: '1'},
    {id: '2', title: 'Hiking', description: 'Its a health activity', userId: '1'},
    {id: '3', title: 'Swimming', description: 'Great on summers', userId: '1'},
]

var postData = [
    {id: '1', comment: 'Building Code', userId: '1'},
    {id: '2', comment: 'Climbing a mountain', userId: '1'},
    {id: '3', comment: 'Swimming in the ocean', userId: '1'}
]

//Create types
const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'Documentation for user...',
    fields: () => ({
        id: {type: GraphQLID},
        name: { type: GraphQLString},
        age: {type: GraphQLInt},
        job: { type: GraphQLString},
    })
})

const HobbyType = new GraphQLObjectType({
    name: 'Hobby',
    description: 'A User can have so many hobbies',
    fields: () => ({
        id: {type: GraphQLID},
        title: {type: GraphQLString},
        description: {type: GraphQLString},
        user: { 
            type: UserType,
            resolve(parent, args) {
                return _.find(usersData, {id: parent.userId})
            }
        }
    })
})

const PostType = new GraphQLObjectType({
    name: 'Post',
    description: 'A Post for users see my hobbies ',
    fields: () => ({
        id: {type: GraphQLID},
        comment: {type: GraphQLString},
        user: {
            type: UserType,
            resolve(parent, args) {
                return _.find(usersData, {id: parent.userId})
            }
        }
    })
})

//Root Query - allows us to start going through the query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    description: 'Description',
    fields: {
       User: {
           type: UserType,
           args: { id: { type: GraphQLID} },

           resolve(parent, args) {
               //here is where we resolve data
               // where get and return data from datasource
               
               return _.find(usersData, { id: args.id})
           }
       },
       Hobby: {
           type: HobbyType,
           args: {id: { type:GraphQLID}},
           resolve(parent, args){
               return _.find(hobbyData, {id: args.id})
           }
       },
       Post: {
           type: PostType,
           args: {id: {type: GraphQLID}},
           resolve(parent, args){
                return  _.find(postData, {id: args.id})
           }
       }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
})