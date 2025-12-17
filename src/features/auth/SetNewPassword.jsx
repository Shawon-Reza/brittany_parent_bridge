import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import logo from '../../assets/images/logo.png';
import bg from '../../assets/images/bg.png';

const SetNewPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    
    if (!newPassword || !confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (newPassword.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }

    console.log('New Password:', newPassword);
    toast.success('Password updated successfully (demo)');
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

          <h1 className="mt-4 text-center text-2xl md:text-3xl font-semibold text-neutral-900">Set New Password</h1>
          <p className="mt-2 text-center text-sm text-neutral-600">
            Your new password must be unique from those previously used.
          </p>

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <div className="relative">
              <input
                type={showNewPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 pr-10 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-300/40"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword((s) => !s)}
                className="absolute inset-y-0 right-2 flex items-center text-neutral-500 hover:text-neutral-700"
                aria-label={showNewPassword ? 'Hide password' : 'Show password'}
              >
                {showNewPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
              </button>
            </div>

            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm New Password"
                className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 pr-10 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-300/40"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((s) => !s)}
                className="absolute inset-y-0 right-2 flex items-center text-neutral-500 hover:text-neutral-700"
                aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
              >
                {showConfirmPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
              </button>
            </div>

            <button
              type="submit"
              className="mt-2 inline-flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-purple-400 to-purple-500 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:from-purple-500 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-300/60"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SetNewPassword;