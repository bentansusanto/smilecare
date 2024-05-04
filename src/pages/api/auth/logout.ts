import { NextApiRequest, NextApiResponse } from "next";
import cookie from 'cookie';



export default async function logout(req:NextApiRequest, res:NextApiResponse) {
    try {
        if(req.method !== "POST"){
            res.status(500).json({message: "Error method"})
        }
        res.setHeader('Set-Cookie', [
            cookie.serialize('accessToken', '', {
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'strict',
              expires: new Date(0),
            }),
            cookie.serialize('refreshToken', '', {
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'strict',
              expires: new Date(0),
            })
          ]);

  res.status(200).json({ message: 'Logout Successfully' });
    } catch (error) {
        res.status(500).json({message: "Network Error"})
    }
}