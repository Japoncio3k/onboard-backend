export const typeDefs = `
interface CommonResponse {
  message: String
  code: String
}

enum UpsertUserActions {
  Create
  Update
}

type Query {
  hello: String!
}

type Response implements CommonResponse {
  message: String
  code: String
}

input UserInput {
  name: String!
  email: String!
  password: String!
  birthdate: String!
}

type UserData {
  name: String!
  email: String!
  birthdate: String!
  role: String!
}

type User {
  id:Int
  userData: UserData
}

type UserResponse implements CommonResponse {
  message: String
  code: String
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
  message: String
  code: String
  loginData: LoginData
}

input DeleteUserInput {
  id: Int!
}

input UpdateUserInput{
  id: Int!
  userData: UserInput
}

input UpsertUserInput{
  id: Int!
  userData: UserInput
}

type UpsertUserResponse implements CommonResponse {
  message: String
  code: String
  data: User
  action: UpsertUserActions
}

type Mutation {
  createUser(userData: UserInput): UserResponse
  deleteUser(userData: DeleteUserInput): Response
  updateUser(userData: UpdateUserInput): Response
  login(userData: LoginInput): LoginResponse
  upsertUser(userData: UpsertUserInput): UpsertUserResponse
}
`;
