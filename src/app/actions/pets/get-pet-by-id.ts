'use server';
import { auth } from "@/app/auth";
import prisma from "@/lib/prisma";
import { cookies } from 'next/headers'

interface Props {
    id: string;
}

export const getPetByID = async ({ id } : Props) => {
    
    const session = await auth();
    const cookieStore = cookies();
    
    const userId = session?.user?.id!;
    const veterinaryId = cookieStore.get('veterinary')?.value;
    
    console.log('user: '  + userId);
    console.log('veterinaryId: '  + veterinaryId);

    try {
        const patient = await prisma.patient.findFirst({
            where: { veterinaryId, id },           
            include: {            
                tutor: true
            }
        });     
        console.log('patient ======================> : ' + JSON.stringify(patient));
        return {
            patient
        };
    } catch (error) {
        console.log(error);
        throw error;
    }
}