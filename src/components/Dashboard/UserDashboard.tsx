import { useGetProfile } from "../../Hooks/ProfileHooks/useGetProfile";
import { useNavigate } from "react-router";
import { useGetBookingList } from "../../Hooks/BookingHooks/useGetBookingList";
import { useGetCreateComment } from "../../Hooks/AdminAndUsersHooks/useGetCreateComment";
import { useEffect, useState } from "react";
import { useGetUserComments } from "../../Hooks/AdminAndUsersHooks/useGetUserComments";
import { ShowFixDeskRequestUser } from "./ShowFixDeskRequestUser";
import { FavoriteList } from "./FavoriteList";
import { BookingList } from "./BookingList";
import { UserCommentsList } from "./UserCommentsList";

export const UserDashboard = () => {
  const { data } = useGetProfile();
  const navigate = useNavigate();
  const userId = data?.id;
  const { data: bookingList, isLoading } = useGetBookingList(userId);
  const createComment = useGetCreateComment();
  const [comment, setComment] = useState("");
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [selectedDesk, setSelectedDesk] = useState(null);
  const [successMessage, setSuccessMessage] = useState(false);
  const [showCommentsSection, setShowCommentsSection] = useState(false);

  const PAGE_SIZE = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const totalBookings = bookingList?.length || 0;
  const totalPages = Math.ceil(totalBookings / PAGE_SIZE);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const [commentsPage, setCommentsPage] = useState(1);
  const { data: userComments, isLoading: commentsLoading } = useGetUserComments(
    userId,
    commentsPage
  );

  const commentsPerPage = 10;

  const handleNextCommentsPage = () => {
    if (userComments && userComments.length === commentsPerPage) {
      setCommentsPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousCommentsPage = () => {
    setCommentsPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleCommentClick = (deskId) => {
    if (selectedDesk === deskId) {
      setShowCommentInput(!showCommentInput);
    } else {
      setSelectedDesk(deskId);
      setShowCommentInput(true);
    }
    setShowCommentsSection(false);
  };

  const handleCommentsList = (deskId) => {
    if (selectedDesk === deskId) {
      setShowCommentsSection(!showCommentsSection);
    } else {
      setSelectedDesk(deskId);
      setShowCommentsSection(true);
    }
    setShowCommentInput(false);
  };

  const handleSendComment = () => {
    createComment.mutate({ comment, desk: selectedDesk });
    setComment("");
    setShowCommentInput(false);
    setSuccessMessage(true);
  };

  useEffect(() => {
    if (successMessage) {
      setTimeout(() => {
        setSuccessMessage(false);
      }, 3000);
    }
  }, [successMessage]);

  return (
    <section className="userDashboardSection">
      <div className="userDashboardSectionMain container">
        <BookingList
          bookingList={bookingList}
          handlePreviousPage={handlePreviousPage}
          handleNextPage={handleNextPage}
          currentPage={currentPage}
          totalPages={totalPages}
          handleCommentClick={handleCommentClick}
          handleCommentsList={handleCommentsList}
          isLoading={isLoading}
          navigate={navigate}
          successMessage={successMessage}
        />

        {(showCommentInput || showCommentsSection) && (
          <UserCommentsList
            userComments={userComments}
            commentsLoading={commentsLoading}
            commentsPage={commentsPage}
            handlePreviousCommentsPage={handlePreviousCommentsPage}
            handleNextCommentsPage={handleNextCommentsPage}
            showCommentInput={showCommentInput}
            handleSendComment={handleSendComment}
            comment={comment}
            setComment={setComment}
            showCommentsSection={showCommentsSection}
            commentsPerPage={commentsPerPage}
          />
        )}

        <FavoriteList />

        <ShowFixDeskRequestUser />
      </div>
    </section>
  );
};
