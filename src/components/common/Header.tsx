import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGetProfile } from "../../Hooks/ProfileHooks/useGetProfile";
import Sidebar from "./Sidebar";
import { NotificationDropdown } from "./NotificationDropdown";

export const Header = ({ pageTitle }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { data } = useGetProfile();

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!data) {
    return <div>No User Name</div>;
  }

  return (
    <nav className="headerNavSection">
      <div className="headerNavMainDiv container">
        <nav className="leftNavSection">
          <ol className="leftList">
            <li className="leftListLi">
              <a>Pages</a>
            </li>
            <li className="leftListLiTitle">Dashboard</li>
          </ol>
          <h6 className="leftListLiPageTitle">{pageTitle}</h6>
        </nav>
        <div className="rightNavSection">
          <ul>
            <li className="userLi">
              <Link to="/profile" className="UserProfileLink">
                <div className="UserProfileLinkImg">
                  <img src="/icons/userAvatarIcon.svg" alt="" />
                </div>
                <p>{data.firstname}</p>
              </Link>
            </li>

            <li>
              <div>{data?.isAdmin === true && <NotificationDropdown />}</div>
            </li>
            <li className="flex items-center md:hidden">
              <button
                className="block p-0 text-sm text-darkGray transition-all ease-nav-brand"
                onClick={handleSidebarToggle}
              >
                <div className="w-4.5 overflow-hidden">
                  <img
                    className="w-10 h-10 rotate-180"
                    src="/icons/hamburgerIcon.svg"
                    alt=""
                  />
                </div>
              </button>
            </li>
          </ul>
        </div>
      </div>
      {isSidebarOpen && <Sidebar isSidebarOpen={isSidebarOpen} />}
    </nav>
  );
};

export default Header;