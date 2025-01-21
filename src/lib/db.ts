import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        if(process?.env.DB_URI){
            const connect = await mongoose.connect(process.env.DB_URI);
            console.log(`MongoDB connected : ${connect.connection.host}`);
        }else{
            throw new Error("Could not connect to database");
        }
        
    } catch (error) {
        console.log("Error connecting to MongoDB");
        process.exit(1);
    }
}