// import { useState, useEffect } from 'react';

// const BookingCalendar = ({ venueId }) => {
//     const [date, setDate] = useState(new Date());
//     const [selectedDate, setSelectedDate] = useState(new Date());
//     const [availableDates, setAvailableDates] = useState([]);
//     const [bookings, setBookings] = useState([]);
//     const [showBookingDetails, setShowBookingDetails] = useState(false);
//     const [guests, setGuests] = useState(0);
//     const [booking, setBooking] = useState({
//         dateFrom: "",
//         dateTo: "",
//         guests: 0,
//         venueId: venueId, // setting the venueId dynamically from props
//     });
//     const [showBookingSuccess, setShowBookingSuccess] = useState(false);
//     const [showBookingError, setShowBookingError] = useState(false);

//     useEffect(() => {
//         fetch("https://v2.api.noroff.dev/holidaze/bookings")
//         .then((response) => response.json())
//         .then((data) => {
//             setBookings(data);
//         })
//         .catch((error) => {
//             console.error("Error fetching bookings:", error);
//         });
// }, []);

// const handleDateChange = (event) => {
//     const newDate = new Date(event.target.value);
//     setSelectedDate(newDate);
//     setBooking({ ...booking, dateFrom: newDate.toISOString(), dateTo: newDate.toISOString() });
// };

// const handleGuestsChange = (event) => {
//     const newGuests = parseInt(event.target.value, 10);
//     setGuests(newGuests);
//     setBooking({ ...booking, guests: newGuests });
// };

// const handleBooking = () => {
//     fetch("https://v2.api.noroff.dev/holidaze/bookings", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(booking),
//     })
//         .then((response) => {
//             if (response.ok) {
//                 setShowBookingSuccess(true);
//                 setShowBookingError(false);
//                 setBookings([...bookings, booking]);
//             } else {
//                 setShowBookingError(true);
//                 setShowBookingSuccess(false);
//             }
//         })
//         .catch((error) => {
//             console.error("Error creating booking:", error);
//             setShowBookingError(true);
//             setShowBookingSuccess(false);
//         });
// };

// return (
//     <div>
//         <h1>Calendar</h1>
//         <input 
//             type="date" 
//             value={selectedDate.toISOString().split('T')[0]} 
//             onChange={handleDateChange} 
//         />
//         <input 
//             type="number" 
//             value={guests} 
//             onChange={handleGuestsChange} 
//             placeholder="Number of Guests" 
//         />
//         <button onClick={() => setShowBookingDetails(true)}>Book</button>
        
//         {showBookingDetails && (
//             <div>
//                 <h2>Booking Details</h2>
//                 <p>Date: {selectedDate.toDateString()}</p>
//                 <p>Guests: {guests}</p>
//                 <button onClick={handleBooking}>Confirm Booking</button>
//             </div>
//         )}

//         {showBookingSuccess && <p>Booking was successful!</p>}
//         {showBookingError && <p>There was an error with your booking. Please try again.</p>}

//         <h2>Existing Bookings</h2>
//         <ul>
//             {bookings.map((booking, index) => (
//                 <li key={index}>
//                     From: {new Date(booking.dateFrom).toDateString()} To: {new Date(booking.dateTo).toDateString()}, Guests: {booking.guests}
//                 </li>
//             ))}
//         </ul>
//     </div>
// );
// };

// export default BookingCalendar;

