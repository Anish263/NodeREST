const {buildSchema}=require ('graphql');
module.exports=buildSchema(`
type Post{
    id:ID!
    title:String!
    content:String!
    image:String!
    creator:User!
    createdAt:String!
    updatedAt:String!
}

type User{
    id:ID
    name:String
    email:String!
    password:String
    status:String!
    posts:[Post!]!
}

input UserInputData{
    email:String!
    name:String!
    password:String!
}

type RootMutation{
    createUser(userInput:UserInputData):User!
}
type RootQuery{
    hello:String
}
schema{
    query:RootQuery
    mutation:RootMutation

}
`);