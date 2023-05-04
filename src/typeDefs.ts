export const typeDefs = `
interface CommonResponse {
  message: String!
  code: String
}

type Query {
  hello: String!
}

type Response implements CommonResponse {
  message: String!
  code: String
}

input UserInput {
  name: String!
  email: String!
  password: String!
  birthdate: String!
}

type User {
  id:Int
  name: String
  email: String
  birthdate: String
  role: Int
}

type UserResponse implements CommonResponse {
  message: String!
  code: String!
  user: User
}

input LoginInput {
  email:String!
  password:String!
}

type UserLoginData {
  id: Int
  name: String
  email: String
  birthdate: String
}

type LoginData {
  token:String
  user: UserLoginData
}

type LoginResponse implements CommonResponse {
  message: String!
  code: String!
  loginData: LoginData
}

input DeleteUserInput {
  id: Int!
}

input UpdateUserInput{
  id: Int!
  name: String
  email: String
  birthdate: String
  password: String
}

input UpsertUserInput{
  id: Int!
  name: String!
  email: String!
  birthdate: String!
  password: String!
}

type Mutation {
  createUser(userData: UserInput): UserResponse!
  deleteUser(userData: DeleteUserInput): Response!
  updateUser(userData: UpdateUserInput): Response!
  login(userData: LoginInput): LoginResponse!
  upsertUser(userData: UpsertUserInput): Response!
}
`;
