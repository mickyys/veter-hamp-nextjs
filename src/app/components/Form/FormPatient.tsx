'use client'
import { Patient } from '@/app/interface/patient.interface';
import React, { useEffect } from 'react'
import { useForm, useFormState } from 'react-hook-form';
import DatePickerOne from '../DatePicker/DatePickerOne';
import SelectGroupTwo from '../SelectGroup/SelectGroupTwo';
import { updatePet } from '@/app/actions/pets/update-pet';


interface Props {
  patient: Patient
}

const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const genders = [
  { value: 'male', label: 'Macho' },
  { value: 'female', label: 'Hembra' }
];

export const FormPatient = ({ patient }: Props) => {
  const { handleSubmit, register, formState: { isValid, isDirty } } = useForm<Patient>({
    defaultValues: {
      ...patient,
      birthDate: formatDate(patient.birthDate as Date),
    }
  });

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (isDirty) {
        event.preventDefault();
        event.returnValue = ''; 
      }
      return true;
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isDirty]);

  const onSubmit = async (patient: Patient) => {
    console.log("data =============>", isValid, patient);
    const resp = await updatePet({patient});
    console.log("data =============>", isValid, resp);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Paciente #{patient.record}
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Nombre
                </label>
                <input
                  type="text"
                  placeholder="Nombre"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  {...register('name', { required: true })}
                />
              </div>
              <DatePickerOne register={register} formNameValue='birthDate' label='Fec. Nacimiento' value={patient.birthDate!} />

              <SelectGroupTwo register={register} formNameValue='gender' label='Genero' value={patient.gender!} values={genders} pathIcon='/images/icon/icon-gender.svg' />

              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Especie
                </label>
                <input
                  type="text"
                  placeholder="Gato"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  {...register('species')}
                />
              </div>
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Raza
                </label>
                <input
                  type="text"
                  placeholder="Persa"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  {...register('race')}
                />
              </div>
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Microship
                </label>
                <input
                  type="text"
                  placeholder="9933222003"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  {...register('microship')}
                />
              </div>
              <button type='submit' className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                Guardar
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}
