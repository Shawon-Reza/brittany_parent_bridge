import React, { useState, useRef } from 'react';
import { toast } from 'react-toastify';

import logo from '../../assets/images/logo.png';
import bg from '../../assets/images/bg.png';

const OtpVerification = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return; // Only allow digits

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Take only the last digit
    setOtp(newOtp);

    console.log('OTP Array:', newOtp);
    console.log('OTP Value:', newOtp.join(''));

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    pastedData.split('').forEach((char, i) => {
      if (i < 6) newOtp[i] = char;
    });
    setOtp(newOtp);
    inputRefs.current[Math.min(pastedData.length, 5)]?.focus();
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const otpValue = otp.join('');
    console.log('Submitted OTP:', otpValue);
    
    if (otpValue.length !== 6) {
      toast.error('Please enter the complete 6-digit code');
      return;
    }
    toast.success('OTP verified (demo)');
  };

  const handleResend = () => {
    toast.info('Resending code (demo)');
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

          <h1 className="mt-4 text-center text-2xl md:text-3xl font-semibold text-neutral-900">Otp Verification</h1>
          <p className="mt-2 text-center text-sm text-neutral-600">
            Enter the code sent to Bill***sExample.Com
          </p>

          <form onSubmit={onSubmit} className="mt-6 space-y-6">
            <div className="flex justify-center gap-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className="w-12 h-12 md:w-14 md:h-14 text-center text-xl font-semibold border border-neutral-300 rounded-lg bg-white text-neutral-900 outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-300/40"
                />
              ))}
            </div>

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-purple-400 to-purple-500 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:from-purple-500 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-300/60"
            >
              Send
            </button>

            <div className="text-center text-sm text-neutral-600">
              Did not receive code?{' '}
              <button
                type="button"
                onClick={handleResend}
                className="font-medium text-cyan-500 hover:text-cyan-600"
              >
                Resend
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;