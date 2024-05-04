import { createUser } from "@/ServiceAPI/AuthServices";
import { findEmail } from "@/ServiceAPI/User";
import { NextApiRequest, NextApiResponse } from "next";

export default async function register(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "POST") {
      res.status(500).json({ message: "Error method" });
    }
    const { name, email, password, role } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ message: "Please input all field" });

    const findUser = await findEmail(email);
    if (findUser) {
      return res.status(401).json({ message: "Account is allready" });
    }

    const newUser = await createUser(name, email, password, role);

    res.status(201).json({ message: "Enpoint Register", data: newUser });
  } catch (error) {
    res.status(500).json({ message: "Network error" });
  }
}
