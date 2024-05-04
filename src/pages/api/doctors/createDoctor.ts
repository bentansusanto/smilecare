import { createDoctor } from "@/ServiceAPI/DoctorServices";
import { NextApiRequest, NextApiResponse } from "next";

export default async function createDoctors(req:NextApiRequest, res:NextApiResponse) {
    try {
        if(req.method !== "POST"){
            res.status(500).json({message:"Error method"})
        }
        const {name_doctor, specialist, rating, experience, description, images} = req.body
        const doctor = await createDoctor({name_doctor, specialist, rating, experience, description, images})
        res.status(201).json({message: "Success create Products", doctor})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Network Error", data: `error data ${error}`})
    }
}