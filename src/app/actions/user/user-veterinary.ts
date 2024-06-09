'use server';
import { auth } from "@/app/auth";
import prisma from "@/lib/prisma";

export const getVeterinaryByUser = async () => {
    
    const session = await auth();
    const userId = session?.user?.id!;

    console.log('user'  + userId);

    try {
        const veterinary = await prisma.veterinaryUser.findMany({
            where: { userId: userId },
            select: {
                veterinary: true
            }
        });
        return veterinary.map(veter => veter.veterinary);
    } catch (error) {
        console.log(error);
        return[];
    }
}