import { getDoctorById } from "@/ServiceAPI/DoctorServices";
import { NextApiRequest, NextApiResponse } from "next";

export default async function getDoctorId(req:NextApiRequest, res:NextApiResponse) {
    try {
        const {
            query: { id }, method
          } = req;
        if(method !== "GET"){
            res.status(500).json({message:"Error method"})
        }
        const doctor = await getDoctorById(id as string)
        res.status(200).json({message: "Success Get Product Id", doctor})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Network Error", data: `error data ${error}`})
    }
}

