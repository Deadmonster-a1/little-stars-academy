import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Trash2, Plus, LogOut, CheckCircle, XCircle } from 'lucide-react';

interface Announcement {
  id: string;
  title: string;
  content: string;
  is_active: boolean;
  created_at: string;
}

export default function Admin() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState({ title: '', content: '', is_active: false });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) {
      fetchAnnouncements();
    }
  }, [session]);

  const fetchAnnouncements = async () => {
    const { data, error } = await supabase
      .from('announcements')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching announcements:', error);
    } else {
      setAnnouncements(data || []);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) setAuthError(error.message);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // If setting active, we might want to deactivate others (optional business logic)
    if (newAnnouncement.is_active) {
      await supabase.from('announcements').update({ is_active: false }).neq('id', '00000000-0000-0000-0000-000000000000');
    }

    const { error } = await supabase
      .from('announcements')
      .insert([newAnnouncement]);

    if (!error) {
      setIsCreating(false);
      setNewAnnouncement({ title: '', content: '', is_active: false });
      fetchAnnouncements();
    } else {
      alert('Error creating announcement: ' + error.message);
    }
  };

  const toggleActive = async (announcement: Announcement) => {
    const newStatus = !announcement.is_active;
    
    if (newStatus) {
      // Deactivate all others
      await supabase.from('announcements').update({ is_active: false }).neq('id', announcement.id);
    }
    
    await supabase
      .from('announcements')
      .update({ is_active: newStatus })
      .eq('id', announcement.id);
      
    fetchAnnouncements();
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this announcement?')) {
      await supabase.from('announcements').delete().eq('id', id);
      fetchAnnouncements();
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-cream">Loading...</div>;

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream px-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full border border-black/5">
          <div className="text-center mb-8">
            <span className="text-marigold text-3xl font-semibold mb-2 block">✦</span>
            <h1 className="text-2xl font-display font-semibold text-ink">Admin Dashboard</h1>
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

  return (
    <div className="min-h-screen bg-cream">
      <nav className="bg-white border-b border-black/5 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <span className="text-marigold text-xl font-semibold">✦</span>
          <h1 className="text-lg font-display font-semibold text-ink">Little Stars Admin</h1>
        </div>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 text-ink/60 hover:text-ink transition-colors text-sm font-medium"
        >
          <LogOut size={16} /> Logout
        </button>
      </nav>

      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-display font-bold text-ink">Announcements</h2>
            <p className="text-ink/60 mt-1">Manage popup notifications for the home page.</p>
          </div>
          <button 
            onClick={() => setIsCreating(!isCreating)}
            className="flex items-center gap-2 bg-marigold text-ink font-medium px-5 py-2.5 rounded-full hover:bg-marigold/90 transition-colors shadow-sm"
          >
            {isCreating ? 'Cancel' : <><Plus size={18} /> New Announcement</>}
          </button>
        </div>

        {isCreating && (
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-black/5 mb-8">
            <h3 className="text-lg font-semibold mb-4">Create New Announcement</h3>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-ink mb-1">Title</label>
                <input 
                  type="text" 
                  value={newAnnouncement.title}
                  onChange={(e) => setNewAnnouncement({...newAnnouncement, title: e.target.value})}
                  className="w-full px-4 py-2 rounded-xl border border-black/10 focus:outline-none focus:ring-2 focus:ring-marigold"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-ink mb-1">Content</label>
                <textarea 
                  value={newAnnouncement.content}
                  onChange={(e) => setNewAnnouncement({...newAnnouncement, content: e.target.value})}
                  className="w-full px-4 py-2 rounded-xl border border-black/10 focus:outline-none focus:ring-2 focus:ring-marigold h-32 resize-none"
                  required
                />
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={newAnnouncement.is_active}
                  onChange={(e) => setNewAnnouncement({...newAnnouncement, is_active: e.target.checked})}
                  className="w-5 h-5 rounded text-marigold focus:ring-marigold"
                />
                <span className="text-sm font-medium text-ink">Set as Active (shows on homepage)</span>
              </label>
              <div className="flex justify-end pt-2">
                <button 
                  type="submit"
                  className="bg-ink text-white font-medium px-6 py-2.5 rounded-xl hover:bg-ink/90 transition-colors shadow-sm"
                >
                  Publish Announcement
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-sm border border-black/5 overflow-hidden">
          {announcements.length === 0 ? (
            <div className="p-12 text-center text-ink/40">
              No announcements found. Create one to get started.
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-black/[0.02] border-b border-black/5 text-ink/60 text-sm">
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium">Title</th>
                  <th className="p-4 font-medium hidden md:table-cell">Date</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {announcements.map((item) => (
                  <tr key={item.id} className="border-b border-black/5 last:border-0 hover:bg-black/[0.01] transition-colors">
                    <td className="p-4">
                      <button 
                        onClick={() => toggleActive(item)}
                        className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full transition-colors ${
                          item.is_active 
                            ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {item.is_active ? <CheckCircle size={14} /> : <XCircle size={14} />}
                        {item.is_active ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                    <td className="p-4">
                      <div className="font-semibold text-ink">{item.title}</div>
                      <div className="text-sm text-ink/60 mt-0.5 line-clamp-1">{item.content}</div>
                    </td>
                    <td className="p-4 text-sm text-ink/50 hidden md:table-cell">
                      {new Date(item.created_at).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-right">
                      <button 
                        onClick={() => handleDelete(item.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors inline-block"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}
