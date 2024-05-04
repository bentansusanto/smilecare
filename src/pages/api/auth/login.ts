import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/ServiceAPI/config/PrismaClient";
import bcrypt from 'bcrypt'

import cookie from 'cookie'
import { generateAccessToken, generateRefreshToken } from "@/ServiceAPI/middlewares/AuthToken";

export default async function register(req:NextApiRequest, res:NextApiResponse) {
    try {
        if(req.method !== 'POST'){
            res.status(500).json({message: "Error method"})
        }
        const {email, password } = req.body;

        if (!email || !password)
            return res.status(400).json({ message: "Please input all field" });
      
          const user = await prisma.user.findUnique({
            where: {
                email
            }
          })
      
          if (!user) {
            return res.status(404).json({ message: 'User not found' });
          }
      
          // Verify password
          const validPassword = await bcrypt.compare(password, user.password);
      
          if (!validPassword) {
            return res.status(401).json({ message: 'Invalid password' });
          }
      
          const accessToken = generateAccessToken(user.id, user.role)
          const refreshToken = generateRefreshToken(user.id, user.role)
      
          const payload = {
            id: user?.id,
            name: user?.name,
            email: user?.email,
            role: user?.role,
          };
    
          res.setHeader('Set-Cookie', cookie.serialize('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
          }));

          res.setHeader('Set-Cookie', cookie.serialize('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
          }));
      
          return res.status(200).json({ message: "Login Successfully", data: payload });

    } catch (error) {
        res.status(500).json({message: "Network error"})
    }
}