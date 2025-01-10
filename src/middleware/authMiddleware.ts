import { Request } from "express";

export interface AuthRequest extends Request{
  user?:{
    name : string,
    role : Role,
    email : string,
    password : string,
    phone : number,
    address : string
    id : string
  }
}

export enum Role{
  Admin = 'admin',
  Customer = 'customer'
}