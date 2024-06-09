'use server';
import { auth } from "@/app/auth";
import { Patient } from "@/app/interface/patient.interface";
import prisma from "@/lib/prisma";
import { cookies } from 'next/headers'

interface Props {
    patient: Patient;
}

export const updatePet = async ({ patient }: Props) => {

    const session = await auth();
    const cookieStore = cookies();

    const userName = session?.user?.name!
    const veterinaryId = cookieStore.get('veterinary')?.value;

    try {
        const updPatient = await prisma.patient.update({
            data: {
                ...patient,
                name: patient.name!,
                updated_at: new Date(),
                updated_by: userName
            },
            where: { veterinaryId, id: patient.id }
        });
        console.log('patient ======================> : ' + JSON.stringify(updPatient));
        return {
            updPatient
        };
    } catch (error) {
        console.log(error);
        throw error;
    }
}