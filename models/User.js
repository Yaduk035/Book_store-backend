const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    roles: {
      User: {
        type: Number,
        default: 2000,
      },
      Editor: Number,
      Admin: Number,
    },
    password: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    refreshToken: String,
  },
  { timestamps: true } // This option automatically manages createdAt and updatedAt fields
);

const User = mongoose.model("User", userSchema);
module.exports = User;