import { useEffect, useState } from "react";
import { useGetAllComments } from "../../Hooks/AdminAndUsersHooks/useGetAllComments";
import { useGetDeleteComments } from "../../Hooks/AdminAndUsersHooks/useGetDeleteComments.ts";
import { useQueryClient } from "@tanstack/react-query";
import { useModal } from "../common/ModalDelete/useModal.tsx";
import { Modal } from "../common/ModalDelete/Modal.tsx";
import { ConfirmationModal } from "../common/ModalDelete/ConfirmationModal.tsx";

const AllCommentsList = () => {
  const queryClient = useQueryClient();
  const deleteCommentMutation = useGetDeleteComments();
  const [currentPage, setCurrentPage] = useState(1);
  const { data: comments, isLoading, error } = useGetAllComments(currentPage);
  const [showFullCommentId, setShowFullCommentId] = useState<string | null>(
    null
  );
  const [successMessage, setSuccessMessage] = useState(false);
  const { isShown, toggle, selectedId } = useModal();

  const onConfirm = () => {
    handleDeleteComment(selectedId);
    toggle();
  };
  const onCancel = () => toggle();

  useEffect(() => {
    if (successMessage) {
      setTimeout(() => {
        setSuccessMessage(false);
      }, 3000);
    }
  }, [successMessage]);

  if (isLoading) {
    return <p>Loading comments...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const handleDeleteComment = async (commentId: string) => {
    try {
      await deleteCommentMutation.mutateAsync(commentId);
      queryClient.invalidateQueries("comments");
      setSuccessMessage(true);
    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
  };

  const commentsPerPage = 10;

  const handleNextPage = () => {
    if (comments && comments.length === commentsPerPage) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const toggleShowFullComment = (commentId: string) => {
    setShowFullCommentId((prevId) => (prevId === commentId ? null : commentId));
  };

  return (
    <section>
      {successMessage && (
        <p className="successMessage">Comment successfully Deleted!</p>
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
          <span>Page {currentPage}</span>
          <button
            onClick={handleNextPage}
            className={`font-bold ${
              !comments || comments.length < commentsPerPage
                ? "text-offWhite"
                : "text-darkBlue"
            }`}
            disabled={!comments || comments.length < commentsPerPage}
          >
            Next
          </button>
        </div>

        <div className="tablesTitle">
          <h3>
            Comments List
          </h3>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full container">
          <thead className="tableHead">
            <tr className="tHeadTr">
              <th className="tHeadTh">First Name</th>
              <th className="tHeadTh">Last Name</th>
              <th className="tHeadTh">Desk</th>
              <th className="tHeadTh">Comments</th>
              <th className="tHeadTdAction">Action</th>
            </tr>
          </thead>
          <tbody className="tableBody">
            {comments && comments.length > 0 ? (
              comments.map((comment) => (
                <tr className="tBodyTr" key={comment.id}>
                  <td className="tHeadTd">
                    {comment.user.firstname}
                  </td>

                  <td className="tHeadTd">
                    {comment.user.lastname}
                  </td>
                  
                  <td className="tHeadTd">
                    {comment.desk.label}
                  </td>

                  <td className="tHeadTd">
                    {showFullCommentId === comment.id ? (
                      <span className="pr-8">{comment.comment}</span>
                    ) : (
                      <span>
                        {comment.comment.split(" ").slice(0, 10).join(" ")}
                        {" ... "}
                        <button
                          onClick={() => toggleShowFullComment(comment.id)}
                          className="text-darkBlue underline"
                        >
                          See more
                        </button>
                      </span>
                    )}
                    {showFullCommentId === comment.id && (
                      <button
                        onClick={() => toggleShowFullComment(comment.id)}
                        className="text-darkBlue underline"
                      >
                        See less
                      </button>
                    )}
                  </td>

                  <td className="tBodyTdAction">
                  <button
                      className="tableBtnRed"
                      onClick={() => toggle(comment.id)}
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
                          message="Are you sure you want to delete this comment?"
                      />
                    }
                  />
                  </td>
                </tr>
              ))
            ) : (
              <tr className="tBodyTr">
                <td colSpan={3} className="tableErrorMessage">
                  <p className="w-full text-center">No comments found, go to previous page.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AllCommentsList;