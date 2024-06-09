enum Gender {
    male,
    female
}

export interface Patient {
    id: string
    veterinaryId: string
    tutorId: string
    record?: number|null
    name?: string | null
    birthDate?: Date| string | null
    species?: string | null
    race?: string | null
    gender?: Gender | any
    microship?: String| null
    created_at: Date
    created_by: string
}