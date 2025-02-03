
import { Request, Response } from "express";
import {redis} from "../lib/redis";
import User from "../models/user.model";
import jwt from "jsonwebtoken";
import { randomNumberString } from "../utils/number";
import sendVerificationCode from "../mail/auth/auth-code";

const storeRefreshToken = async (userId:string|number, refreshToken:string) => {
    await redis.set(
        `refreshToken:${userId}`,
        refreshToken,
        "EX",
        7 * 24 * 60 * 60
    );
}
const generateTokens = (userId:string|number) => {
    const accessToken = jwt.sign({userId},process.env.ACCESS_TOKEN_SECRET || '',{
        expiresIn: '15m'
    });
    const refreshToken = jwt.sign({userId}, process.env.REFRESH_TOKEN_SECRET || '',{
        expiresIn: '7d'
    });
    return {accessToken, refreshToken};
}
const setCookies = (res:Response, accessToken:string, refreshToken:string) => {
    res.cookie("accessToken",accessToken,{
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 15 * 60 * 1000
    });
    res.cookie("refreshToken",refreshToken,{
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge:  7 * 24 * 60 * 60 * 1000
    });
}

export const sendCode = async (req:Request, res:Response) => {
    try {
        const code = randomNumberString(6);
        const {email} = req.body;
        if(!email){
            res.status(400).json({
                message: "Email is required"
            });
            return;
        }
        redis.set(
            `verificationCode:${email}`,
            code,
            "EX",
            60*5
        );
        sendVerificationCode(code,email);
        res.json({
            message: "Verification code was sent to your email."
        });
        return;
    } catch (error:any) {
        res.status(500).json({
            message: "Error sending verification code",
            error: error?.message
        });
        return;
    }
}

export const signup = async (req:Request, res: Response) => {
    const {email, password, name} = req.body;

}

export const login = async (req:Request, res: Response) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            res.status(404).json({
                message: "User not found"
            });
            return;
        }
        if(!(await user.checkPassword(password))){
            res.status(400).json({
                message: "Password is incorrect"
            });
        }
        const {accessToken, refreshToken} = generateTokens(user._id);
            await storeRefreshToken(user._id, refreshToken);
            setCookies(res, accessToken, refreshToken);
            res.json({
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    status: user.status,
                    avatar:user.avatar,
                    phone: user.phone
                }
            });
    } catch (error:any) {
        res.status(500).json({
            message: "Error in login controller",
            error: error?.message
        });
    }
}

export const logout = (req:Request, res:Response) => {

}