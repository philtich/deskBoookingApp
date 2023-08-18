import { useParams } from "react-router-dom"
import { useGetSingleDesk } from '../../Hooks/BookingHooks/useGetSingleDesk';
import Footer from '../common/Footer';
import Header from '../common/Header';
import Sidebar from '../common/Sidebar';
import {  Link } from "react-router-dom";
import { BookingForm } from './BookingForm';

export const DeskView = () => {
  const { id }:any = useParams()
  const { data } = useGetSingleDesk(id);
  const pageTitle = 'Single Desk';
  const equipment = data?.equipment;
    
  return (
    <main>
    {/* sidenav   */}
    <Sidebar />
    {/* End sidenav */}

    <div className="dashMain">
      {/* Header */}
      <Header pageTitle={pageTitle} />
      {/* End Header */}

      {/* Single Desk Section */}
      <section className='deskViewSection container'>   
        <div className='deskParent'>
          <div className='deskImgDiv'>
            <img
              src="/images/pparnxoxo-AYcUMSVHu0U-unsplash.jpg"
              alt="Office Image"
            />
          </div>

          <div className='deskInfo'>
            <div className='deskInfoParent'>
              <h2 className='DeskTitle'>
                Desk Information
              </h2>

              <Link to="/booking"
                className='bookingLinks'
              >
                <img
                  src="/icons/arrowBackIcon.svg"
                  alt="User Avatar Icon"
                  className='w-8 h-6'
                />
                Back 
              </Link>
            </div>

            <div className='deskLabel'>
              <span className='deskInfoSpan'>Desk-Name: </span>
              <span className="deskInfoSpanTitle">
                {data?.label}
              </span>
            </div>

            <div className='deskLabel'>
              <span className='deskInfoSpan'>Equipment: </span>
              <span className="deskInfoSpanTitle">
                {equipment?.join(', ')}
              </span>
            </div>

            {data?.fixdesk == null ?(<div className="py-8">
              <BookingForm id={id}/>
            </div>) : (<p className="text-red font-bold">No booking possible - this desk is already a fixdesk!</p>)}
          </div>    
        </div>
      </section>
      {/* End Single Desk Section */}

      {/* Reservations */}
      <section className="reservationsSection py-8 container">
        <div className='py-6'>
          <span className='deskReservationsTite'>Current Reservations: </span>
        </div>

        <div className="reservationsGrid">
          {data?.bookings[0] != null ? (
          data?.bookings.map((booking) => (
          <div key={booking.id} className="reservationsGridCard">
            <div>
              <span className='gridInfoSpan'>Start: </span>
              <span className="gridSpanDetails">
                {new Date(booking.dateStart).toLocaleString("en-US",
                  {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                  }
                )}
              </span>
            </div>
            
            <div>
              <span className='gridInfoSpan'>End: </span>
              <span className="gridSpanDetails">
                {new Date(booking.dateEnd).toLocaleString("en-US",
                  {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                  }
                )}
              </span>
            </div>
          <div>
        </div>
      </div>
    
      ))) : 
      <div className='deskNoBookingMess'>
        No current bookings!
      </div>
      }
    </div>
    </section>
    {/* End Reservations */}

    {/* Footer */}
    <Footer />
    {/* End Footer */}
    </div>
  </main>
)}