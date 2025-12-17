import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { toast } from 'react-toastify';
import logo from '../../assets/images/logo.png';
import bg from '../../assets/images/bg.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    // Placeholder submit behavior
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }
    toast.success('Logged in (demo)');
  };

  return (
    <div
      className="min-h-dvh w-full flex items-center justify-center p-4"
      style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="w-full max-w-md md:max-w-lg lg:max-w-xl 2xl:max-w-2xl rounded-2xl bg-white/90 ring-1 ring-black/5 backdrop-blur-md shadow-[0_0_72.15px_0_rgba(200,149,241,0.2),0_4px_4px_0_#E2C8F6]">
        <div className="px-8 pt-8 pb-6">
          <div className="flex flex-col items-center gap-2">
            <img src={logo} alt="ParentBridge Logo" className="h-16 md:h-20 lg:h-24 xl:h-28" />
          </div>

          <h1 className="mt-2 text-center text-2xl md:text-3xl font-semibold text-neutral-900">Admin Login</h1>
          <p className="mt-1 text-center text-sm text-neutral-500">Please enter your details below.</p>

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-300/40"
              />
            </div>

            <div className="">
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 pr-10 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-300/40"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute inset-y-0 right-2  flex items-center text-neutral-500 hover:text-neutral-700"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                </button>
              </div>

              <div className="mt-2 text-right text-xs">
                <Link to="/forgot-password" className="text-red-500 hover:text-red-600 hover:underline">Forget Password</Link>
              </div>
            </div>

            <button
              type="submit"
              className="mt-2 inline-flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-purple-400 to-purple-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:from-purple-500 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-300/60"
            >
              Login
            </button>

            <button
              type="button"
              onClick={() => toast.info('Google sign-in (demo)')}
              className="inline-flex w-full items-center justify-center gap-3 rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm font-medium text-neutral-800 hover:bg-neutral-50"
            >
              <FcGoogle size={18} />
              Continue with Google
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;