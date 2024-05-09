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
