import { useState, useEffect } from "react";
import { useGetDesks } from "../../Hooks/BookingHooks/useGetAllDesks";
import { useGetDeleteDesk } from "../../Hooks/AdminAndUsersHooks/useGetDeleteDesk";
import { DeskProps } from "../../Types/types";
import { useModal } from "../common/ModalDelete/useModal";
import { ConfirmationModal } from "../common/ModalDelete/ConfirmationModal";
import { Modal } from "../common/ModalDelete/Modal";

export const AllDesksList = () => {
  const { data: desksData, isLoading, isError } = useGetDesks();
  const [currentPage, setCurrentPage] = useState(1);
  const desksPerPage = 5;
  const totalPages = Math.ceil((desksData?.length || 0) / desksPerPage);
  const deleteDeskMutation = useGetDeleteDesk();
  const [successMessage, setSuccessMessage] = useState(false);

  useEffect(() => {
    if (successMessage) {
      setTimeout(() => {
        setSuccessMessage(false);
      }, 3000);
    }
  }, [successMessage]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleDelete = async (deskId: DeskProps) => {
    try {
      await deleteDeskMutation.mutateAsync(deskId);
      setSuccessMessage(true);
    } catch (error) {
      console.error("Failed to delete desk:", error.message);
    }
  };

  const { isShown, toggle, selectedId } = useModal();

  const onConfirm = () => {
    handleDelete(selectedId);
    toggle();
  };
  const onCancel = () => toggle();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching Desks.</div>;
  }

  const paginatedDesks = desksData?.slice(
    (currentPage - 1) * desksPerPage,
    currentPage * desksPerPage
  );

  return (
    <section>
      {successMessage && (
        <p className="successMessage">Desk successfully Deleted!</p>
      )}
      <div className="paginationAndTitle">
        <div className="pagination">
          <button
            onClick={handlePreviousPage}
            className={`font-bold ${
              currentPage === 1 ? "text-offWhite" : "text-darkBlue"
            }`}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            className={`font-bold ${
              currentPage === totalPages ? "text-offWhite" : "text-darkBlue"
            }`}
          >
            Next
          </button>
        </div>

        <div className="tablesTitle">
          <h3>Desks List</h3>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full container">
          <thead className="tableHead">
            <tr className="tHeadTr">
              <th className="tHeadTh">Label</th>
              <th className="tHeadTh">Type</th>
              <th className="tHeadTh">Office Name</th>
              <th className="tHeadTdAction">Action</th>
            </tr>
          </thead>

          <tbody className="tableBody">
            {paginatedDesks && paginatedDesks.length > 0 ? (
              paginatedDesks.map((desk) => (
                <tr key={desk.id} className="tBodyTr">
                  <td className="tHeadTd">{desk.label}</td>
                  <td className="tHeadTd">{desk.fixdesk ? "Fix" : "Flex"}</td>
                  <td className="tHeadTd">{desk.office.name}</td>
                  <td className="tBodyTdAction">
                    <button
                      className="tableBtnRed"
                      onClick={() => toggle(desk.id)}
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
                          message="Are you sure you want to delete this desk?"
                        />
                      }
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="tableErrorMessage" colSpan={4}>
                  No Desks found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AllDesksList;
