import { deleteDoctorById } from "@/ServiceAPI/DoctorServices";
import { NextApiRequest, NextApiResponse } from "next";

export default async function deleteDoctor(req:NextApiRequest, res:NextApiResponse) {
    try {
        const {
            query: { id }, method
          } = req;
        if(method !== "DELETE"){
            res.status(500).json({message:"Error method"})
        }
        const doctor = await deleteDoctorById(id as string)
        res.status(200).json({message: "Success Delete Doctor"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Network Error", data:`${error}`})
    }
}