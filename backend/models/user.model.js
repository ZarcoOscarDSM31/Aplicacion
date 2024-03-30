import mongoose from "mongoose";

const UserDetailSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    userType: String,
  },
  {
    collection: "users",
    timestamps: true,
  }
);

const UserInfo = mongoose.model("UserInfo", UserDetailSchema);

export default UserInfo;
