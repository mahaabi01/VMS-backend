import { Request, Response } from "express";
import User from "../database/models/User";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

class AuthController{
  public static async registerUser(req:Request, res:Response):Promise<void>{
    const {name, email, password, phone, address, role} = req.body
    if(!name || !email || !password){
      res.status(400).json({
        message: "Please provide name, email and password"
      })
      return
    }

    await User.create({
      name,
      email,
      password : bcrypt.hashSync(password, 12),
      phone,
      address,
      role
    })

    res.status(200).json({
      message: "User registered successfully."
    })
  }

  public static async loginUser(req:Request, res:Response) : Promise<void>{
    const {email, password} = req.body
    if(!email || !password){
      res.status(400).json({
        message: "Please provide email and password."
      })
      return
    }

    //validating email and password
    const [data] = await User.findAll({
      where : {
        email: email
      }
    })
    if(!data){
      res.status(404).json({
        message : "No user with that email."
      })
      return
    }

    //check password
    const isMatched = bcrypt.compareSync(password,data.password)
    if(!isMatched){
      res.status(403).json({
        message: "Invalid password."
      })
      return
    }

    //token generation
    const token = jwt.sign({id:data.id}, process.env.SECRET_KEY as string,{
      expiresIn : "20d"
    })
    res.status(200).json({
      message: "Logged in successfully.",
      data: token
    })
  }
}

export default AuthController
