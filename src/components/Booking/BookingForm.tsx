import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { BookingRequest, BookingSchema } from '../../Types/types';
import { useAddNewBookings } from '../../Hooks/BookingHooks/useAddNewFlexBooking';
import { useCreateFixDeskRequest } from '../../Hooks/BookingHooks/useCreateFixDeskRequest';
import { useState } from 'react';

export type BookingFormProps ={
  id: string
}

export const BookingForm = ({ id }: BookingFormProps) => {
  const bookingMutation = useAddNewBookings();
  const flexdeskMutation = useCreateFixDeskRequest(id);
  const [errorMessage, setErrormessage] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<BookingRequest>({
    resolver: yupResolver(BookingSchema),
  });

  const onBooking = handleSubmit((formData: BookingRequest) => {
    bookingMutation.mutate(formData); 
  })
   
  const callFixDesk = async () => {
    try{
    await flexdeskMutation.mutateAsync()    }
    catch{
      setErrormessage('error')
    }
  }

  const today = new Date()
  const rightNow = new Date(today).toISOString().split("T")[0]
  const numberOfDaysToAdd = 28;
  const result = today.setDate(today.getDate() + numberOfDaysToAdd);
  const maxDate = new Date(result).toISOString().split("T")[0]
  
  return (
    <section>
      <div className='py-8'>
          {bookingMutation?.status == "success" && (
            <p className="successMessage">You have booked your desk successfully!</p>)}
            {bookingMutation?.error?.response?.data?.message === "This booking is too long or not in the valid range of 4 weeks." && <p className='errorsMessage text-center py-4'>You are not allowed to book a desk on weekends and/or Start Date must be before End Date!</p>}
            {bookingMutation?.error?.response?.data?.statusCode == 409 && <p className='errorsMessage text-center py-4'>There is already a booking active on this dates!</p>}
            {errorMessage && (<p className='errorsMessage text-center py-4'>You have already made a Fix-Desk-Request for another desk or another User requested this desk!</p>)} 
            <form  onSubmit={handleSubmit(onBooking)} className='formGroup'>
              <div>
                <h4 
                  className='pb-4 text-2xl font-bold text-darkBlue uppercase'>
                  Your Flex-Desk-Booking
                </h4>
                <span className="italic text-sm text-darkBlue">
                  Please note that we cannot accept bookings for Saturdays or Sundays.
                </span>
              </div>

              <div className="mb-4">
                <label className='labels'>
                  Start Date:
                </label>
                <input
                  type="date"
                  min={`${rightNow}`}
                  max={`${maxDate}`}
                  {...register("dateStart")}
                  className={`inputFields ${
                    errors.dateStart ? 'border-b-red' : 'border-b-darkGray'
                  }`}
                />
                {errors.dateStart && (
                  <p className="errorsMessage">{errors.dateStart.message}</p>
                )}
              </div>

              <div className="mb-4">
                <label className='labels'>
                  End Date:
                </label>
                <input
                  type="date"
                  min={`${rightNow}`}
                  max={`${maxDate}`}
                  {...register("dateEnd")}
                  className={`inputFields ${
                    errors.dateStart ? 'border-b-red' : 'border-b-darkGray'
                  }`}
                />
                {errors.dateStart && (
                  <p className="errorsMessage">{errors.dateEnd?.message}</p>
                )}
              </div>

              <div className="mb-4">
                <input
                  type="hidden"
                  value={`${id}`}
                  {...register("desk")}
                  className={`inputFields ${
                    errors.desk ? 'border-b-red' : 'border-b-darkGray'
                  }`}
                />
                {errors.desk && (
                  <p className="errorsMessage">{errors.desk?.message}</p>
                )}
              </div>
              
            <button
              type="submit"
              className="formBtn">
              Book 
            </button>
          </form> 
      </div>

      <button onClick={callFixDesk}
        type="submit"
        className="formBtn py-4"
      >
        Require as Fix Desk 
      </button>
    </section>
  )
}