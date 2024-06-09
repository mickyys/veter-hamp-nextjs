import { getPetByID } from "@/app/actions/pets/get-pet-by-id";
import { getCountries } from "@/app/actions/utils/get-country";
import Breadcrumb from "@/app/components/Breadcrumbs/Breadcrumb";
import { FormPatient } from "@/app/components/Form/FormPatient";
import { FormTutor } from "@/app/components/Form/FormTutor";

interface Props {
  params: {
    id: string;
  }
}

export default async function PagePatientId({ params }: Props) {

  const { id } = params;
  const { patient } = await getPetByID({ id });
  const { tutor, ...rest } = patient!;
  const { name } = rest;
  const { countries } = await getCountries();



  return (
    <>
      <Breadcrumb pageName={name} />
      <div className="grid grid-cols gap-9">
        <FormPatient patient={rest} />
        <FormTutor tutor={tutor} countries={countries} isEditable={false} />
      </div>
    </>
  )
}
