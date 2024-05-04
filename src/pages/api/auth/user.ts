import { getUserData } from "@/ServiceAPI/AuthServices";
import { NextApiRequest, NextApiResponse } from "next";
import verifyUser from "./Authorization";

declare module "next" {
  export interface NextApiRequest {
    user?: any;
  }
}

export default async function getUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "GET") {
      res.status(500).json({ message: "Error method" });
    }

    await verifyUser(req, res, async () => {
      const user = req.user;
      const { role } = req.query;
      const userData = await getUserData(role as string);
      res.status(200).json({ message: `Success get ${userData}`, user });
    });
  } catch (error) {
    res.status(500).json({ message: "Network error" });
  }
}
