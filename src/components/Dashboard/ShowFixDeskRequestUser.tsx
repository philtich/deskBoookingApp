import { UseGetShowAllFixDeskRequestsUser } from '../../Hooks/BookingHooks/useGetShowAllFixDeskRequestsUser';
import { FixDeskApprovalProps } from '../../Types/types';

export type RequestUserProps ={
  id: string | undefined
}

export const ShowFixDeskRequestUser = ()  => {
  const { data } = UseGetShowAllFixDeskRequestsUser();
  const fixDeskBookings = data; 

  return (
    <div className="overflow-x-auto">
      <div className="paginationAndTitle">
        <div className="tablesTitle">
          <h3>
            Your Fix-Desk requests
          </h3>
        </div>
      </div>
      
      <table className="w-full container">
        <thead className="tableHead">
          <tr className="tHeadTr">
            <th className="tHeadTh">Desk</th>
            <th className="tHeadTh">Start</th>
            <th className="tHeadTdAction">Status</th>
          </tr>
        </thead>

        <tbody className="tableBody">
          {fixDeskBookings?.map((booking: FixDeskApprovalProps) => (
            <tr
              key={booking.id}
              className='tBodyTr'
            >
              <td className='tHeadTd'>
                {booking.desk.label}
              </td>
              
              <td className='tHeadTd'>
                {new Date(booking.createdAt).toLocaleString("en-US",
                    {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                    }
                  )}
              </td>

              <td className='tBodyTdAction'>
                <p className={`${(booking.status == "approved" ) ? ("text-green") : ("text-red")}`}>
                  {booking.status}
                </p>
              </td>
            </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}
