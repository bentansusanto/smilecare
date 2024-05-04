import { DoctorTypes } from "@/utils/ServicesTypes";
import prisma from "../config/PrismaClient";

export const getDoctors = async() => {
    try {
        const doctor = await prisma.doctor.findMany()
        return doctor
    } catch (error) {
        throw new Error(`message ${error}`)
    }
}

export const createDoctor = async (doctorData:DoctorTypes) => {
    try {
        const doctor = await prisma.doctor.create({
            data: {
                ...doctorData
            }
        })
        return doctor;
    } catch (error) {
        throw new Error(`message ${error}`)      
    }
}

export const getDoctorById = async (id:string) => {
    try {
        const doctor = await prisma.doctor.findUnique({
            where: {
                id
            }
        })
        if(!doctor){
            throw new Error("Doctor not found")
        }
        return doctor;
    } catch (error) {
        throw new Error(`message ${error}`)      
    }
}

export const updateDoctorById = async (doctorId:string, doctorData: DoctorTypes) => {
    try {
        const findDoctor = await getDoctorById(doctorId)

        if(!findDoctor){
            throw new Error("Doctor not found")
        }

        const doctor = await prisma.doctor.update({
            where: {
                id: doctorId
            },
            data: {
                ...doctorData
            }
        })
        return doctor;
    } catch (error) {
        throw new Error(`message ${error}`)      
    }
}

export const deleteDoctorById = async (doctorId:string) => {
    try {
        const findDoctor = await getDoctorById(doctorId)

        if(!findDoctor){
            throw new Error("Doctor not found")
        }

        const doctor = await prisma.doctor.delete({
            where: {
                id: doctorId
            }
        })
        return doctor;
    } catch (error) {
        throw new Error(`message ${error}`)      
    }
}