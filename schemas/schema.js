const graphql = require('graphql')
const _ = require('lodash')

const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLList
} = graphql

//data sources
var usersData = [
    {id: '1', age: 24, name: 'sylvio', job: 'Programmer', }, 
    {id: '2',age: 26, name: 'joao',job: 'Artist' }, 
    {id: '3',age: 21, name: 'maria',job: 'actor'},
]

var hobbyData = [
    {id: '1', title: 'Programming', description: 'Using computers for world better place', userId: '1'},
    {id: '2', title: 'Hiking', description: 'Its a health activity', userId: '1'},
    {id: '3', title: 'Swimming', description: 'Great on summers', userId: '1'},
]

var postData = [
    {id: '1', comment: 'Building Code', userId: '1'},
    {id: '2', comment: 'Climbing a mountain', userId: '1'}, 
    {id: '3', comment: 'Swimming in the ocean', userId: '2'}
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

        posts: {
            type: new GraphQLList(PostType),
            resolve(parent, args) {
                return _.filter(postData, {userId: parent.id});
            }
        },
        hobbies: {
            type: new GraphQLList(HobbyType),
            resolve(parent, args) {
                return _.filter(hobbyData, {userId: parent.id})
            }
        }
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


//Mutations 
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createUser: {
            type: UserType,
            args: {
                // id: {type: GraphQLID},
                name: {type: GraphQLString},
                age: {type: GraphQLInt},
                job: {type: GraphQLString}
            },
            resolve(parent, args) {
                let user = { 
                    name: args.name,
                    age: args.age,
                    job: args.jobb
                }
                return user
            }
        },
        createPost: {
            type: PostType,
            args: {
                // id: {type: GraphQLID},
                comment: {type: GraphQLString},
                userId: {type:GraphQLID},
            },
            resolve(parent, args) {
                let post = {
                    comment: args.comment,
                    userId: args.userId
                }
                return post
            }
        },
        createHobby: {
            type: HobbyType,
            args: {
                // id:{type: GraphQLID},
                title: {type: GraphQLString},
                description: {type: GraphQLString},
                userId: {type: GraphQLID}
            },
            resolse(parent, args){
                let hobby = {
                    title: args.title,
                    description: args.description,
                    userId: args.userId   
                }
                return hobby
            }
        }


    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})