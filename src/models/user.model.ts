import mongoose,{Document,Schema,model}  from "mongoose";
import bcrypt from "bcryptjs";
import mongoosePaginate from "mongoose-paginate-v2";

interface IUser extends Document{
  _id:string;
  name: string;
  role: "ADMIN" | "USER";
  email: string;
  status: "ACTIVE" | "INACTIVE";
  password: string;
  avatar: string;
  phone:string;
  wishlist: mongoose.Types.ObjectId[];
  checkPassword(password:string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
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
      type: String,
      
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
   
  },
  {
    timestamps: true,
  }
);
userSchema.plugin(mongoosePaginate);
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(15);
    this.password = await bcrypt.hash(this.password,salt).toString();
    next();
  } catch (error: any) {
    next(error);
  }
});
userSchema.methods.checkPassword = async function (password:string){
  return bcrypt.compare(password,this.password as string);
}
const User = model<IUser,mongoose.PaginateModel<IUser>>("User", userSchema);

export default User;
