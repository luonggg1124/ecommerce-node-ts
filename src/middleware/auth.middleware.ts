import jwt from "jsonwebtoken";
import { Request, Response } from "express";
export const authMiddleware = (req:Request, res:Response) => {
    try {
        const accessToken = "anc";
        const decode = jwt.verify(accessToken,"anc");
    } catch (error:any) {
        
    }
}