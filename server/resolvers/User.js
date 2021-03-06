import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/auth.js";

const userResolvers = {
  Query: {
    // Get all users

    getUsers: async () => {
      try {
        return await User.find().sort({ dateCreated: -1 });
      } catch (err) {
        throw err;
      }
    },

    // Get user by ID

    getUser: async (_, { userId }) => {
      try {
        return await User.findById(userId);
      } catch (err) {
        throw err;
      }
    },
  },
  Mutation: {
    // Sign up user

    createUser: async (_, { username, password, email }) => {
      try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
          throw new Error("Username already exists.");
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({
          username,
          password: hashedPassword,
          email,
          dateCreated: new Date().toISOString(),
        });

        const result = await user.save();
        const authToken = generateToken(result);
        return {
          ...result._doc,
          id: result._id,
          authToken,
        };
      } catch (err) {
        throw err;
      }
    },

    // Sign in user

    login: async (_, { username, password }) => {
      const user = await User.findOne({ username });
      if (!user) {
        throw new Error("User not found!");
      }

      const checkPassword = await bcrypt.compare(password, user.password);
      if (!checkPassword) {
        throw new Error("Incorrect login information!");
      }

      const authToken = generateToken(user);
      return {
        ...user._doc,
        id: user._id,
        authToken,
      };
    },
  },

  // Count number of followers/following based on stored data

  User: {
    followerCount: (parent) => parent.followers.length,
    followingCount: (parent) => parent.following.length,
  },
};

export default userResolvers;
