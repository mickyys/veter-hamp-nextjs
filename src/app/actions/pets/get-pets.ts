'use server';
import { auth } from "@/app/auth";
import prisma from "@/lib/prisma";
import { cookies } from 'next/headers'

interface Props {
    page: number;
    take: number;
}

export const getPets = async ({ page = 1, take= 12 } : Props) => {
    
    const session = await auth();
    const cookieStore = cookies();
    
    const userId = session?.user?.id!;
    const veterinaryId = cookieStore.get('veterinary')?.value;
    
    console.log('user: '  + userId);
    console.log('veterinaryId: '  + veterinaryId);

    try {
        const patients = await prisma.patient.findMany({
            where: { veterinaryId },
            take,
            skip: (page - 1) * take,
            include: {            
                tutor: {
                    select: {
                        name: true,
                        email: true,
                        lastName: true,
                        docNumber: true,
                    }
                }
            }
        });

        const total = await prisma.patient.count({ where: { veterinaryId } });
        const totalPages = Math.ceil(total / take);       

        return {
            patients,
            page,
            totalPages
        };
    } catch (error) {
        console.log(error);
        throw error;
    }
}