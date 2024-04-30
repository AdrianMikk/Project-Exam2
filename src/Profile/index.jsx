import { useState } from "react";

const Profile = () => {
  const [avatarUrl, setAvatarUrl] = useState(
    "https://v2.api.noroff.dev/holidaze/profiles/default-avatar.jpg"
  ); 

  const handleAvatarChange = (event) => {
    const newAvatarUrl = event.target.value;
    setAvatarUrl(newAvatarUrl);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="max-w-md w-full shadow-md rounded-lg overflow-hidden">
        <div className="px-6 py-4 flex flex-col items-center"> 
          <img
            className="w-24 h-24 rounded-full mb-4 bg-black" 
            src={avatarUrl}
            alt="User Profile"
          />
          <h1 className="text-xl font-bold text-white mb-2">Hoisky</h1> 
          <p className="text-gray-400">Front-End Developer</p>
          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2 text-white">
              About Me
            </h2>
            <p className="text-gray-400">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
              convallis libero sit amet lorem fringilla, nec luctus leo
              convallis.
            </p>
          </div>
          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2 text-white">
              Change Avatar (Image Address)
            </h2>
            <input
              type="text"
              className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:shadow-outline"
              placeholder="Enter Image URL"
              onChange={handleAvatarChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

// import { useState, useEffect } from "react";

// const Profile = () => {
//   const [profileData, setProfileData] = useState(null);
//   const [avatarUrl, setAvatarUrl] = useState(
//     "https://v2.api.noroff.dev/holidaze/profiles/default-avatar.jpg"
//   );

//   useEffect(() => {
//     const fetchProfileData = async () => {
//       try {
//         const response = await fetch(
//           "https://v2.api.noroff.dev/holidaze/profiles"
//           // Replace "your_username_here" with the actual username of the logged-in user
//         );
//         if (!response.ok) {
//           throw new Error("Failed to fetch profile data");
//         }
//         const data = await response.json();
//         setProfileData(data);
//         if (data.avatarUrl) {
//           setAvatarUrl(data.avatarUrl);
//         }
//       } catch (error) {
//         console.error("Error fetching profile data:", error);
//       }
//     };

//     fetchProfileData();
//   }, []);

//   const handleAvatarChange = (event) => {
//     const newAvatarUrl = event.target.value;
//     setAvatarUrl(newAvatarUrl);
//     // Assuming you want to update the profile data as well
//     setProfileData({ ...profileData, avatarUrl: newAvatarUrl });
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="max-w-md w-full shadow-md rounded-lg overflow-hidden">
//         <div className="p-6 flex flex-col items-center">
//           <img
//             className="w-24 h-24 rounded-full mb-4"
//             src={avatarUrl}
//             alt="User Profile"
//           />
//           {profileData ? (
//             <>
//               <h1 className="text-xl font-bold text-gray-800 mb-2">
//                 {profileData.name}
//               </h1>
//               <p className="text-gray-600">{profileData.role}</p>
//               <div className="mt-4">
//                 <h2 className="text-lg font-semibold mb-2 text-gray-800">
//                   About Me
//                 </h2>
//                 <p className="text-gray-600">{profileData.about}</p>
//               </div>
//             </>
//           ) : (
//             <p>Loading...</p>
//           )}
//           <div className="mt-4">
//             <h2 className="text-lg font-semibold mb-2 text-gray-800">
//               Change Avatar (Image Address)
//             </h2>
//             <input
//               type="text"
//               className="w-full bg-gray-200 text-gray-800 px-4 py-2 rounded-lg focus:outline-none focus:shadow-outline"
//               placeholder="Enter Image URL"
//               value={avatarUrl}
//               onChange={handleAvatarChange}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;

