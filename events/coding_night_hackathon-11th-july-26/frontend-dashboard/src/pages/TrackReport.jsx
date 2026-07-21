import React, { useState } from 'react';
import { api } from '../utils/api';
import Header from '../components/landing/ui/header';
import Footer from '../components/landing/ui/footer';

function TrackReport() {
  const [ticketNumber, setTicketNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [issue, setIssue] = useState(null);

  const handleTrack = async (e) => {
    e.preventDefault();
    if (!ticketNumber.trim()) return;

    setLoading(true);
    setError(null);
    setIssue(null);

    try {
      const res = await api.get(`/api/issues/track/${ticketNumber}`);
      if (res.success && res.data?.issue) {
        setIssue(res.data.issue);
      } else {
        setError(res.message || 'Issue not found. Please check your ticket number.');
      }
    } catch (err) {
      setError('Failed to fetch issue details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Operational': return 'bg-emerald-100 text-emerald-600';
      case 'Reported': return 'bg-rose-100 text-rose-600';
      case 'Assigned': return 'bg-blue-100 text-blue-600';
      case 'In Progress': return 'bg-amber-100 text-amber-600';
      case 'Resolved': return 'bg-emerald-100 text-emerald-600';
      case 'Closed': return 'bg-slate-100 text-slate-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-rose-100 text-rose-800';
      case 'Medium': return 'bg-amber-100 text-amber-800';
      case 'Low': return 'bg-emerald-100 text-emerald-800';
      case 'Critical': return 'bg-red-200 text-red-900';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col supports-[overflow:clip]:overflow-clip">
      <Header />
      
      <main className="flex-1 max-w-lg w-full mx-auto p-4 pt-24 flex flex-col gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Track Your Report</h2>
          <p className="text-gray-500 mb-6">Enter your ticket number to check the status of your reported issue.</p>
          
          <form onSubmit={handleTrack} className="flex gap-3 mb-2">
            <input
              type="text"
              className="flex-1 border-gray-200 rounded-xl focus:ring-violet-500 focus:border-violet-500 p-3"
              placeholder="e.g. TKT-12345"
              value={ticketNumber}
              onChange={(e) => setTicketNumber(e.target.value)}
              required
            />
            <button 
              type="submit" 
              disabled={loading || !ticketNumber.trim()}
              className="bg-violet-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-violet-700 disabled:opacity-50 transition flex items-center justify-center min-w-[100px]"
            >
              {loading ? (
                <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
              ) : (
                'Track'
              )}
            </button>
          </form>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center text-red-600">
            {error}
          </div>
        )}

        {issue && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-800">{issue.title}</h3>
                <p className="text-sm text-gray-500 font-mono mt-1">Ticket: {issue.issue_number}</p>
              </div>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(issue.status)}`}>
                {issue.status}
              </span>
            </div>
            
            <div className="space-y-4">
              <div className="border-t border-gray-50 pt-4">
                <span className="text-xs uppercase font-semibold text-gray-500 block mb-1">Description</span>
                <p className="text-gray-700 text-sm whitespace-pre-wrap">{issue.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 border-t border-gray-50 pt-4">
                <div>
                  <span className="text-xs uppercase font-semibold text-gray-500 block mb-1">Category</span>
                  <span className="text-gray-800 text-sm">{issue.category || 'General'}</span>
                </div>
                <div>
                  <span className="text-xs uppercase font-semibold text-gray-500 block mb-1">Priority</span>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-semibold ${getPriorityColor(issue.priority)}`}>
                    {issue.priority || 'Medium'}
                  </span>
                </div>
              </div>

              {issue.asset && (
                <div className="border-t border-gray-50 pt-4">
                  <span className="text-xs uppercase font-semibold text-gray-500 block mb-1">Asset</span>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-800 text-sm font-medium">{issue.asset.name}</span>
                    <span className="text-gray-400 text-sm font-mono">({issue.asset.code})</span>
                  </div>
                  {issue.asset.location && (
                    <p className="text-gray-500 text-sm mt-1">{issue.asset.location}</p>
                  )}
                </div>
              )}
              
              <div className="border-t border-gray-50 pt-4">
                <span className="text-xs uppercase font-semibold text-gray-500 block mb-1">Reported On</span>
                <span className="text-gray-800 text-sm">
                  {new Date(issue.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer border={true} />
    </div>
  );
}

export default TrackReport;
