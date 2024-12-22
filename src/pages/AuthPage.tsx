import { useState } from 'react';
import { post } from "@/lib/api";
import { useNavigate } from 'react-router-dom';

function App() {
  const [name, setName] = useState('');
  const [registerSuccessMsg, setRegisterSuccessMsg] = useState('');
  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('password');
  const [error, setError] = useState(null);
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
        if (isRegister) {
            try {
                const response = await post('/register', { name, email, password });
                console.log('Registration successful!', response.message, response.data);
                localStorage.setItem('token', response.token);
                setRegisterSuccessMsg(response.message);
                navigate('/home');
            } catch (error) {
                console.error('Registration failed!', error);
                setError((error as any).response?.data?.message || 'An error occurred!');
            }
        }else {
            try {
                const response = await post('/login', {
                    email,
                    password,
                });
                localStorage.setItem('token', response.token);
                navigate('/home');
                }catch (error) {
                    console.error('Login failed!', error);

                    setError((error as any).response?.data?.message || 'An error occurred!');
                }
            }
        } catch (error) {
            setError((error as any).response?.data?.message || 'An error occurred!');
        }
   };

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg text-center">
        <p className="text-green-500 mb-4">{registerSuccessMsg}</p>
        <h1 className="text-2xl font-bold sm:text-3xl">Start Reading today!</h1>
        <p className="mt-4 text-gray-500">
          {/* This is an assignment task demonstration by candidate Zin, a full stack web developer. */}
        </p>
      </div>
      <form onSubmit={handleSubmit} className="mx-auto mb-0 mt-8 max-w-md space-y-4">
        {isRegister && (
          <div>
            <label htmlFor="email" className="sr-only">Email</label>
            <div className="relative">
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm text-black"
                placeholder="Enter your name"
                required
              />
              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </span>
            </div>
          </div>
        )}
        <div>
          <label htmlFor="email" className="sr-only">Email</label>
          <div className="relative">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm text-black"
            />
            <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
            </span>
          </div>
        </div>

        <div>
          <label htmlFor="password" className="sr-only">Password</label>
          <div className="relative">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm text-black"
        
            />
            <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </span>
            {error && <small className="text-red-500">{error}</small>}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
          {isRegister
          ? 'Already have an account?'
          : "Don't have an account?"}
            <button
            type="submit"
            onClick={() => {
              setIsRegister(!isRegister);
              setError(null);
            }}
            className="bg-transparent text-blue-500 underline hover:text-blue-700 focus:outline-none p-0 border-0 px-2"
          >
            {isRegister ? 'Login' : 'Register'}
          </button>
          </p>
          <button
            type="submit"
            className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
          >
            {isRegister ? 'Register' : 'Login'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;
