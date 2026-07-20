import React, { useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { User, Lock, ArrowRight, Sparkles, Users, Utensils } from 'lucide-react';
import { API_URL } from '../config';

export const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [_, setCookies] = useCookies(['access_token']);
  const navigate = useNavigate();

  const validateForm = () => {
    if (username.length < 3) {
      setError('Username must be at least 3 characters long');
      return false;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const endpoint = isLogin ? 'login' : 'register';
      const response = await axios.post(`${API_URL}/auth/${endpoint}`, {
        username,
        password,
      });

      if (isLogin) {
        setCookies('access_token', response.data.token);
        window.localStorage.setItem('userID', response.data.userID);
        window.localStorage.setItem('username', username);
        window.localStorage.setItem('userRole', response.data.role || 'user');
        navigate('/');
      } else {
        alert('Registration successful! Please login.');
        setIsLogin(true);
        setPassword('');
      }
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex font-sans pt-16 relative overflow-hidden">
      {/* Absolute Background Image with dark overlay to reduce opacity and enhance readability */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/bg-auth.png" 
          alt="Kitchen Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/85 backdrop-blur-[4px]"></div>
      </div>
      
      {/* Left side - Info Panels & Branding */}
      <div className="hidden lg:flex lg:w-1/2 p-12 flex-col justify-center items-start text-white relative z-10">
        <div className="max-w-lg animate-slide-up pl-10 w-full">
          <h1 className="text-6xl font-extrabold tracking-tight mb-8 text-center w-full">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-[#FFD166]">AapliRecipe</span>
          </h1>
          
          <div className="space-y-6 mt-12">
            <div className="flex items-start space-x-4 glass p-6 rounded-2xl">
              <div className="bg-[#FF6B00]/20 p-3 rounded-xl border border-[#FF6B00]/30">
                <Sparkles size={24} className="text-[#FF6B00]" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1 text-gray-100">Authentic Maharashtrian Flavors</h3>
                <p className="text-gray-400 leading-relaxed text-sm">Discover family-secret recipes from spicy Misal Pav to classic Puran Poli.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 glass p-6 rounded-2xl">
              <div className="bg-[#FFD166]/20 p-3 rounded-xl border border-[#FFD166]/30">
                <Users size={24} className="text-[#FFD166]" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1 text-gray-100">Join Our Foodie Family</h3>
                <p className="text-gray-400 leading-relaxed text-sm">Share your own traditional dishes and connect with lovers of Marathi cuisine.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 glass p-6 rounded-2xl">
              <div className="bg-[#FF6B00]/20 p-3 rounded-xl border border-[#FF6B00]/30">
                <Utensils size={24} className="text-[#FF6B00]" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1 text-gray-100">Build Your Digital Cookbook</h3>
                <p className="text-gray-400 leading-relaxed text-sm">Save your favorite recipes to your personal cookbook for quick access anytime.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 relative z-10">
        <div className="w-full max-w-md space-y-8 animate-fade-in glass-card p-10 rounded-3xl">
          <div className="text-center lg:text-left">
            <h2 className="text-4xl font-extrabold text-white tracking-tight">
              {isLogin ? 'Welcome' : 'Create an account'}
            </h2>
            <p className="mt-3 text-sm text-gray-400">
              {isLogin ? 'Enter your credentials to access your workspace.' : 'Get started with your free Aapli Recipe account.'}
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit} autoComplete="off">
            {error && (
              <div className="bg-red-500/10 text-red-400 p-4 rounded-xl text-sm font-medium border border-red-500/20 flex items-center">
                <span className="mr-2">⚠️</span> {error}
              </div>
            )}
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Username</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User size={18} className="text-gray-500" />
                  </div>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoComplete="off"
                    className="block w-full pl-11 pr-4 py-3.5 border border-white/10 rounded-xl text-white bg-white/5 hover:bg-white/10 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent transition-all placeholder-gray-600"
                    placeholder="Enter your username"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock size={18} className="text-gray-500" />
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                    className="block w-full pl-11 pr-4 py-3.5 border border-white/10 rounded-xl text-white bg-white/5 hover:bg-white/10 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent transition-all placeholder-gray-600"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="group relative w-full flex justify-center items-center py-4 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-[#FF6B00] hover:bg-[#e65c00] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#1A1A1A] focus:ring-[#FF6B00] shadow-[0_0_20px_rgba(255,107,0,0.4)] transition-all duration-200 transform hover:-translate-y-0.5"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
              <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </button>

          </form>

          <div className="text-center mt-8 pt-4 border-t border-white/5">
            <p className="text-sm text-gray-400">
              {isLogin ? "Don't have an account? " : 'Already have an account? '}
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError('');
                  setPassword('');
                }}
                className="font-bold text-[#10B981] hover:text-[#059669] transition-colors"
              >
                {isLogin ? 'Create one now' : 'Sign in here'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};