import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const UpdateVenue = () => {
  const { id } = useParams();
  const [venuePrice, setVenuePrice] = useState("");
  const [venueDetails, setVenueDetails] = useState({
    name: "",
    description: "",
    media: [{
      url: "",
      alt: ""
    }],
    price: 0,
    maxGuests: 0,
    rating: 0,
    meta: {
      wifi: false,
      parking: false,
      breakfast: false,
      pets: false
    },
    location: {
      address: "",
      city: "",
      zip: "",
      country: "",
      continent: ""
    }
  });
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    const fetchVenueDetails = async () => {
      try {
        const response = await fetch(`https://v2.api.noroff.dev/holidaze/venues/${id}`);
        const data = await response.json();
        setVenueDetails(data.data);
        setVenuePrice(data.data.price.toString());
      } catch (error) {
        console.error("Error fetching venue details:", error);
      }
    };

    fetchVenueDetails();
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const apiKey = import.meta.env.VITE_API_KEY;
    const accessToken = localStorage.getItem('accessToken');

    const updatedData = {
      guests: parseInt(venueDetails.maxGuests),
      price: parseInt(venuePrice),
      name: venueDetails.name,
      description: venueDetails.description,
      media: venueDetails.media,
      maxGuests: parseInt(venueDetails.maxGuests),
      rating: venueDetails.rating,
      meta: venueDetails.meta,
      location: venueDetails.location
    };

    fetch(`https://v2.api.noroff.dev/holidaze/venues/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-noroff-api-key': apiKey,
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log('Venue updated successfully:', data);
        setUpdateSuccess(true);
      })
      .catch((error) => {
        console.error('Error updating venue:', error);
        setUpdateSuccess(false);
      });
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Update Venue</h1>
      <div className="mb-6">
        <label htmlFor="name" className="block mb-2 text-sm font-semibold">Name</label>
        <input
          type="text"
          id="name"
          value={venueDetails.name}
          onChange={(e) => setVenueDetails({ ...venueDetails, name: e.target.value })}
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
      <div className="mb-6">
        <label htmlFor="description" className="block mb-2 text-sm font-semibold">Description:</label>
        <textarea
          id="description"
          value={venueDetails.description}
          onChange={(e) => setVenueDetails({ ...venueDetails, description: e.target.value })}
          className="border border-gray-300 rounded-md py-2 px-3 w-full h-32"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="maxGuests" className="block mb-2 text-sm font-semibold">Max Guests:</label>
        <input
          type="number"
          id="maxGuests"
          value={venueDetails.maxGuests}
          onChange={(e) => setVenueDetails({ ...venueDetails, maxGuests: e.target.value })}
          className="border border-gray-300 rounded-md py-2 px-3 w-full"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="imageURL" className="block mb-2 text-sm font-semibold">Image URL:</label>
        <input
          type="text"
          id="imageURL"
          value={venueDetails.media.length > 0 ? venueDetails.media[0].url : ""}
          onChange={(e) => setVenueDetails({ ...venueDetails, media: [{ ...venueDetails.media[0], url: e.target.value }] })}
          className="border border-gray-300 rounded-md py-2 px-3 w-full"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="altText" className="block mb-2 text-sm font-semibold">Alt Text:</label>
        <input
          type="text"
          id="altText"
          value={venueDetails.media.length > 0 ? venueDetails.media[0].alt : ""}
          onChange={(e) => setVenueDetails({ ...venueDetails, media: [{ ...venueDetails.media[0], alt: e.target.value }] })}
          className="border border-gray-300 rounded-md py-2 px-3 w-full"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="address" className="block mb-2 text-sm font-semibold">Address:</label>
        <input
          type="text"
          id="address"
          value={venueDetails.location.address}
          onChange={(e) => setVenueDetails({ ...venueDetails, location: { ...venueDetails.location, address: e.target.value } })}
          className="border border-gray-300 rounded-md py-2 px-3 w-full"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="city" className="block mb-2 text-sm font-semibold">City:</label>
        <input
          type="text"
          id="city"
          value={venueDetails.location.city}
          onChange={(e) => setVenueDetails({ ...venueDetails, location: { ...venueDetails.location, city: e.target.value } })}
          className="border border-gray-300 rounded-md py-2 px-3 w-full"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="zip" className="block mb-2 text-sm font-semibold">Zip:</label>
        <input
          type="text"
          id="zip"
          value={venueDetails.location.zip}
          onChange={(e) => setVenueDetails({ ...venueDetails, location: { ...venueDetails.location, zip: e.target.value } })}
          className="border border-gray-300 rounded-md py-2 px-3 w-full"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="country" className="block mb-2 text-sm font-semibold">Country:</label>
        <input
          type="text"
          id="country"
          value={venueDetails.location.country}
          onChange={(e) => setVenueDetails({ ...venueDetails, location: { ...venueDetails.location, country: e.target.value } })}
          className="border border-gray-300 rounded-md py-2 px-3 w-full"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="continent" className="block mb-2 text-sm font-semibold">Continent:</label>
        <input
          type="text"
          id="continent"
          value={venueDetails.location.continent}
          onChange={(e) => setVenueDetails({ ...venueDetails, location: { ...venueDetails.location, continent: e.target.value } })}
          className="border border-gray-300 rounded-md py-2 px-3 w-full"
        />
      </div>
      <div className="mb-6">
        <label className="block mb-2 text-sm font-semibold">Amenities:</label>
        <div className="flex flex-wrap items-center">
          <label className="mr-4 flex items-center">
            <input
              type="checkbox"
              checked={venueDetails.meta.wifi}
              onChange={(e) => setVenueDetails({ ...venueDetails, meta: { ...venueDetails.meta, wifi: e.target.checked } })}
              className="mr-2"
            />
            Wifi
          </label>
          <label className="mr-4 flex items-center">
            <input
              type="checkbox"
              checked={venueDetails.meta.parking}
              onChange={(e) => setVenueDetails({ ...venueDetails, meta: { ...venueDetails.meta, parking: e.target.checked } })}
              className="mr-2"
            />
            Parking
          </label>
          <label className="mr-4 flex items-center">
            <input
              type="checkbox"
              checked={venueDetails.meta.breakfast}
              onChange={(e) => setVenueDetails({ ...venueDetails, meta: { ...venueDetails.meta, breakfast: e.target.checked } })}
              className="mr-2"
            />
            Breakfast
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={venueDetails.meta.pets}
              onChange={(e) => setVenueDetails({ ...venueDetails, meta: { ...venueDetails.meta, pets: e.target.checked } })}
              className="mr-2"
            />
            Pets Allowed
          </label>
        </div>
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" onClick={handleSubmit}>Update Venue</button>
      {updateSuccess && (
        <p className="text-green-600 font-semibold mt-4">Venue updated successfully!</p>
      )}
    </div>
  );
};

export default UpdateVenue;
