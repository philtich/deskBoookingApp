import { useState, useEffect } from "react";
import SignIn from "../Auth/SignIn";
import Dashboard from "./Dashboard";
import { useGetSignIn } from '../../Hooks/AuthHooks/useGetSignIn';
import { SignInProps } from "../../Types/types";
import { useNavigate } from 'react-router-dom';

export const MainView = ({ onLogout }) => {
  const { mutate: addUser } = useGetSignIn();
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = (email: SignInProps, password: SignInProps) => {
    addUser(email, password)
      .then((response: { data: any; }) => {
      const userData = response.data;
      localStorage.setItem('user', JSON.stringify(userData));
      setLoggedIn(true);
    });
  };
  
  const handleLogout = () => {
    setLoggedIn(false);
  };

  useEffect(() => {
    if (localStorage.getItem('user') != null) {
      navigate('/dashboard')
    }
  })
  
  return (
    <div>
      <SignIn addUser={handleSignIn} />
      {loggedIn ? <Dashboard onLogout={handleLogout}/> : null}
    </div> 
  )
};
  


export default MainView;