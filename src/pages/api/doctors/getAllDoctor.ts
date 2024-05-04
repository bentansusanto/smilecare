import { getDoctors } from "@/ServiceAPI/DoctorServices";
import { NextApiRequest, NextApiResponse } from "next";

export default async function getAllDoctor(req:NextApiRequest, res:NextApiResponse) {
    try {
        if(req.method !== "GET"){
            res.status(500).json({message:"Error method"})
        }
        const doctor = await getDoctors()
        res.status(200).json({message: "Success get Products", doctor})
    } catch (error) {
        res.status(500).json({message:"Network Error", error})
    }
}