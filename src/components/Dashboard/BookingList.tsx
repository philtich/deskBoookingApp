import { BookingResponseDto } from "../../Types/types";

export const BookingList = ({
  bookingList,
  isLoading,
  totalPages,
  currentPage,
  handlePreviousPage,
  handleNextPage,
  handleCommentsList,
  handleCommentClick,
  navigate,
  successMessage,
}) => {
  const PAGE_SIZE = 5;
  const paginatedBookings = bookingList?.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <div className="overflow-x-auto mt-16 md:mt-0">
      {successMessage && (
        <p className="successMessage">Comment has been successfully sent!</p>
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

        <div className="tablesTitle flex gap-4 mt-4 sm:mt-0">
          <button
            className="userTableBtnDark"
            onClick={() => navigate("/booking")}
          >
            Book a Desk
          </button>

          <h3>Booking List</h3>
        </div>
      </div>

      <table className="w-full container">
        <thead className="tableHead">
          <tr className="tHeadTr">
            <th className="tHeadTh">Start Date</th>
            <th className="tHeadTh">End Date</th>
            <th className="tHeadTh">Booked At</th>
            <th className="tHeadTh">User</th>
            <th className="tHeadTh">Desk</th>
            <th className="tHeadTh">Office</th>
            <th className="tHeadTdAction">Action</th>
          </tr>
        </thead>

        <tbody className="tableBody">
          {isLoading ? (
            <tr className="tBodyTr">
              <td className="tHeadTd" colSpan={6}>
                Loading...
              </td>
            </tr>
          ) : paginatedBookings && paginatedBookings.length > 0 ? (
            paginatedBookings.map((booking: BookingResponseDto) => (
              <tr key={booking.id} className="tBodyTr">
                <td className="tHeadTd">
                  {new Date(booking.dateStart).toLocaleString("en-US", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                  })}
                </td>

                <td className="tHeadTd">
                  {new Date(booking.dateEnd).toLocaleString("en-US", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                  })}
                </td>

                <td className="tHeadTd">
                  {new Date(booking.bookedAt).toLocaleString("en-US", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                  })}
                </td>

                <td className="tHeadTd">{booking.user.firstname}</td>

                <td className="tHeadTd">{booking.desk.label}</td>

                <td className="tHeadTd">{booking.desk.office.name}</td>

                <td className="tBodyTdAction">
                  <button
                    onClick={() => handleCommentsList(booking.desk.id)}
                    className="userTableBtnLight"
                  >
                    Show Comments
                  </button>
                  <button
                    onClick={() => handleCommentClick(booking.desk.id)}
                    className="userTableBtnDark"
                  >
                    Add Comments
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr className="tBodyTr">
              <td colSpan={6}>No bookings found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
