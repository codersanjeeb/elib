import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import userModel from "./userModel";
import bcrypt from 'bcrypt'
import { sign } from "jsonwebtoken";


const createUser = async(req: Request, res: Response, next: NextFunction) => {
    const {name, email, password} = req.body;
    //validation
    if(!name || !email || !password){
        const error = createHttpError(400, "All fields are required")
        return next(error);
    }

    //db call
    const user = await userModel.findOne({email:email});
    if(user){
        const error = createHttpError(400, "User already exist with this email.")
        return next(error);
    }

    //password-->hash
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
        name,
        email, 
        password: hashedPassword,
    })

    //token generation
    // const token = sign({sub: newUser._id}, )

    //process

    //response
    res.json({id: newUser._id})
}

export {createUser}