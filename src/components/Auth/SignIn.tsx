import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { SignInSchema, SignInProps } from '../../Types/types';
import { Link } from 'react-router-dom';
import { useGetSignIn } from '../../Hooks/AuthHooks/useGetSignIn';
import  { useState } from 'react';

export const SignIn = ({ addUser }: { addUser: (email: string, password: string) => void }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<SignInProps>({
    resolver: yupResolver(SignInSchema),
  });

  const signInMutation = useGetSignIn();
  const [error, setError] = useState<string | null>(null);

  const  handleSignIn  =  async (formData: SignInProps) => {
    try{
      await signInMutation.mutateAsync(formData);
    } catch (error) {
      setError('Errormessage');
    }
  };

  return (
    <div className="signInSection container">
      <div className="w-full md:w-96 px-4">
        <form onSubmit={handleSubmit(handleSignIn)} className='formGroup'>
          <div>
            <h4 
              className='formTitle'>
              Sign In
            </h4>
            <p className='formParegraph'>
              Hi There! Nice to see you again
            </p>
          </div>

          <div className="mb-4">
            <label className='labels'>
              Email
            </label>
            <input
              type="email"
              placeholder='Email@example.com'
              {...register("email")}
              className={`inputFields ${
                errors.email ? 'border-b-red' : 'border-b-darkGray'
              }`}
            />
            {errors.email && (
              <p className="errorsMessage">{errors.email.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className='labels'>
              Password
            </label>
            <input
              type="password"
              placeholder='*************'
              {...register("password")}
              className={`inputFields ${
                errors.password ? 'border-red' : 'border-darkGray'
              }`}
            />
            {errors.password && (
              <p className="errorsMessage">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="formBtn"
          >
            Sign In
          </button>

          <div className='flex justify-end'>
            <Link to="/signup" className="pageLink">
              Sign Up
            </Link>
          </div>
        </form>
        {error && <p className='errorsMessage text-center py-4'>{'Email or Password is not Correct'}</p>} 
      </div>
    </div>
  );
};

export default SignIn;