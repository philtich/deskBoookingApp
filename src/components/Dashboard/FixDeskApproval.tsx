import { useState, useEffect } from "react";
import { FixDeskApprovalProps } from '../../Types/types';
import { useGetApproveFixdesks } from '../../Hooks/AdminAndUsersHooks/useGetApproveFixdesks';
import { useGetAllFixDeskRequests } from '../../Hooks/AdminAndUsersHooks/useGetAllFixDeskRequests';

export const FixDeskApproval = () => {
  const { data } = useGetAllFixDeskRequests();
  const [requests, setRequests] = useState<FixDeskApprovalProps[]>([]);
  const [fixDeskId, setfixDeskId] = useState ('');
  const [fixDeskStatus, setfixDeskStatus] = useState ('');
  const approveFixdesks = useGetApproveFixdesks(fixDeskId, fixDeskStatus);
  const [successMessage, setSuccessMessage] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const requestsPerPage = 5;

  const indexOfLastRequest = currentPage * requestsPerPage;
  const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;

  const currentRequests = requests.slice(indexOfFirstRequest, indexOfLastRequest);
  const totalPages = Math.ceil(requests.length / requestsPerPage);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };
    
  useEffect(() => {
    if (data) {
      setRequests(data);
    }
  }, [data]);

  useEffect(() => {
    if (successMessage) {
      setTimeout(() => {
        setSuccessMessage(false);
      }, 3000);
    }
  }, [successMessage]);

  const approveFixDeskRequest = (id: string) => {
    setfixDeskId(id);

    setfixDeskStatus("approved");
    approveFixdesks.mutate();
    setSuccessMessage(true);    
  }

  const rejectFixDeskRequest = (id: string) => {
    setfixDeskId(id);
    
    setfixDeskStatus("rejected");
    approveFixdesks.mutate();       
  } 
    
  return (
    <section>
      {successMessage && (
        <p className="successMessage">Fix Desk successfully approved!</p>
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
            Fix desk requests
          </h3>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full container">
          <thead className="tableHead">
            <tr className="tHeadTr">
              <th className="tHeadTh">Table Name</th>
              <th className="tHeadTh">First Name</th>
              <th className="tHeadTh">Last Name</th>
              <th className="tHeadTh">Status</th>
              <th className="tHeadTdAction">Action</th>
            </tr>
          </thead>
          
          <tbody className="tableBody">
            {currentRequests.length > 0 ? (
              currentRequests.map((request) => (
                <tr key={request.id} className="tBodyTr">
                  <td className="tHeadTd">{request.desk.label}</td>
                  <td className="tHeadTd">{request.user.firstname}</td>
                  <td className="tHeadTd">{request.user.lastname}</td>
                  <td className={`tHeadTd ${(request.status === "approved" ) && "text-green"} 
                    ${(request.status === "rejected" ) && "text-red"} 
                    ${(request.status === "notreviewed" ) && "text-orange"}`}
                  >
                    {request.status}
                  </td>
                  <td className="tBodyTdAction">
                    {request.status === "notreviewed" && (
                      <div className="flex justify-center gap-1 md:gap-6 items-center">
                        <button 
                          type='submit'
                          onClick={() => approveFixDeskRequest(request.id)}
                        >
                          ✓
                        </button>
                        <button 
                          onClick={() => rejectFixDeskRequest(request.id)}
                        >
                          X
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="tableErrorMessage" colSpan={4}>No requests found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}
