import { getPets } from '@/app/actions/pets/get-pets';
import React from 'react'
import Breadcrumb from '@/app/components/Breadcrumbs/Breadcrumb';
import { RemoveButton } from '@/app/components/Button/RemoveButton';
import { EditButton, PaginationUI, ViewButton } from '@/app/components';

interface Props {
  searchParams: {
    page?: string;
  }
}

export default async function PatientAdminPage({ searchParams } : Props) {

  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const { patients, totalPages } = await getPets({ page, take: 20 });

  const titles = [{
    title: 'Nombre',
    width: '120px'
  },
  {
    title: 'Fecha Nac.',
    width: '150px'
  },
  {
    title: 'Especie',
    width: '120px'
  },
  {
    title: 'Raza',
    width: '120px'
  },
  {
    title: 'Genero',
    width: '120px'
  },
  {
    title: 'Microchip',
    width: '120px'
  },
  {
    title: 'Acciones',
    width: '150px'
  },
  ]

  return (
    <>
      <Breadcrumb pageName="Pacientes" />
      <div className="flex flex-col gap-10">
        <div className="rounded-sm border border-stroke bg-white px-5 pb-4.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="max-w-full overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  {
                    titles.map((title, key) => (
                      <th key={key} className={`min-w-[${title.width}] px-4 py-4 font-medium text-black dark:text-white xl:pl-11 ${key + 1 === titles.length ? 'text-center' : ''} `}>
                        {title.title}
                      </th>
                    ))
                  }
                </tr>
              </thead>
              <tbody>
                {patients.map((pet, key) => (
                  <tr key={key}>
                    <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                      <h5 className="font-medium text-black dark:text-white">
                        {pet.name}
                      </h5>
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      <p className="inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium ">
                        {pet.birthDate?.toLocaleDateString()}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      <p className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium `}>
                        {pet.species}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      <p className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium`}>
                        {pet.race}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      <p className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium`}>
                        {pet.gender === 'male' ? 'Macho' : 'Hembra'}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      <p className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium`}>
                        {pet.microship === 0 ? '' : pet.microship}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      <div className="flex justify-center space-x-3.5">
                        <ViewButton url={`patients/${pet.id}`} />
                        <EditButton url={`patients/${pet.id}`} />
                        <RemoveButton id={pet.id} name={pet.name} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-center mt-5 mb-5">
           <PaginationUI page={page} total={totalPages} path='/admin/patients' />
          </div>
        </div>

      </div>
    </>
  )
}
