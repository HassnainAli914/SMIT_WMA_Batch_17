import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import { api } from '../utils/api';
import { useAuth } from '../contexts/AuthContext';

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { profile } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const res = await api.get('/api/analytics/summary');
        if (res.success) {
          setStats(res.data.summary);
        } else {
          setError(res.message || 'Failed to fetch analytics data');
        }
      } catch (err) {
        setError('An error occurred while fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount || 0);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Operational': return 'bg-emerald-100 text-emerald-600 dark:bg-emerald-400/20 dark:text-emerald-400';
      case 'Under Inspection': return 'bg-amber-100 text-amber-600 dark:bg-amber-400/20 dark:text-amber-400';
      case 'In Maintenance': return 'bg-blue-100 text-blue-600 dark:bg-blue-400/20 dark:text-blue-400';
      case 'Issue Reported': return 'bg-rose-100 text-rose-600 dark:bg-rose-400/20 dark:text-rose-400';
      case 'Out of Service': return 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400';
      // issue statuses
      case 'Reported': return 'bg-rose-100 text-rose-600 dark:bg-rose-400/20 dark:text-rose-400';
      case 'Assigned': return 'bg-blue-100 text-blue-600 dark:bg-blue-400/20 dark:text-blue-400';
      case 'In Progress': return 'bg-amber-100 text-amber-600 dark:bg-amber-400/20 dark:text-amber-400';
      case 'Resolved': return 'bg-emerald-100 text-emerald-600 dark:bg-emerald-400/20 dark:text-emerald-400';
      case 'Closed': return 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400';
      default: return 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-rose-500 text-white';
      case 'Medium': return 'bg-amber-500 text-white';
      case 'Low': return 'bg-emerald-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            
            {/* Dashboard Header */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">Dashboard Overview</h1>
                <p className="text-sm text-gray-500 mt-1">Welcome back, {profile?.name || 'User'}! Here's what's happening.</p>
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-500"></div>
              </div>
            ) : error ? (
              <div className="bg-rose-100 text-rose-600 p-4 rounded-lg flex items-center">
                <svg className="w-6 h-6 mr-3 fill-current" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
                {error}
              </div>
            ) : stats ? (
              <div className="space-y-6">
                
                {/* Top Stat Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Total Assets */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5 flex flex-col relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10 dark:opacity-5">
                      <svg className="w-16 h-16 fill-violet-500" viewBox="0 0 24 24"><path d="M20 7h-4V5c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zM10 5h4v2h-4V5zm10 14H4V9h16v10z"/></svg>
                    </div>
                    <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">Total Assets</h2>
                    <div className="text-3xl font-bold text-gray-800 dark:text-gray-100 mt-2">{stats?.assets?.total || 0}</div>
                  </div>

                  {/* Open Issues */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5 flex flex-col relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10 dark:opacity-5">
                      <svg className="w-16 h-16 fill-rose-500" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
                    </div>
                    <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">Open Issues</h2>
                    <div className="text-3xl font-bold text-gray-800 dark:text-gray-100 mt-2">{stats?.issues?.unresolved || 0}</div>
                    <div className="text-sm text-gray-500 mt-2"><span className="text-rose-500 font-medium">{stats?.issues?.unassigned || 0}</span> unassigned</div>
                  </div>

                  {/* Maintenance Spend */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5 flex flex-col relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10 dark:opacity-5">
                      <svg className="w-16 h-16 fill-emerald-500" viewBox="0 0 24 24"><path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/></svg>
                    </div>
                    <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">Maintenance Spend</h2>
                    <div className="text-3xl font-bold text-gray-800 dark:text-gray-100 mt-2">{formatCurrency(stats?.maintenance?.totalCost || 0)}</div>
                    <div className="text-sm text-gray-500 mt-2">{stats?.maintenance?.totalRecords || 0} records</div>
                  </div>

                  {/* Total Users */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5 flex flex-col relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10 dark:opacity-5">
                      <svg className="w-16 h-16 fill-blue-500" viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
                    </div>
                    <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">Total Users</h2>
                    <div className="text-3xl font-bold text-gray-800 dark:text-gray-100 mt-2">{stats?.users?.total || 0}</div>
                  </div>
                </div>

                {/* Status Breakdown Row */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
                  <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">Asset Status Breakdown</h2>
                  <div className="flex flex-wrap gap-3">
                    {Object.entries(stats?.assets?.byStatus || {}).map(([status, count]) => (
                      <div key={status} className={`px-4 py-2 rounded-full flex items-center shadow-sm border border-gray-100 dark:border-gray-700 ${getStatusColor(status)?.split(' ')[0] || ''} ${getStatusColor(status)?.split(' ')[1] || ''} bg-opacity-10 dark:bg-opacity-10`}>
                        <span className="w-2 h-2 rounded-full mr-2 currentColor bg-current"></span>
                        <span className="font-medium mr-2">{status}:</span>
                        <span className="font-bold">{count}</span>
                      </div>
                    ))}
                    {Object.keys(stats?.assets?.byStatus || {}).length === 0 && (
                      <p className="text-gray-500 italic">No asset status data available.</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Recent Issues */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col">
                    <div className="p-5 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                      <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">Recent Issues</h2>
                      <NavLink to="/issues" className="text-sm text-violet-500 hover:text-violet-600 font-medium">View All &rarr;</NavLink>
                    </div>
                    <div className="overflow-x-auto grow">
                      {stats?.issues?.recent?.length > 0 ? (
                        <table className="w-full text-sm text-left">
                          <thead className="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-gray-700/50 dark:text-gray-400">
                            <tr>
                              <th className="px-4 py-3 font-semibold">Title</th>
                              <th className="px-4 py-3 font-semibold">Asset</th>
                              <th className="px-4 py-3 font-semibold">Status</th>
                              <th className="px-4 py-3 font-semibold">Date</th>
                            </tr>
                          </thead>
                          <tbody>
                            {(stats?.issues?.recent || []).map((issue) => (
                              <tr key={issue?.id || Math.random()} className="border-b border-gray-100 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                <td className="px-4 py-3">
                                  <div className="font-medium text-gray-800 dark:text-gray-200">{issue?.title}</div>
                                  <div className="mt-1">
                                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getPriorityColor(issue?.priority)}`}>
                                      {issue?.priority}
                                    </span>
                                  </div>
                                </td>
                                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                                  {issue?.asset?.name || '-'} <br/>
                                  <span className="text-xs text-gray-400">{issue?.asset?.code || ''}</span>
                                </td>
                                <td className="px-4 py-3">
                                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(issue?.status)}`}>
                                    {issue?.status}
                                  </span>
                                </td>
                                <td className="px-4 py-3 text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                  {issue?.created_at ? formatDate(issue.created_at) : '-'}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      ) : (
                        <div className="p-6 text-center text-gray-500">No recent issues found.</div>
                      )}
                    </div>
                  </div>

                  {/* Recent Assets */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col">
                    <div className="p-5 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                      <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">Recently Added Assets</h2>
                      <NavLink to="/assets" className="text-sm text-violet-500 hover:text-violet-600 font-medium">View All &rarr;</NavLink>
                    </div>
                    <div className="p-4 flex flex-col gap-3 grow">
                      {stats?.assets?.recent?.length > 0 ? (
                        (stats?.assets?.recent || []).map((asset) => (
                          <div key={asset?.id || Math.random()} className="flex items-center justify-between p-3 rounded-lg border border-gray-100 dark:border-gray-700 hover:shadow-sm transition-shadow">
                            <div className="flex items-center space-x-4">
                              <div className="w-10 h-10 rounded-full bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center text-violet-500 shrink-0">
                                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/><path d="M7 12h2v5H7zm4-3h2v8h-2zm4-3h2v11h-2z"/></svg>
                              </div>
                              <div>
                                <h3 className="font-semibold text-gray-800 dark:text-gray-100">{asset?.name}</h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Code: {asset?.code} • {asset?.location || 'No location'}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(asset?.status)}`}>
                                {asset?.status}
                              </span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-6 text-center text-gray-500">No recent assets found.</div>
                      )}
                    </div>
                  </div>
                </div>

              </div>
            ) : null}

          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;