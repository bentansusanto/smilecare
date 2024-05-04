import prisma from "../config/PrismaClient"

export const findEmail = async(email:string) => {
    try {
        const emailUser = await prisma.user.findFirst({
            where: {
                email
            }
        })
        return emailUser
    } catch (error) {
        throw new Error (`message ${error}`)
    }
}