import { useEffect, useState } from "react";
import { useGetAllOffices } from "../../Hooks/OfficesHooks/useGetAllOffices";
import { OfficeProps } from "../../Types/types";
import EditOfficeForm from "./EditOfficeForm";
import { useGetUpdateOffice } from "../../Hooks/AdminAndUsersHooks/useGetUpdateOffice";
import { useGetDeleteOffice } from "../../Hooks/AdminAndUsersHooks/useGetDeleteOffice";
import { ConfirmationModal } from "../common/ModalDelete/ConfirmationModal";
import { Modal } from "../common/ModalDelete/Modal";
import { useModal } from "../common/ModalDelete/useModal";

export const AllOfficesList = () => {
  const { data: offices, isLoading, isError } = useGetAllOffices();
  const [selectedOffice, setSelectedOffice] = useState<OfficeProps | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const mutation = useGetUpdateOffice();
  const deleteMutation = useGetDeleteOffice();
  const [successMessage, setSuccessMessage] = useState(false);
  const [successDeleteMessage, setSuccessDeleteMessage] = useState(false);

  const officesPerPage = 5;
  const totalPages = Math.ceil((offices?.length || 0) / officesPerPage);

  useEffect(() => {
    if (successMessage) {
      setTimeout(() => {
        setSuccessMessage(false);
      }, 3000);
    }
  }, [successMessage]);

  useEffect(() => {
    if (successDeleteMessage) {
      setTimeout(() => {
        setSuccessDeleteMessage(false);
      }, 3000);
    }
  }, [successDeleteMessage]);
  
  const handleEdit = (officeId: string) => {
    const office = offices?.find((office) => office.id === officeId);
    setSelectedOffice(office ?? null);
  };

  const handleEditSubmit = async (updatedOffice: OfficeProps) => {
    try {
      await mutation.mutateAsync({ formData: updatedOffice, officeId: updatedOffice.id });

      setSelectedOffice(null);
    } catch (error) {
      console.log("Error updating office:", error);
    }
  };

  const handleDelete = async (officeId: string) => {
    try {
      await deleteMutation.mutateAsync({ id: officeId }); 
      setSelectedOffice(null);
      setSuccessDeleteMessage(true);
    } catch (error) {
      console.log("Error deleting office:", error);
    }
  };

  const { isShown, toggle, selectedId } = useModal()

  const onConfirm = () => {
    handleDelete(selectedId);
    toggle();
  };
  const onCancel = () => toggle();

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching offices.</div>;
  }

  const paginatedOffices = offices?.slice(
    (currentPage - 1) * officesPerPage,
    currentPage * officesPerPage
  );

  return (
    <section>
      {successMessage && (
        <p className="successMessage">Office successfully Updated!</p>
      )}
      {successDeleteMessage && (
        <p className="successMessage">Office successfully Deleted!</p>
      )}

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

        <div className="tablesTitle">
          <h3>
            Offices List
          </h3>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full container">
          <thead className="tableHead">
            <tr className="tHeadTr">
              <th className="tHeadTh">Office Name</th>
              <th className="tHeadTh">Columns</th>
              <th className="tHeadTh">Rows</th>
              <th className="tHeadTdAction">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="tableBody">
          {paginatedOffices?.length > 0 ? (
              paginatedOffices.map((office) => (
                <tr key={office.id} className="tBodyTr">
                  <td className="tHeadTd">
                    {office.name}
                  </td>
                  <td className="tHeadTd">
                    {office.columns}
                  </td>
                  <td className="tHeadTd">
                    {office.rows}
                  </td>

                  <td className="tBodyTdAction">
                    <button
                        onClick={() => handleEdit(office.id)}
                        className="tableBtnGreen"
                    >
                        Edit
                    </button>

                    <button
                      className="tableBtnRed"
                      onClick={() => toggle(office.id)}
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
                          message="Are you sure you want to delete this office?"
                    />
                    }
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  className="tableErrorMessage"
                  colSpan={6}
                >
                  No Offices found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selectedOffice && (
      <EditOfficeForm
        office={selectedOffice}
        onSubmit={(data) => handleEditSubmit(data)}
        onClose={() => setSelectedOffice(null)}
      />
      )}
    </section>
  );
};

export default AllOfficesList;
