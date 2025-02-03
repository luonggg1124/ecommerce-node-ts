import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import User from "../models/user.model";
export const authMiddleware = async (req:Request, res:Response) => {
    try {
        const accessToken = req.headers.authorization?.split(' ')[1] as string;
        if(!accessToken){
            res.status(401).json({
                message: "Not authorized, no token found"
            });
        }
        try {
            const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET || '');
            // const user = await User.findById(decoded.user).select("-password");
        } catch (error:any) {
            
        }
        
    } catch (error:any) {
        
    }
}