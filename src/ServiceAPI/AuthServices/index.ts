import bcrypt from "bcrypt";
import { findEmail } from "../User/index";
import prisma from "../config/PrismaClient";



// logic create new user
export const createUser = async (
  name: string,
  email: string,
  password: string,
  role: string
) => {
  try {
    const findUser = await findEmail(email);
    // check if email allready used
    if (findUser) {
      throw new Error("Account already used");
    }
    // user input role or default
    const userRole = role || "customer";

    // hashing password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const createUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword,
        role: userRole,
      },
    });
    return createUser;
  } catch (error) {
    throw new Error(`message ${error}`);
  }
};


export const getUserData = async (role: string) => {
  try {
    const getUser = await prisma.user.findFirst({
      where: {
        role,
      },
    });
    const userRole = getUser?.role ? "admin" : "user";
    return userRole;
  } catch (error) {
    throw new Error(`message ${error}`);
  }
};
