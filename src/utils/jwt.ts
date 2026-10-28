import {Types} from 'mongoose'
import jwt from 'jsonwebtoken'
import env from '../config/env.js'

const generateAccessToken = (userId:Types.ObjectId):string => {
  return jwt.sign(
    { sub: userId.toString() },
    env.jwt.accessSecret,
    { expiresIn: "15m" }
  );
}

export {
  generateAccessToken
}
