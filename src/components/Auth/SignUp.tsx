import { useState } from "react";
import { useForm } from "react-hook-form";
import { useGetSignUp } from "../../Hooks/AuthHooks/useGetSignUp";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import { SignUpSchema, SignUpProps } from "../../Types/types";
import { Departments } from "../../Types/types";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpProps>({
    resolver: yupResolver(SignUpSchema),
  });

  const [error, setError] = useState<string | null>(null);
  const signUpMutation = useGetSignUp();

  const onSubmit = handleSubmit((formData: SignUpProps) => {
    signUpMutation.mutate(formData, {
      onError: (error: any) => {
        setError(error.message);
      },
    });
  });

  return (
    <div className="signUpSection container">
      <div className="w-full md:w-96 px-4">
        <form onSubmit={handleSubmit(onSubmit)} className="formGroup">
          <div>
            <h4 className="formTitle">Sign Up</h4>
            <p className="formParegraph">Hi There! Nice to have you with us</p>
          </div>

          <div className="mb-4">
            <label className="labels">First Name</label>
            <input
              type="text"
              placeholder="First Name"
              {...register("firstname")}
              className={`inputFields ${
                errors.firstname ? "border-red" : "border-darkGray"
              }`}
            />
            {errors.firstname && (
              <p className="errorsMessage">{errors.firstname.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="labels">Last Name</label>
            <input
              type="text"
              placeholder="Last Name"
              {...register("lastname")}
              className={`inputFields ${
                errors.lastname ? "border-red" : "border-darkGray"
              }`}
            />
            {errors.lastname && (
              <p className="errorsMessage">{errors.lastname.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="labels">Department</label>
            <select
              {...register("department")}
              className={`inputFields ${
                errors.department ? "border-red" : "border-darkGray"
              }`}
            >
              <option value="">Please choose a Departement</option>
              <option value={Departments.CodingSchool}>CodingSchool</option>
              <option value={Departments.Diamir}>Diamir</option>
              <option value={Departments.WebundSoehne}>WebundSoehne</option>
              <option value={Departments.DarwinsLab}>DarwinsLab</option>
              <option value={Departments.DeepDive}>DeepDive</option>
              <option value={Departments.TailoredApps}>TailoredApps</option>
            </select>
            {errors.department && (
              <p className="errorsMessage">{errors.department.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="labels">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Email@example.com"
              {...register("email")}
              className={`inputFields ${
                errors.email ? "border-red" : "border-darkGray"
              }`}
            />
            {errors.email && (
              <p className="errorsMessage">{errors.email.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="labels">Password</label>
            <input
              type="password"
              placeholder="*************"
              {...register("password")}
              className={`inputFields ${
                errors.password ? "border-red" : "border-darkGray"
              }`}
            />
            {errors.password && (
              <p className="errorsMessage">{errors.password.message}</p>
            )}
          </div>

          <button type="submit" className="formBtn">
            Sign Up
          </button>

          <div className="flex justify-end">
            <Link to="/" className="pageLink">
              Sign In
            </Link>
          </div>
        </form>
        {error && <p className="errorsMessage text-center py-4">{error}</p>}
      </div>
    </div>
  );
};

export default SignUp;