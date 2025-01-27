import mongoose from "mongoose";
const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
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
    bio: {
        type: String,
      
    }
  },
  {
    timestamps: true,
  }
);
const Profile = mongoose.model('Profile', profileSchema);
export default Profile;