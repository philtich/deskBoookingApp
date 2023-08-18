import { useEffect } from "react";
import { OfficeSchema, OfficeProps } from "../../Types/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useGetUpdateOffice } from "../../Hooks/AdminAndUsersHooks/useGetUpdateOffice";

export const EditOfficeForm = ({ office, onClose }: { office: OfficeProps; onClose: () => void; }) => {
  const { mutateAsync, isSuccess: successMessage } = useGetUpdateOffice();

  const { register, handleSubmit, formState: { errors }, setValue } = useForm<OfficeProps>({
    resolver: yupResolver(OfficeSchema),
    defaultValues: office,
  });

  useEffect(() => {
    setValue("name", office.name);
    setValue("columns", office.columns);
    setValue("rows", office.rows);
  }, [office, setValue]);

  const handleEditSubmit = async (formData: OfficeProps) => {
    try {
      await mutateAsync(formData, office.id);
      
    } catch (error) {
      console.error("Error updating office:", error);
    }
  };

  useEffect(() => {
    if (successMessage) {
      setTimeout(() => {
        onClose();
      }, 3000);
    }
  }, [successMessage]);
  
  return (
    <section className="EditOfficeFormSection">
      {successMessage && (
        <p className="successMessage">Office successfully updated!</p>
      )}
      <div className="w-full my-10">
        <form onSubmit={handleSubmit(handleEditSubmit)} className="formGroup">
          <div>
            <h2 className="text-xl text-darkBlue font-bold">Update Office</h2>
          </div>
          <div className="mb-4">
            <label className="labels">Select Office</label>
            <input
              type="text"
              {...register("name")}
              className={`inputFields ${
                errors.name ? "border-red" : "border-darkGray"
              }`}
            />
            {errors.name && (
              <p className="errorsMessage">{errors.name.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="labels">Columns</label>
            <input
              type="number"
              {...register("columns")}
              className={`inputFields ${
                errors.columns ? "border-red" : "border-darkGray"
              }`}
            />
            {errors.columns && (
              <p className="errorsMessage">{errors.columns.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="labels">Rows</label>
            <input
              type="number"
              {...register("rows")}
              className={`inputFields ${
                errors.rows ? "border-red" : "border-darkGray"
              }`}
            />
            {errors.rows && (
              <p className="errorsMessage">{errors.rows.message}</p>
            )}
          </div>

          <button type="submit" className="formBtn">
            Update Office
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditOfficeForm;