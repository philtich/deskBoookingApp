import { useState, useEffect } from "react";
import { useGetAllOffices } from '../../Hooks/OfficesHooks/useGetAllOffices';
import { OfficeProps } from '../../Types/types';

export type AllOfficesProps ={
  office: string
  setOffice: (arr: object[]) => void
}

export const AllOffices = ({ office, setOffice }: AllOfficesProps) => {
  const { data } = useGetAllOffices();
  const [offices, setOffices] = useState<OfficeProps[]>([]);

  useEffect(() => {
    if (data) {
      setOffices(data);
    }
  }, [data]);

  return (
    <section className="officesSection">
      <div className='offices container'>
        {offices.map((office) => (
          <button
            key={office.id}
            onClick={()=> setOffice(office)}
            className='officesBtn'>
              <img src="/icons/officeIcon.svg" alt="Office Icon" className='officeImg' />
              <div className="overflow-hidden">{office.name}</div>
          </button>
          ))}
      </div>
    </section>
  )
}
