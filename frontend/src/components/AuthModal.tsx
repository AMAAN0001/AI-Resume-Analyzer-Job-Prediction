import React, { useState, useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { authAPI } from '../services/apiClient';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email: string, password: string) => Promise<void>;
  onSignup: (email: string, password: string, name: string) => Promise<void>;
  onGuestContinue?: () => void;
  onGoogleLoginSuccess?: (user: any) => void;
}

const MailIcon: React.FC<{className?: string}> = ({className}) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const LockIcon: React.FC<{className?: string}> = ({className}) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

const UserIcon: React.FC<{className?: string}> = ({className}) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin, onSignup, onGuestContinue, onGoogleLoginSuccess }) => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [stars, setStars] = useState<Array<{id: number; left: number; top: number; delay: number}>>([]);

  useEffect(() => {
    const generatedStars = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 3,
    }));
    setStars(generatedStars);
  }, []);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password.trim()) {
      setError('Email and password are required.');
      return;
    }

    if (mode === 'signup' && !name.trim()) {
      setError('Name is required for signup.');
      return;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setIsLoading(true);

    try {
      if (mode === 'login') {
        await onLogin(email, password);
      } else {
        await onSignup(email, password, name);
      }
      setEmail('');
      setPassword('');
      setName('');
      onClose();
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleModeSwitch = () => {
    setMode(mode === 'login' ? 'signup' : 'login');
    setError(null);
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await authAPI.googleLogin(credentialResponse.credential);
      // Store token and user info with correct keys for authService
      localStorage.setItem('authToken', result.token);
      // Use the correct key that authService.getCurrentUser() expects
      localStorage.setItem('ResAI-current-user', JSON.stringify(result.user));
      localStorage.setItem('user', JSON.stringify(result.user));
      setEmail('');
      setPassword('');
      setName('');
      // Notify parent component of successful login
      onGoogleLoginSuccess?.(result.user);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Google login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleError = () => {
    setError('Google login failed. Please try again.');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Space Background - CLEAR AND VISIBLE */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-800 to-slate-900">
        {/* Animated gradient overlay - MORE VISIBLE */}
        <div className="absolute inset-0 bg-gradient-to-t from-purple-600/30 via-blue-500/20 to-cyan-500/20 animate-pulse"></div>

        {/* Stars */}
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: Math.random() > 0.7 ? '3px' : '1.5px',
              height: Math.random() > 0.7 ? '3px' : '1.5px',
              animation: `twinkle ${2 + Math.random() * 2}s infinite`,
              animationDelay: `${star.delay}s`,
            }}
          ></div>
        ))}

        {/* Planet 1 */}
        <div
          className="absolute -top-24 -right-32 w-64 h-64 rounded-full bg-gradient-to-br from-purple-600 to-purple-900 shadow-2xl opacity-60"
          style={{
            boxShadow: '0 0 60px rgba(168, 85, 247, 0.5), inset -20px -20px 60px rgba(0, 0, 0, 0.5)',
            animation: 'float 20s ease-in-out infinite',
          }}
        >
          <div
            className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-400 to-transparent opacity-30"
            style={{ animation: 'spin 30s linear infinite' }}
          ></div>
        </div>

        {/* Planet 2 */}
        <div
          className="absolute -bottom-12 -left-24 w-40 h-40 rounded-full bg-gradient-to-br from-blue-500 to-blue-900 shadow-lg opacity-50"
          style={{
            boxShadow: '0 0 40px rgba(59, 130, 246, 0.4), inset -15px -15px 40px rgba(0, 0, 0, 0.5)',
            animation: 'float 25s ease-in-out infinite 2s',
          }}
        >
          <div
            className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-300 to-transparent opacity-20"
            style={{ animation: 'spin 40s linear infinite reverse' }}
          ></div>
        </div>

        {/* Floating particles */}
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-blue-300 rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float-particle ${5 + Math.random() * 5}s infinite ease-in-out`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          ></div>
        ))}

        {/* Glow orbs */}
        <div className="absolute top-1/4 right-1/3 w-32 h-32 bg-blue-400 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/4 w-40 h-40 bg-purple-400 rounded-full filter blur-3xl opacity-15"></div>
      </div>

      {/* Modal Container */}
      <div className="fixed inset-0 flex items-center justify-center p-4 backdrop-blur-sm">
        <style>{`
          @keyframes twinkle {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 1; }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0px) translateX(0px); }
            50% { transform: translateY(-20px) translateX(10px); }
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes float-particle {
            0%, 100% { transform: translateY(0) translateX(0); opacity: 0; }
            50% { opacity: 0.6; }
          }
        `}</style>

        <div className="w-full max-w-md relative z-10">
          {/* Card */}
          <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500"></div>

            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 text-white/60 hover:text-white transition-colors hover:bg-white/10 p-2 rounded-lg"
              aria-label="Close modal"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="p-8 sm:p-10">
              <div className="mb-8">
                <h1 className="text-4xl font-black text-white mb-2 tracking-tight">
                  {mode === 'login' ? 'SIGN IN' : 'CREATE ACCOUNT'}
                </h1>
                <p className="text-blue-200/80 text-sm font-medium">
                  {mode === 'login' 
                    ? 'Sign in with email address'
                    : 'Join the future of career insights'}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 mb-6">
                {mode === 'signup' && (
                  <div className="relative group">
                    <UserIcon className="absolute left-4 top-4 h-5 w-5 text-blue-300/60 group-focus-within:text-blue-400 transition-colors" />
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Full name"
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400/30 transition-all"
                    />
                  </div>
                )}

                <div className="relative group">
                  <MailIcon className="absolute left-4 top-4 h-5 w-5 text-blue-300/60 group-focus-within:text-blue-400 transition-colors" />
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address"
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400/30 transition-all"
                  />
                </div>

                <div className="relative group">
                  <LockIcon className="absolute left-4 top-4 h-5 w-5 text-blue-300/60 group-focus-within:text-blue-400 transition-colors" />
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password (min 6 chars)"
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400/30 transition-all"
                  />
                </div>

                {error && (
                  <div className="p-3 bg-red-500/20 border border-red-500/40 rounded-lg">
                    <p className="text-red-200 text-sm font-medium">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-6 py-3 px-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 disabled:opacity-50 text-white font-bold rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/50 active:scale-95"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                      Processing...
                    </div>
                  ) : mode === 'login' ? (
                    'Sign In'
                  ) : (
                    'Create Account'
                  )}
                </button>
              </form>

              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gradient-to-br from-slate-950 via-purple-900 to-slate-950 text-white/50 text-xs">OR CONTINUE WITH</span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 mb-6">
                <div className="w-full flex justify-center">
                  <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={handleGoogleError}
                    theme="filled_blue"
                    size="large"
                  />
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 mb-6">
                <p className="text-white/60 text-sm">
                  {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}
                </p>
                <button
                  type="button"
                  onClick={handleModeSwitch}
                  className="text-blue-400 hover:text-blue-300 font-semibold text-sm transition-colors"
                >
                  {mode === 'login' ? 'Sign Up' : 'Sign In'}
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  onGuestContinue?.();
                  onClose();
                }}
                className="w-full py-3 px-4 bg-white/10 border-2 border-white/40 hover:bg-white/20 hover:border-white/60 text-white font-bold rounded-lg transition-all duration-200 mb-6 text-sm"
              >
                🚀 Continue as Guest
              </button>

              <p className="text-white/40 text-xs text-center leading-relaxed">
                By {mode === 'login' ? 'signing in' : 'registering'} you agree to our{' '}
                <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">Terms and Conditions</a>
              </p>
            </div>
          </div>

          <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-purple-500/20 rounded-full filter blur-2xl"></div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;

