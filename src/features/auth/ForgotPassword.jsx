import React, { useState } from 'react';
import { toast } from 'react-toastify';
import logo from '../../assets/images/logo.png';
import bg from '../../assets/images/bg.png';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email');
      return;
    }
    toast.success('Reset link sent (demo)');
  };

  return (
    <div
      className="min-h-dvh w-full flex items-center justify-center p-4"
      style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="w-full max-w-md md:max-w-lg lg:max-w-xl 2xl:max-w-2xl rounded-2xl bg-white/90 ring-1 ring-black/5 backdrop-blur-md shadow-[0_0_72.15px_0_rgba(200,149,241,0.2),0_4px_4px_0_#E2C8F6]">
        <div className="px-8 pt-8 pb-8">
          <div className="flex flex-col items-center gap-2">
            <img src={logo} alt="ParentBridge Logo" className="h-16 md:h-20 lg:h-24 xl:h-28" />
          </div>

          <h1 className="mt-4 text-center text-2xl md:text-3xl font-semibold text-neutral-900">Forgot Password</h1>
          <p className="mt-2 text-center text-sm text-neutral-600">
            Kindly click the button and enter the information. A verification code will be sent to you via email for you to enter.
          </p>

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

            <button
              type="submit"
              className="mt-2 inline-flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-purple-400 to-purple-500 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:from-purple-500 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-300/60"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;