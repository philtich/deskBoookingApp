import { useEffect, useState } from "react";
import { useGetCreateDesk } from "../../Hooks/AdminAndUsersHooks/useGetCreateDesk";
import { CreateDeskSchema, CreateDesksFormProps, DeskCreateFormPropsMu, OfficeProps } from "../../Types/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Equipment } from "../../Types/types";

export interface CreateDesksFormPropsWithOffices extends CreateDesksFormProps {
    offices: OfficeProps[];
}

export const CreateDesksForm = ({ onCreateDesk, offices  }: CreateDesksFormPropsWithOffices) => {
  const createDesk = useGetCreateDesk();
  const [successMessage, setSuccessMessage] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<DeskCreateFormPropsMu>({
      resolver: yupResolver(CreateDeskSchema),
  });

  const handleCreateDesks = async (data: DeskCreateFormPropsMu) => {
      try {
        await createDesk.mutateAsync(data);
        setSuccessMessage(true);
        reset();
      } catch (error) {
        console.error(error.message);
      }
  };
  
  useEffect(() => {
  if (successMessage) {
      setTimeout(() => {
      setSuccessMessage(false);
      }, 3000);
  }
  }, [successMessage]);

  return (
      <div className="CreateOfficesSection">
        {successMessage && (
          <p className="successMessage">Desk successfully Created!</p>
        )}
        <div className="w-full">
          <form onSubmit={handleSubmit(handleCreateDesks)} className='formGroup'>
            <div>
              <h2 className="text-xl text-darkBlue font-bold">Create New Desk</h2>
            </div>

            <div className="mb-4">
              <label className='labels'>
                Label
              </label>
              <input
                type="text"
                placeholder='Label'
                {...register("label")}
                className={`inputFields ${
                  errors.label ? 'border-red' : 'border-darkGray'
                }`}
              />
              {errors.label && (
                <p className="errorsMessage">{errors.label.message}</p>
              )}
            </div>
  
            <div className="mb-4">
              <label className='labels'>
                Office
              </label>
              <select
                {...register("office")}
                className={`inputFields ${
                  errors.office ? 'border-red' : 'border-darkGray'
                }`}
              >
                <option value=''>Chose your Office</option>
                {offices.map((office) => (
                  <option
                      key={office.id}
                      value={office.id}
                  >
                      {office.name}
                  </option>
                ))}
              </select>
              {errors.office && (
                <p className="errorsMessage">{errors.office.message}</p>
              )}
            </div>
  
            <label className='labels'>
              Equipment
            </label>
            <div className="mb-4 grid grid-rows-2 grid-cols-3">
              {Object.values(Equipment).map((equipment) => (
                <div key={equipment}>
                  <input
                    type="checkbox"
                    className="mr-2"
                    {...register("equipment")}
                    value={equipment}
                  />
                  <label>{equipment}</label>
                </div>
              ))}
              {errors.equipment && (
                <p className="errorsMessage">{errors.equipment.message}</p>
              )}
            </div>
  
            <button
              type="submit"
              className="formBtn"
            >
              Create Desk
            </button>
          </form>
        </div>
      </div>
  );
};

export default CreateDesksForm;