import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate('/admin');
      }
    });
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setAuthError(error.message);
    } else {
      navigate('/admin');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full border border-black/5">
        <div className="text-center mb-8">
          <span className="text-marigold text-3xl font-semibold mb-2 block">✦</span>
          <h1 className="text-2xl font-display font-semibold text-ink">Admin Login</h1>
          <p className="text-ink/60 text-sm mt-1">Sign in to manage Little Stars Academy</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          {authError && <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">{authError}</div>}
          <div>
            <label className="block text-sm font-medium text-ink mb-1">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-black/10 focus:outline-none focus:ring-2 focus:ring-marigold focus:border-transparent transition-all"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink mb-1">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-black/10 focus:outline-none focus:ring-2 focus:ring-marigold focus:border-transparent transition-all"
              required
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-ink text-white font-medium py-3 rounded-xl hover:bg-ink/90 transition-colors mt-6 shadow-md"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
