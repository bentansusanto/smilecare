import { generateAccessToken } from "@/ServiceAPI/middlewares/AuthToken";
import { NextApiRequest, NextApiResponse } from "next";
import cookie from 'cookie';
import jwt from 'jsonwebtoken';
import prisma from "@/ServiceAPI/config/PrismaClient";

export default async function verifyUser(req:NextApiRequest, res:NextApiResponse, next:()=>void) {
    const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;

  if (!accessToken && !refreshToken) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const secret = process.env.SECRET_KEY ?? '';
  const refresh_secret = process.env.REFRESH_SECRET_KEY ?? '';

  try {
    if (refreshToken) { // Periksa apakah refreshToken tersedia
      // Verifikasi refreshToken
      jwt.verify(refreshToken, refresh_secret, async (refreshTokenErr: any, refreshTokenData: any) => {
        if (refreshTokenErr) {
          console.error('Error verifying refreshToken:', refreshTokenErr);
          return res.status(403).json({ message: 'Invalid refreshToken' });
        }

        try {
          // Temukan user berdasarkan _id yang ada di refreshToken menggunakan Prisma
          const userRecord = await prisma.user.findUnique({
            where: { id: refreshTokenData.id },
          });

          if (!userRecord) {
            console.error('User not found for refreshToken:', refreshTokenData);
            return res.status(403).json({ message: 'User not found' });
          }

          // Generate accessToken baru
          const newAccessToken = jwt.sign(
            { id: userRecord.id, email: userRecord.email },
            refresh_secret,
            { expiresIn: process.env.REFRESH_TOKEN ?? '1d' } // Sesuaikan dengan preferensi Anda
          );

          // Simpan accessToken baru dalam cookies
          res.setHeader('Set-Cookie', cookie.serialize('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
          }));
            
          // Hapus properti "password" sebelum mengirimkan respons
          const { password, ...userWithoutPassword } = userRecord;
          req.user = userWithoutPassword; // Menyimpan user ke dalam req.user
          next();
        } catch (error) {
          console.error('Error updating accessToken:', error);
          return res.status(500).json({ message: 'Internal Server Error' });
        }
      });
    } else { // Jika refreshToken tidak tersedia
      return res.status(401).json({ message: 'Unauthorized' });
    }
  } catch (error) {
    console.error('Error verifying token:', error);
    res.status(400).json({ message: 'Token tidak valid' });
  }
}