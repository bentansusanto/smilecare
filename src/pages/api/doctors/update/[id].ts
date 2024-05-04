import { updateDoctorById } from "@/ServiceAPI/DoctorServices";
import { NextApiRequest, NextApiResponse } from "next";

export default async function updateDoctorId(req:NextApiRequest, res:NextApiResponse) {
    try {
        const {
            query: { id }, method
          } = req;
          if(method !== "PUT"){
              res.status(500).json({message:"Error method"})
            }
        const {name_doctor, specialist, rating, experience, description, images} = req.body
        const doctor = await updateDoctorById(id as string, {name_doctor, specialist, rating, experience, description, images})
        res.status(200).json({message: "Success Update Doctor", doctor})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Network Error", data: `error data ${error}`})
    }
}