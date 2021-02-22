import { gql } from "apollo-server-express";

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    dateCreated: String!
    email: String!
    authToken: String!
  }
  type GetUser {
    id: ID!
    username: String!
    dateCreated: String!
    email: String!
  }
  type Post {
    id: ID!
    username: String!
    content: String!
    selectedFile: String
    dateCreated: String!
    comments: [Comment]!
    postLikes: [PostLike]!
    postLikeCount: Int
    commentCount: Int
    commentLikes: [CommentLike]!
    commentLikeCount: Int
  }
  type Comment {
    id: ID!
    dateCreated: String!
    username: String!
    content: String!
  }
  type PostLike {
    id: ID!
    username: String!
    dateCreated: String!
  }
  type CommentLike {
    id: ID!
    username: String!
    dateCreated: String!
  }
  type Query {
    getUsers: [GetUser]
    getUser(userId: ID!): GetUser
    getPosts: [Post]
    getPost(postId: ID!): Post
  }
  type Mutation {
    login(username: String!, password: String!): User!
    createUser(username: String!, password: String!, email: String!): User!
    createPost(selectedFile: String, content: String!): Post!
    deletePost(postId: ID!): String!
    updatePost(postId: ID!, selectedFile: String, content: String!): Post!
    createComment(postId: String!, content: String!): Post!
    updateComment(postId: String!, content: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!
    likePost(postId: ID!): Post!
    likeComment(commentID: ID!): Comment!
  }
`;

export default typeDefs;
