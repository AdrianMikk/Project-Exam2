import Navbar from "../Header";

const Profile = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
                <Navbar />
          <div className="max-w-md w-full shadow-md rounded-lg overflow-hidden">
            <div className="px-6 py-4">
              <div className="flex items-center">
                <img
                  className="w-12 h-12 rounded-full mr-4 bg-black"
                  src="https://v2.api.noroff.dev/holidaze/profiles"
                  alt="User Profile"
                />
                <h1 className="text-xl font-bold text-white">Hoisky</h1>
              </div>
              <p className="text-gray-400 mt-2">Front-End Developer</p>
              <div className="mt-4">
                <h2 className="text-lg font-semibold mb-2 text-white">About Me</h2>
                <p className="text-gray-400">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                  convallis libero sit amet lorem fringilla, nec luctus leo
                  convallis.
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    };
    
  
  export default Profile;