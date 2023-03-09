export const typeDefs = `
type Query {
  login(userData: LoginInput): LoginResponse!
  hello: String!
}

input UserInput {
  name: String!
  email: String!
  password: String!
  birthdate: String!
}

type UserResponse {
  id:Int!
  name: String!
  email: String!
  birthdate: String! 
}

input LoginInput {
  email:String!
  password:String!
}

type LoginResponse {
  token:String
  message:String
}

input DeleteUserInput {
  id: Int!
}

type DefaultUserResponse{
  message: String!
}

input UpdateUserInput{
  id: Int!
  name: String
  email: String
  birthdate: String
  password: String
}

type Mutation {
  createUser(userData: UserInput): UserResponse!
  deleteUser(userData: DeleteUserInput): DefaultUserResponse!
  updateUser(userData: UpdateUserInput): DefaultUserResponse!
}
`;
