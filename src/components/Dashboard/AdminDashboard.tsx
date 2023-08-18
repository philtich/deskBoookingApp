import { useEffect, useState } from "react";
import { DeskCreateFormPropsMu, OfficeProps, UserResponseDto } from "../../Types/types";
import { useGetAllUsers } from "../../Hooks/AdminAndUsersHooks/useGetAllUsers";
import { useGetAdminDelete } from "../../Hooks/AdminAndUsersHooks/useGetAdminDelete";
import { useGetPromoteToAdmin } from "../../Hooks/AdminAndUsersHooks/useGetPromoteToAdmin";
import { CreateOfficesForm } from "./CreateOfficesForm";
import CreateDesksForm from "./CreateDesksForm";
import { useGetAllOffices } from "../../Hooks/OfficesHooks/useGetAllOffices";
import { FixDeskApproval } from "./FixDeskApproval";
import AllOfficesList from "./AllOfficesList";
import AllCommentsList from "./AllCommentsList";
import { useGetAllFixDeskRequests } from "../../Hooks/AdminAndUsersHooks/useGetAllFixDeskRequests";
import { useGetDesks } from "../../Hooks/BookingHooks/useGetAllDesks";
import AllDesksList from "./AllDesksList";
import { useModal } from "../common/ModalDelete/useModal";
import { Modal } from "../common/ModalDelete/Modal";
import { ConfirmationModal } from "../common/ModalDelete/ConfirmationModal";

export const AdminDashboard = () => {
  const { data } = useGetAllOffices();
  const [offices, setOffices] = useState<OfficeProps[]>([]);
  const adminDelete = useGetAdminDelete();
  const adminPromote = useGetPromoteToAdmin();
  const [successMessage, setSuccessMessage] = useState(false);
  const [successPromote, setSuccessPromote] = useState(false);
  const [selectedOffice, setSelectedOffice] = useState<OfficeProps | null>(null);
  const { data: fixDeskRequests, isLoading: isLoadingFixDeskRequests } = useGetAllFixDeskRequests();
  const fixDeskRequestsCount = fixDeskRequests ? fixDeskRequests.length : 0;  
  const { data: desksData } = useGetDesks();
  const desksCount = desksData ? desksData.length : 0;
  const { isShown, toggle, selectedId } = useModal();

  const onConfirm = () => {
    handleDelete(selectedId);
    toggle();
  };
  const onCancel = () => toggle();

  const PAGE_SIZE = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  
  const { data: users, isLoading } = useGetAllUsers(searchTerm);

  useEffect(() => {
    if (data) {
      setOffices(data);
    }
  }, [data]);

  const handleCreateDesk = async (data: DeskCreateFormPropsMu) => {
    console.log(data);
  };

  const handleDelete = (userId: string) => {
    adminDelete.mutate(userId);

    setSuccessMessage(true);
  };

  const handlePromote = (userId: string) => {
    adminPromote.mutate(userId);
    setSuccessPromote(true);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const totalUsers = users?.length || 0;
  const totalPages = Math.ceil(totalUsers / PAGE_SIZE);

  const filteredUsers = users?.filter((user: UserResponseDto) =>
    user.firstname.toLowerCase().includes(searchTerm.trim())
  );

  const paginatedUsers = filteredUsers?.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  useEffect(() => {
    if (successMessage) {
      setTimeout(() => {
        setSuccessMessage(false);
      }, 3000);
    }
  }, [successMessage]);

  useEffect(() => {
    if (successPromote) {
      setTimeout(() => {
        setSuccessPromote(false);
      }, 3000);
    }
  }, [successPromote]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handleSelectOffice = (office: OfficeProps) => {
    setSelectedOffice(office);
  };

  return (
    <section className="adminDashboardSection">
      <div className="dashOverViewParent container">
        <div className="dashOverViewChild">
          <div>
            <img src="/icons/usersIcons.svg" alt="User Icon"/>
          </div>

          <p className="dashOverViewParegraph">Users</p>
          <span>{totalUsers}</span>
        </div>

        <div className="dashOverViewChild">
          <div>
            <img src="/icons/requestIcon.svg" alt="User Icon"/>
          </div>
          <p className="dashOverViewParegraph">Fix Requests</p>
          <span>{fixDeskRequestsCount}</span>
        </div>

        <div className="dashOverViewChild">
          <div>
            <img src="/icons/officeIcon.svg" alt="User Icon"/>
          </div>
          <p className="dashOverViewParegraph">Offices</p>
          <span>{offices.length}</span>
        </div>

        <div className="dashOverViewChild">
          <div>
            <img src="/icons/deskIcon.svg" alt="User Icon"/>
          </div>
          <p className="dashOverViewParegraph">Desks</p>
          <span>{desksCount}</span>
        </div>
      </div>

      {successMessage && (
        <p className="successMessage">User successfully Deleted!</p>
      )}
      {successPromote && (
        <p className="successPromote">User successfully Promoted!</p>
      )}

      <div className="adminDashboardSectionMain container">
        <div className="paginationAndTitle">
          <div className="pagination">
            <button
              onClick={handlePreviousPage}
              className={`font-bold ${currentPage === 1 ? 'text-offWhite' : 'text-darkBlue'}`}
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              className={`font-bold ${
                currentPage === totalPages ? 'text-offWhite' : 'text-darkBlue'
              }`}
            >
              Next
            </button>
          </div>
          <div className="search mt-4 sm:mt-0">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by First Name"
              className="inputFields"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full container">
            <thead className="tableHead">
              <tr className="tHeadTr">
                <th className="tHeadTh">First Name</th>
                <th className="tHeadTh">Last Name</th>
                <th className="tHeadTh">Email</th>
                <th className="tHeadTh">Rolls</th>
                <th className="tHeadTh">Department</th>
                <th className="tHeadTdAction">Action</th>
              </tr>
            </thead>
            <tbody className="tableBody">
            {isLoading ? (
                  <tr className="tHeadTr">
                    <td className="tHeadTd" colSpan={6}>Loading...</td>
                  </tr>
                ) : paginatedUsers.length > 0 ? ( 
                  paginatedUsers.map((user: UserResponseDto) => (
                  <tr
                    key={user.id}
                    className="tBodyTr"
                  >
                    <td className="tHeadTd">{user.firstname}</td>
                    <td className="tHeadTd">{user.lastname}</td>
                    <td className="tHeadTd">{user.email}</td>
                    <td className="tHeadTd">{user.isAdmin ? "Admin" : "User"}</td>
                    <td className="tHeadTd">{user.department}</td>
                    <td className="tBodyTdAction">
                    {user.isAdmin == false  ?( <div>
                    <button
                      className="tableBtnRed"
                      onClick={() => toggle(user.id)}
                    >
                      Delete
                    </button>
                    <Modal
                      isShown={isShown}
                      hide={toggle}
                      modalContent={
                        <ConfirmationModal
                            onConfirm={onConfirm}
                            onCancel={onCancel}
                            message="Are you sure you want to delete this user?"
                      />
                      }
                    /></div>) : (<p
                      className="tableBtnDisabled"
                      
                    >
                      Admin
                    </p>
                    )}
                    {user.isAdmin == false ?(
                    <button 
                        onClick={() => handlePromote(user.id)}
                        className="tableBtnGreen"
                      >
                        Promote
                      </button>) :(<p
                      className="tableBtnDisabled" 
                    >
                      Promote
                    </p>
                    )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="tableErrorMessage" colSpan={6}>No users found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <section className="py-4">
          <div>
            <FixDeskApproval/>
          </div>

          <div>
            <AllCommentsList />
          </div>

          <div>
            <AllOfficesList />
          </div>

          <div>
            <AllDesksList />
          </div>
        </section>
        <section className="createOfficesSection ccontainer">
          <div className="mainDiv">
            <CreateOfficesForm />
          </div>
          <div className="mainDiv">
            <CreateDesksForm
              onCreateDesk={handleCreateDesk}
              offices={offices}
            />
          </div>
        </section>
      </div>
    </section>
  );
};