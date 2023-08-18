import { useEffect, useState } from "react";
import { useGetCreateOffices } from "../../Hooks/AdminAndUsersHooks/useGetCreateOffices";
import { CreateOfficeProps, OfficeSchema } from "../../Types/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

export const CreateOfficesForm = () => {
    const createOffice = useGetCreateOffices();
    const [successMessage, setSuccessMessage] = useState(false);

    const { register, handleSubmit, formState: { errors }, reset, } = useForm<CreateOfficeProps>({
        resolver: yupResolver(OfficeSchema),
    });

    const handleCreateOffice = async (data: CreateOfficeProps) => {
        try {
          await createOffice.mutateAsync(data); 
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
                <p className="successMessage">Office successfully Created!</p>
            )}
            <div className="w-full y-10">
                <form onSubmit={handleSubmit(handleCreateOffice)} className='formGroup'>
                    <div>
                        <h2 className="text-xl text-darkBlue font-bold">Create New Office</h2>
                    </div>
                    <div className="mb-4">
                        <label className='labels'>
                            Name
                        </label>
                        <input
                            type="text"
                            placeholder='Name'
                            {...register("name")}
                            className={`inputFields ${
                            errors.name ? 'border-red' : 'border-darkGray'
                            }`}
                        />
                        {errors.name && (
                            <p className="errorsMessage">{errors.name.message}</p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className='labels'>
                            Columns
                        </label>
                        <input
                            type="number"
                            placeholder='Columns'
                            {...register("columns")}
                            className={`inputFields ${
                            errors.columns ? 'border-red' : 'border-darkGray'
                            }`}
                        />
                        {errors.columns && (
                            <p className="errorsMessage">{errors.columns.message}</p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className='labels'>
                            Rows
                        </label>
                        <input
                            type="number"
                            placeholder='Rows'
                            {...register("rows")}
                            className={`inputFields ${
                            errors.rows ? 'border-red' : 'border-darkGray'
                            }`}
                        />
                        {errors.rows && (
                            <p className="errorsMessage">{errors.rows.message}</p>
                        )}
                    </div>
                    
                    <button
                        type="submit"
                        className="formBtn"
                    >
                        Create Office
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateOfficesForm;