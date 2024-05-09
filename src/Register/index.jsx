import { useState } from 'react';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isVenueManager, setIsVenueManager] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!email.endsWith('@stud.noroff.no')) {
      setError('You can only register with a stud.noroff.no email.');
      return;
    }

    // Check if password matches the confirm password
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    // If all validations pass, proceed with registration
    setError('');

    try {
      const response = await fetch('https://v2.api.noroff.dev/holidaze/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          isVenueManager: isVenueManager,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }

      console.log('Registration successful!');
      console.log('Is Venue Manager:', isVenueManager);
    } catch (error) {
      console.error(error);
      setError('Registration failed. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="max-w-md w-full p-6 bg-gray-800 rounded-md text-white">
        <h2 className="text-2xl font-semibold mb-6">Register</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-300 mb-2">Email</label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border rounded-md bg-gray-700 focus:outline-none focus:border-blue-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-300 mb-2">Password</label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border rounded-md bg-gray-700 focus:outline-none focus:border-blue-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-gray-300 mb-2">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full px-4 py-2 border rounded-md bg-gray-700 focus:outline-none focus:border-blue-500"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="isVenueManager" className="flex items-center">
              <input
                type="checkbox"
                id="isVenueManager"
                className="mr-2"
                checked={isVenueManager}
                onChange={() => setIsVenueManager(!isVenueManager)}
              />
              Register as Venue Manager
            </label>
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
