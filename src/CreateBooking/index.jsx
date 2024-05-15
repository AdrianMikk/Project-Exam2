import { useState } from "react";
// import { v4 as uuidv4 } from 'uuid'; // Import UUID library

const CreateBooking = () => {
  const [venuePrice, setVenuePrice] = useState(""); 
  const [bookingDetails, setBookingDetails] = useState({
    name: "",
    city: "",
    country: "",
    continent: "",
    address: "",
    maxGuests: "",
    wifi: false,
    parking: false,
    breakfast: false,
    petsAllowed: false,
    imageURL: "",
    description: ""
  });
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    const apiKey = import.meta.env.VITE_API_KEY;
    const accessToken = import.meta.env.VITE_TOKEN_KEY;

    console.log('apiKey:', apiKey);
    console.log('accessToken:', accessToken);

    console.log('venuePrice:', venuePrice);
    console.log('bookingDetails:', bookingDetails);

    const bookingData = {
      dateFrom: new Date().toISOString(),
      dateTo: new Date().toISOString(),
      guests: parseInt(bookingDetails.maxGuests), 
      price: parseInt(venuePrice),
      name: bookingDetails.name,
      city: bookingDetails.city,
      country: bookingDetails.country,
      continent: bookingDetails.continent,
      address: bookingDetails.address,
      maxGuests: parseInt(bookingDetails.maxGuests),
      wifi: bookingDetails.wifi,
      parking: bookingDetails.parking,
      breakfast: bookingDetails.breakfast,
      petsAllowed: bookingDetails.petsAllowed,
      imageURL: bookingDetails.imageURL,
      description: bookingDetails.description
    };

    console.log('bookingData:', bookingData);

    fetch('https://v2.api.noroff.dev/holidaze/venues', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-noroff-api-key': apiKey,
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(bookingData),
    })
      .then((response) => {
        console.log('Response status:', response.status);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log('Booking created successfully:', data);
        // Handle successful booking
        setBookingSuccess(true);
      })
      .catch((error) => {
        console.error('Error creating booking:', error);
        setBookingSuccess(false);
      });
  };

  // // Function to generate a UUID
  // const generateUUID = () => {
  //   return uuidv4(); // Generate a random UUID
  // };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Create Venue</h1>
      {/* Venue Selection */}
      <div className="mb-6">
        <label htmlFor="name" className="block mb-2 text-sm font-semibold">Name</label>
        <input
          type="text"
          id="name"
          value={bookingDetails.name}
          onChange={(e) => setBookingDetails({ ...bookingDetails, name: e.target.value })}
          className="border border-gray-300 rounded-md py-2 px-3 w-full"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="venuePrice" className="block mb-2 text-sm font-semibold">Price:</label>
        <input
          type="text"
          id="venuePrice"
          value={venuePrice}
          onChange={(e) => setVenuePrice(e.target.value)}
          className="border border-gray-300 rounded-md py-2 px-3 w-full"
        />
      </div>
      {/* Booking Details */}
      <form id="bookingForm" onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="city" className="block mb-2 text-sm font-semibold">City:</label>
          <input
            type="text"
            id="city"
            value={bookingDetails.city}
            onChange={(e) => setBookingDetails({ ...bookingDetails, city: e.target.value })}
            className="border border-gray-300 rounded-md py-2 px-3 w-full"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="country" className="block mb-2 text-sm font-semibold">Country:</label>
          <input
            type="text"
            id="country"
            value={bookingDetails.country}
            onChange={(e) => setBookingDetails({ ...bookingDetails, country: e.target.value })}
            className="border border-gray-300 rounded-md py-2 px-3 w-full"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="address" className="block mb-2 text-sm font-semibold">Address:</label>
          <input
            type="text"
            id="address"
            value={bookingDetails.address}
            onChange={(e) => setBookingDetails({ ...bookingDetails, address: e.target.value })}
            className="border border-gray-300 rounded-md py-2 px-3 w-full"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="maxGuests" className="block mb-2 text-sm font-semibold">Max Guests:</label>
          <input
            type="number"
            id="maxGuests"
            value={bookingDetails.maxGuests}
            onChange={(e) => setBookingDetails({ ...bookingDetails, maxGuests: e.target.value })}
            className="border border-gray-300 rounded-md py-2 px-3 w-full"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="imageURL" className="block mb-2 text-sm font-semibold">Image URL:</label>
          <input
            type="text"
            id="imageURL"
            value={bookingDetails.imageURL}
            onChange={(e) => setBookingDetails({ ...bookingDetails, imageURL: e.target.value })}
            className="border border-gray-300 rounded-md py-2 px-3 w-full"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="description" className="block mb-2 text-sm font-semibold">Description:</label>
          <textarea
            id="description"
            value={bookingDetails.description}
            onChange={(e) => setBookingDetails({ ...bookingDetails, description: e.target.value })}
            className="border border-gray-300 rounded-md py-2 px-3 w-full h-32"
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-semibold">Amenities:</label>
          <div className="flex flex-wrap items-center">
            <label className="mr-4 flex items-center">
              <input
                type="checkbox"
                checked={bookingDetails.wifi}
                onChange={(e) => setBookingDetails({ ...bookingDetails, wifi: e.target.checked })}
                className="mr-2"
              />
              Wifi
            </label>
            <label className="mr-4 flex items-center">
              <input
                type="checkbox"
                checked={bookingDetails.parking}
                onChange={(e) => setBookingDetails({ ...bookingDetails, parking: e.target.checked })}
                className="mr-2"
              />
              Parking
            </label>
            <label className="mr-4 flex items-center">
              <input
                type="checkbox"
                checked={bookingDetails.breakfast}
                onChange={(e) => setBookingDetails({ ...bookingDetails, breakfast: e.target.checked })}
                className="mr-2"
              />
              Breakfast
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={bookingDetails.petsAllowed}
                onChange={(e) => setBookingDetails({ ...bookingDetails, petsAllowed: e.target.checked })}
                className="mr-2"
              />
              Pets Allowed
            </label>
          </div>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">List Venue</button>
      </form>
      {bookingSuccess && (
        <p className="text-green-600 font-semibold mt-4">Booking created successfully!</p>
      )}
    </div>
  );
};

export default CreateBooking;
