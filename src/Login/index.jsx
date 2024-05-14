import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    setError('');

    if (!email || !password) {
      setError('Email and password are required');
      return;
    }

    if (!email.endsWith('@stud.noroff.no')) {
      setError('Email must end with @stud.noroff.no');
      return;
    }

    try {
      const response = await fetch("https://v2.api.noroff.dev/auth/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log('Data:', data);

      if (response.ok) {
        localStorage.setItem('accessToken', data.data.accessToken);
        localStorage.setItem('user', JSON.stringify(data));
        console.log('Is Registered:', data.data.isRegistered); 
        // Check if user is registered
        if (data.data.isRegistered) {
          navigate('/venues');
        } else {
          setError('You need to be registered.');
        }
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error logging in. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="max-w-md w-full p-6 bg-gray-800 rounded-md text-white">
        <h2 className="text-2xl font-semibold mb-6 mt-4">Login</h2>
        {error && (
          <p className="text-red-500 mb-4">
            <span style={{ color: 'red', fontWeight: 'bold' }}>Error: </span>
            {error}
          </p>
        )}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className={`w-full px-4 py-2 border rounded-md ${
                email.endsWith('@stud.noroff.no') ? 'bg-gray-700' : 'bg-red-500'
              } focus:outline-none focus:border-blue-500`}
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-300 mb-2">
              Password
            </label>
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
          <button
            type="submit"
            className="w-full bg-blue text-white py-2 rounded-md hover:bg-blue transition duration-300"
          >
            Login
          </button>
          <p className="text-center mt-4">
            Dont have an account?{' '}
            <a href="/register" className="text-blue-400 hover:underline">
              Register
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
