import { useNavigate, Link } from "react-router-dom";
import { useGetProfile } from "../../Hooks/ProfileHooks/useGetProfile";
import { useGetDeleteUser } from "../../Hooks/AdminAndUsersHooks/useGetDeleteUser";
import { useState } from "react";
import { Modal } from "./ModalDelete/Modal";
import { ConfirmationModal } from "./ModalDelete/ConfirmationModal";
import { useModal } from "./ModalDelete/useModal";

const Sidebar = ({ isSidebarOpen }) => {
  const { data: userProfile } = useGetProfile();
  const deleteUserMutation = useGetDeleteUser();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const userId = userProfile?.id;

  const handleDeleteUser = () => {
    if (userProfile) {
      deleteUserMutation.mutate(userId, {
        onSuccess: () => {
          setMessage("User deleted successfully");
          alert("You have successfully deleted your account!")
          handleLoggedOut();
        },
        onError: () => {
          setMessage("Failed to delete user");
        },
      });
    }
  };

  const { isShown, toggle } = useModal()
  
  const onConfirm = () => handleDeleteUser();
  const onCancel = () => toggle();

  const handleLoggedOut = () => {
    localStorage.removeItem('user');
    navigate("/");
  };

  return (
    <aside
      className={`sidebarSection ${
        isSidebarOpen ? true : "-translate-x-full"
      } sidebarSectionClose`}
      aria-expanded="false"
    >

      <div className="sideBookingTitleDiv">
        <a className="sideBookingLink">
          <span className="sideBookingSpan">Booking System</span>
        </a>
      </div>

      <hr className="sideHr" />

      <div className="sideSection">
        <div className="sideParent">
          <ul>
            {/* Dashboard link */}
            <li className="sideDashLi">
              <Link to='/dashboard' className="sideDashLink">
                <div className="sideImgDiv">
                  <img src="/icons/dashboardIcon.svg" alt="Dashboard Icon" className="h-8 w-8"/>
                </div>
                
                <span className="sideTitleSpan">
                  Dashboard
                </span>
              </Link>
            </li>

            {/* Booking link */}
            <li className="sideDashLi">
              <Link to='/booking' className="sideDashLink" >
                <div className="sideImgDiv">
                  <img src="/icons/serviceIcon.svg" alt="Service Icon" className="h-8 w-8"/>
                </div>
                <span className="sideTitleSpan">
                  Booking
                </span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Profile and Logout links */}
        <div className="sideParent">

        {/* Profile link */}
        <ul >
          <li className="sideDashLi">
            <Link to="/profile" className="sideDashLink" >
              <div className="sideImgDiv">
                <img src="/icons/profileIcon.svg" alt="Profile Icon" className="h-8 w-8"/>
              </div>
              <span className="sideTitleSpan">
                Profile
              </span>
            </Link>
          </li>

          {/* Delete account button */}
          {userProfile?.isAdmin != true &&
            <li className="sideDashLiForBtn">
              <button onClick={toggle} className="sideBtn">
                <div className="sideImgDiv">
                  <img src="/icons/userDelete.svg" alt="Delete User Icon" className="h-8 w-8"/>
                </div>
                <span className="sideTitleSpan">
                  Delete Account
                </span>
              </button>
              <Modal
                isShown={isShown}
                hide={toggle}
                modalContent={
                  <ConfirmationModal 
                    onConfirm={onConfirm} 
                    onCancel={onCancel}
                    message='Are you sure you want to delete your Account?'
                  />
                }
              />
            <p className="sideDeleteMessage">{message}</p>
            </li>
          }
          
          {/* Logout button */}
          <li className="sideDashLiForBtn">
            <button
              className="sideBtn"
              onClick={handleLoggedOut}
            >
              <div className="sideImgDiv">
                <img src="/icons/logoutIcon.svg" alt="" className="h-8 w-8"/>
              </div>
              <span className="sideTitleSpan">Logout</span>
            </button>
          </li>
        </ul>
        </div>
      </div>
    </aside>
  )
};

export default Sidebar;