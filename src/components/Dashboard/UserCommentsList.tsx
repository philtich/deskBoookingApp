import { useState } from "react";

export const UserCommentsList = ({
  userComments,
  commentsLoading,
  commentsPage,
  handlePreviousCommentsPage,
  handleNextCommentsPage,
  showCommentInput,
  handleSendComment,
  comment,
  setComment,
  showCommentsSection,
  commentsPerPage,
}) => {
  const [showFullCommentId, setShowFullCommentId] = useState<string | null>(
    null
  );

  const toggleShowFullComment = (commentId: string) => {
    setShowFullCommentId((prevId) => (prevId === commentId ? null : commentId));
  };

  return (
    <div className="overflow-x-auto">
      <div className="my-4">
        {showCommentInput && (
          <div className="flex flex-col gap-4 md:flex-row">
            <input
              type="text"
              placeholder="Add your comment here"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="inputFields"
            />
            <button onClick={handleSendComment} className="userTableBtnDark">
              Add your Comment
            </button>
          </div>
        )}
        {showCommentsSection && (
          <div className="paginationAndTitle">
            <div className="pagination">
              <button
                onClick={handlePreviousCommentsPage}
                className={`font-bold ${
                  commentsPage === 1 ? "text-offWhite" : "text-darkBlue"
                }`}
              >
                Previous
              </button>
              <span>Page {commentsPage}</span>
              <button
                onClick={handleNextCommentsPage}
                className={`font-bold ${
                  !userComments || userComments.length < commentsPerPage
                    ? "text-offWhite"
                    : "text-darkBlue"
                }`}
                disabled={
                  !userComments || userComments.length < commentsPerPage
                }
              >
                Next
              </button>
            </div>

            <div className="tablesTitle">
              <h3>User Comments</h3>
            </div>
          </div>
        )}

        {showCommentsSection && (
          <table className="w-full container">
            <thead className="tableHead">
              <tr className="tHeadTr">
                <th className="tHeadTh">Department</th>
                <th className="tHeadTh">Desk</th>
                <th className="tHeadTh">Comment</th>
              </tr>
            </thead>
            <tbody className="tableBody">
              {commentsLoading ? (
                <tr className="tBodyTr">
                  <td colSpan={3} className="tHeadTd">
                    Loading...
                  </td>
                </tr>
              ) : userComments && userComments.length > 0 ? (
                userComments.map((comment) => (
                  <tr key={comment.id} className="tBodyTr">
                    <td className="tHeadTd">{comment.user.department}</td>
                    <td className="tHeadTd">{comment.desk.label}</td>
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
                  </tr>
                ))
              ) : (
                <tr className="tBodyTr">
                  <td colSpan={3} className="text-red font-bold">
                    No comments found, go to the previous page.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
