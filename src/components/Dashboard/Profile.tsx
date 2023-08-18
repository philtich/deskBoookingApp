import { useState, useEffect } from "react";
import Sidebar from '../common/Sidebar';
import Header from '../common/Header';
import Footer from '../common/Footer';
import useGetUpdateProfile from '../../Hooks/ProfileHooks/useGetUpdateProfile';
import { useForm } from 'react-hook-form';
import { useGetProfile } from '../../Hooks/ProfileHooks/useGetProfile';
import { SignUpProps, SignUpSchema } from '../../Types/types';
import { yupResolver } from '@hookform/resolvers/yup';
import { Departments } from '../../Types/types';

export const Profile = () => {
  const { data, isLoading, isError, error } = useGetProfile();
  const updateProfileMutation = useGetUpdateProfile();
  const [successMessage, setSuccessMessage] = useState(false);
  const pageTitle = 'Profile';

  const { register, handleSubmit, reset, formState: { errors }  } = useForm<SignUpProps>({
    resolver: yupResolver(SignUpSchema),
    defaultValues: data || {},
  });

  const handleEditSubmit = handleSubmit ((formData: SignUpProps) => {

    updateProfileMutation.mutate(formData);
    setSuccessMessage(true)
    
  });

  useEffect(() => {
    if (successMessage){
      
      setTimeout(() => {
        setSuccessMessage(false)

    }, 3000);}
  }, [successMessage]);
      
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>No profile data available.</div>;
  }

  const { firstname, lastname, email, department, isAdmin } = data;

  return (
    <main>
      {/* sidenav   */}
      <Sidebar />
      {/* End sidenav */}

      <div className="dashMain">
        {/* Header */}
        <Header pageTitle={pageTitle} />
        {/* Header */}

        {/* ProfileInfo & Edit Profile */}
        <section className="ProfileInfoSection container">
          {successMessage && (
          <p className="successMessage">Profile successfully updated!</p>)}
          <div className="ProfileInfoSectionMainDiv container">
            <form onSubmit={handleSubmit(handleEditSubmit)} className="formGroup w-full lg:w-1/2">
              <div>
                <label className='labels'>First Name</label>
                <input
                  type="text"
                  {...register('firstname')}
                  defaultValue={firstname}
                  className={`inputFields ${
                      errors.firstname ? 'border-red' : 'border-darkGray'
                  }`}
                />
                {errors.firstname && (
                  <p className="errorsMessage">
                    {errors.firstname.message}
                  </p>
                )}
              </div>

              <div>
                <label className='labels'>Last Name</label>
                <input
                  type="text"
                  {...register('lastname')}
                  defaultValue={lastname}
                  className={`inputFields ${
                      errors.lastname ? 'border-red' : 'border-darkGray'
                  }`}
                />
                {errors.lastname && (
                  <p className="errorsMessage">
                    {errors.lastname.message}
                  </p>
                )}
              </div>

                <div className="mb-4">
                  <label className="labels" htmlFor="department">
                    Department
                  </label>
                  <select
                    id="department"
                    defaultValue={department}
                    {...register("department")}
                    className={`inputFields ${
                      errors.department ? "border-red" : "border-darkGray"
                    }`}
                  >
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
                
                <div>
                  <label className='labels'>Email</label>
                  <input
                    type="email"
                    {...register('email')}
                    defaultValue={email}
                    className={`inputFields ${
                      errors.email ? 'border-red' : 'border-darkGray'
                    }`}
                  />
                  {errors.email && (
                    <p className="errorsMessage">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label className='labels' htmlFor="email">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder='***********'
                    {...register("password")}
                    className={`inputFields ${
                      errors.password ? 'border-red' : 'border-darkGray'
                    }`}
                  />
                  {errors.password && (
                    <p className="errorsMessage">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <button
                    className='formBtn'
                    type="submit">
                    Save Changes
                </button>
            </form>
            
            <div className="personalInfo">
              <div className="profileInfoHeader">
                <h2 className='personalTitle'>Personal Information</h2>
                <img
                  src="/public/icons/userAvatarIcon.svg"
                  alt="User Avatar Icon"
                  className='userProfileImg'
                />
              </div>
                
                <div>
                    <strong className='text-base md:text-xl'>{firstname} </strong>
                    <strong className='text-base md:text-xl'>{lastname}</strong>
                </div>
                <div className="text-sm md:text-xl">
                    {email}
                </div>
                <div>
                    {department} | <strong className='text-red'>{isAdmin ? 'Admin' : 'User'}</strong>
                </div>
            </div>
          </div>
                
        </section>
        {/* End ProfileInfo & Edit Profile */}

        {/* Footer */}
        <Footer />
        {/* Footer */}
      </div>
    </main>
  )  
};

export default Profile;

