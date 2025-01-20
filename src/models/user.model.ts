import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    given_name: {
      type: String,
    },
    family_name: {
      type: String,
    },
    city: {
      type: String,
    },
    district: {
      type: String,
    },
    commune: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["ADMIN", "USER"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["ACTIVE", "INACTIVE"],
    },
    password: {
      type: String,
      required: true,
      min: 8,
    },
    avatar: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Image",
    },
    phone: {
      type: String,

      min: 10,
      max: 11,
    },
    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    profile: profileSchema,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
