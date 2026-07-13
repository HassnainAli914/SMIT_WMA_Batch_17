import { getSupabaseAdmin } from '../config/supabase';
import { AppError } from '../middleware/errorHandler';
import { logger } from '../utils/logger';

export class AnalyticsService {
  async getSummary() {
    const supabase = getSupabaseAdmin();

    const [
      { data: assets, error: assetsErr },
      { data: issues, error: issuesErr },
      { data: maintenance, error: mainErr },
      { data: profiles, error: profilesErr },
    ] = await Promise.all([
      supabase.from('assets').select('id, name, code, status, location, created_at').order('created_at', { ascending: false }),
      supabase.from('issues').select('id, status, priority, title, created_at, asset_id, assigned_technician_id, asset:assets(name, code)').order('created_at', { ascending: false }),
      supabase.from('maintenance_records').select('id, cost, time_spent, created_at'),
      supabase.from('profiles').select('id, role'),
    ]);

    if (assetsErr) { logger.error(`Analytics assets error: ${assetsErr.message}`); throw new AppError('Failed to load analytics', 500); }
    if (issuesErr) { logger.error(`Analytics issues error: ${issuesErr.message}`); throw new AppError('Failed to load analytics', 500); }
    if (mainErr)   { logger.error(`Analytics maintenance error: ${mainErr.message}`); throw new AppError('Failed to load analytics', 500); }

    // Assets
    const totalAssets = assets?.length || 0;
    const assetsByStatus: Record<string, number> = {};
    (assets || []).forEach(a => { assetsByStatus[a.status] = (assetsByStatus[a.status] || 0) + 1; });
    const recentAssets = (assets || []).slice(0, 5);

    // Issues
    const totalIssues = issues?.length || 0;
    const issuesByStatus: Record<string, number> = {};
    const issuesByPriority: Record<string, number> = {};
    (issues || []).forEach(i => {
      issuesByStatus[i.status]   = (issuesByStatus[i.status] || 0) + 1;
      issuesByPriority[i.priority] = (issuesByPriority[i.priority] || 0) + 1;
    });
    const unresolvedIssues = (issues || []).filter(i => i.status !== 'Resolved' && i.status !== 'Closed').length;
    const unassignedIssues = (issues || []).filter(i => i.status === 'Reported').length;
    const recentIssues = (issues || []).slice(0, 8);

    // Maintenance
    const totalMaintenanceCost = (maintenance || []).reduce((sum, r) => sum + (Number(r.cost) || 0), 0);
    const totalTimeSpent = (maintenance || []).reduce((sum, r) => sum + (Number(r.time_spent) || 0), 0);
    const totalMaintenanceRecords = maintenance?.length || 0;

    // Users by role
    const usersByRole: Record<string, number> = {};
    (profiles || []).forEach(p => { usersByRole[p.role] = (usersByRole[p.role] || 0) + 1; });
    const totalUsers = profiles?.length || 0;

    return {
      assets:      { total: totalAssets, byStatus: assetsByStatus, recent: recentAssets },
      issues:      { total: totalIssues, unresolved: unresolvedIssues, unassigned: unassignedIssues, byStatus: issuesByStatus, byPriority: issuesByPriority, recent: recentIssues },
      maintenance: { totalCost: totalMaintenanceCost, totalTimeSpent, totalRecords: totalMaintenanceRecords },
      users:       { total: totalUsers, byRole: usersByRole },
    };
  }
}

export const analyticsService = new AnalyticsService();
