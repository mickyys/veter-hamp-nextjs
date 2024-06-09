'use client'
import { Tutor } from '@/app/interface/tutor.interface'
import React from 'react'
import { useForm } from 'react-hook-form'
import DatePickerOne from '../DatePicker/DatePickerOne'
import SelectGroupTwo from '../SelectGroup/SelectGroupTwo'
import { Country } from '@/app/interface/country.interface'

interface Props {
  tutor: Tutor,
  countries: Country[]
  isEditable?: boolean
}

export const FormTutor = ({ tutor, countries, isEditable = true }: Props) => {

  const { name, lastName, docNumber, email, address, birthDate, city, countryId, phone, vip } = tutor;
  const listCountries = countries.map(country => { return { value: country.id, label: country.name } });
  const listVip = [{ value: 'true', label: 'Si' }, { value: 'false', label: 'No' }]

  const { handleSubmit, register, formState: { isValid }, getValues, setValue, watch } = useForm<Tutor>({
    defaultValues: {
      ...tutor
    }
  });


  return (
    <>
      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Tutor
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
                {...register('name', { required: true, disabled: !isEditable })}
              />
            </div>

            <div>
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Apellido
              </label>
              <input
                type="text"
                placeholder="Apellido"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                {...register('lastName', { required: true, disabled: !isEditable })}
              />
            </div>
            <div>
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Numero documento
              </label>
              <input
                type="text"
                placeholder="9999999-1"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                {...register('docNumber', { disabled: !isEditable })}
              />
            </div>
            <div>
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Correo
              </label>
              <input
                type="text"
                placeholder="prueba@veterhamp.cl"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                {...register('email', {
                  required: "required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Formato no válido",
                  },
                  disabled: !isEditable
                })}
              />
            </div>
            <div>
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Dirección
              </label>
              <input
                type="text"
                placeholder="Moneda 970"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                {...register('address', { disabled: !isEditable })}
              />
            </div>
            <DatePickerOne register={register} formNameValue='birthDate' label='Fec. Nacimiento' value={birthDate!} isEditable={!isEditable} />
            <div>
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Ciudad
              </label>
              <input
                type="text"
                placeholder="Las Condes"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                {...register('city', { disabled: !isEditable })}
              />
            </div>
            <SelectGroupTwo register={register} formNameValue='countryId' label='Pais' value={countryId!} values={listCountries} pathIcon='/images/icon/icon-earth.svg' isEditable={!isEditable} />
            <div>
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Telefono
              </label>
              <input
                type="text"
                placeholder="+56 9 8888 5555"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                {...register('phone', { disabled: !isEditable })}
              />
            </div>
            <SelectGroupTwo register={register} formNameValue='vip' label='VIP' value={String(vip)} values={listVip} pathIcon='/images/icon/icon-vip.svg' isEditable={!isEditable} />

            {
              isEditable ?
                <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                  Guardar
                </button>
                :
                <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                  Modificar
                </button>
            }

          </div>

        </div>
      </div>
    </>
  )
}
