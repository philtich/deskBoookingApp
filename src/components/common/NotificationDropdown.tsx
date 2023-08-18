import  { useState, useEffect } from "react";
import { useGetAllFixDeskRequests } from "../../Hooks/AdminAndUsersHooks/useGetAllFixDeskRequests";
import {  FixDeskApprovalProps } from "../../Types/types";

export const NotificationDropdown = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { data } = useGetAllFixDeskRequests();
  const [requests, setRequests] = useState<FixDeskApprovalProps[]>([]);
  const filteredRequests = requests.filter((request) => request.status == "notreviewed");

  useEffect(() => {
    if (data) {
      setRequests(data);
    }
  }, [data]);      
  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  return (
    <div>
        <div className="notificationLi">
            <p className="notificationParagraph"></p>
            <a
              className="notificationLink"
              onClick={handleDropdownToggle}
              aria-expanded={isDropdownOpen ? 'true' : 'false'}
            >
              <img src="/icons/notificationIcon.svg" className="h-9 w-10 cursor-pointer" alt="Notification" />
              {filteredRequests.length > 0 && (
                <span className="notificationSpan">
                  {filteredRequests.length}
                </span>
              )}
            </a>
              {/* Notification dropdown menu */}
              <ul
                className={`notificationDropDownMenu ${isDropdownOpen ? 'opacity-100' : 'opacity-0'}`}>
                <li className="relative mb-2">
                  <a className="NotificationMessageLink">
                    <div className="flex py-1">
                      <div className="flex flex-col justify-center">
                        {/* Notification Message */}
                        <h6 className="NotificationMessageH6">
                          {<span className="font-semibold">You have {filteredRequests.length} Fix-Desk-Request(s) to approve or reject! </span>
                          }
                        </h6>
                      </div>
                    </div>
                  </a>
                </li>
              </ul>
        </div>
    </div>
  )
}