import { getSupabaseAdmin } from '../config/supabase';
import { AppError } from '../middleware/errorHandler';
import { logger } from '../utils/logger';
import { aiService } from './ai.service';

export class IssueService {
  async createIssue(payload: {
    asset_id: string;
    title: string;
    description: string;
    priority: string;
    category: string;
    reporter_name?: string;
    reporter_email?: string;
    skip_background_ai?: boolean;
    possible_solution?: string;
  }) {
    const supabase = getSupabaseAdmin();

    // Generate unique issue number: e.g. TICKET-173648
    const issueNum = `TICKET-${Math.floor(100000 + Math.random() * 900000)}`;

    const { data, error } = await supabase
      .from('issues')
      .insert({
        issue_number: issueNum,
        asset_id: payload.asset_id,
        title: payload.title,
        description: payload.description,
        priority: payload.priority || 'Medium',
        category: payload.category,
        reporter_name: payload.reporter_name || 'Anonymous',
        reporter_email: payload.reporter_email || null,
        status: 'Reported',
        ...(payload.skip_background_ai ? {
          ai_status: 'Completed',
          ai_title: payload.title,
          ai_description: payload.description + (payload.possible_solution ? `\n\n**Possible Solution:**\n${payload.possible_solution}` : ''),
          ai_category: payload.category,
          ai_priority: payload.priority,
          ai_processed_at: new Date().toISOString()
        } : {})
      })
      .select()
      .single();

    if (error) {
      logger.error(`Create issue error: ${error.message}`);
      throw new AppError('Failed to record issue ticket', 500);
    }

    if (!payload.skip_background_ai) {
      // Trigger AI processing in the background (fire-and-forget)
      this.processIssueAi(data.id, data.title, data.description).catch(err => {
        logger.error(`Background AI processing failed for issue ${data.id}:`, err);
      });
    }

    return data;
  }

  private async processIssueAi(issueId: string, title: string, description: string) {
    const supabase = getSupabaseAdmin();

    // Ensure status is pending
    await supabase.from('issues').update({ ai_status: 'Pending' }).eq('id', issueId);

    try {
      const aiResult = await aiService.analyzeReportOpenRouter(title, description);

      if (!aiResult) {
        throw new Error('AI Service returned null or failed.');
      }

      await supabase.from('issues').update({
        ai_title: aiResult.title,
        ai_summary: aiResult.summary,
        ai_description: aiResult.description,
        ai_category: aiResult.category,
        ai_priority: aiResult.priority,
        ai_keywords: aiResult.keywords,
        ai_missing_information: aiResult.missing_information,
        ai_status: 'Completed',
        ai_processed_at: new Date().toISOString()
      }).eq('id', issueId);
      
      logger.info(`AI Processing completed for issue ${issueId}`);
    } catch (error: any) {
      logger.error(`AI Processing error for issue ${issueId}:`, error);
      await supabase.from('issues').update({ ai_status: 'Failed' }).eq('id', issueId);
    }
  }

  async retryAiAnalysis(id: string) {
    const supabase = getSupabaseAdmin();
    
    const { data: ticket, error } = await supabase
      .from('issues')
      .select('title, description')
      .eq('id', id)
      .single();

    if (error || !ticket) {
      throw new AppError('Issue not found', 404);
    }

    // Trigger async processing and return immediately
    this.processIssueAi(id, ticket.title, ticket.description).catch(err => {
      logger.error(`Retry AI processing failed for issue ${id}:`, err);
    });

    return { message: 'AI Analysis retry triggered' };
  }

  async assignIssue(id: string, technicianId: string) {
    const supabase = getSupabaseAdmin();

    const { data, error } = await supabase
      .from('issues')
      .update({
        assigned_technician_id: technicianId,
        status: 'Assigned',
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      logger.error(`Assign issue error: ${error.message}`);
      throw new AppError('Failed to assign technician', 500);
    }

    // Log history
    await supabase.from('asset_history').insert({
      asset_id: data.asset_id,
      action: 'TECHNICIAN_ASSIGNED',
      details: `Issue assigned to technician (ID: ${technicianId})`,
      issue_id: id,
    });

    return data;
  }

  async startInspection(id: string, technicianId: string) {
    const supabase = getSupabaseAdmin();

    // Fetch the ticket first to verify it's assigned to this technician
    const { data: ticket, error: fetchErr } = await supabase
      .from('issues')
      .select('*')
      .eq('id', id)
      .single();

    if (fetchErr || !ticket) {
      throw new AppError('Issue ticket not found', 404);
    }

    if (ticket.assigned_technician_id !== technicianId) {
      throw new AppError('Unauthorized. You can only start inspections on tickets assigned to you.', 403);
    }

    const { data, error } = await supabase
      .from('issues')
      .update({ status: 'Inspection Started' })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      logger.error(`Start inspection error: ${error.message}`);
      throw new AppError('Failed to transition to inspection', 500);
    }

    // Update asset status
    await supabase
      .from('assets')
      .update({ status: 'Under Inspection' })
      .eq('id', ticket.asset_id);

    // Log history
    await supabase.from('asset_history').insert({
      asset_id: ticket.asset_id,
      actor_id: technicianId,
      action: 'INSPECTION_STARTED',
      details: 'Technician has started structural inspection',
      issue_id: id,
    });

    return data;
  }

  async logMaintenance(
    issueId: string,
    technicianId: string,
    payload: {
      inspection_notes: string;
      work_performed: string;
      parts_replaced?: string;
      cost: number;
      time_spent: number;
      next_service_date?: string;
    }
  ) {
    const supabase = getSupabaseAdmin();

    if (payload.cost < 0) {
      throw new AppError('Maintenance cost cannot be negative.', 400);
    }

    // Fetch ticket to verify technician
    const { data: ticket, error: ticketErr } = await supabase
      .from('issues')
      .select('*')
      .eq('id', issueId)
      .single();

    if (ticketErr || !ticket) {
      throw new AppError('Issue ticket not found', 404);
    }

    if (ticket.assigned_technician_id !== technicianId) {
      throw new AppError('Unauthorized. You can only resolve issues assigned to you.', 403);
    }

    // Create the maintenance record
    const { data: record, error: recordErr } = await supabase
      .from('maintenance_records')
      .insert({
        issue_id: issueId,
        asset_id: ticket.asset_id,
        technician_id: technicianId,
        inspection_notes: payload.inspection_notes,
        work_performed: payload.work_performed,
        parts_replaced: payload.parts_replaced || null,
        cost: payload.cost,
        time_spent: payload.time_spent,
      })
      .select()
      .single();

    if (recordErr) {
      logger.error(`Log maintenance error: ${recordErr.message}`);
      throw new AppError('Failed to record maintenance details', 500);
    }

    // Transition ticket to resolved
    await supabase
      .from('issues')
      .update({ status: 'Resolved' })
      .eq('id', issueId);

    // Transition asset back to operational and update service dates
    const assetUpdatePayload: any = {
      status: 'Operational',
      last_service_date: new Date().toISOString(),
    };

    if (payload.next_service_date) {
      const nextDate = new Date(payload.next_service_date);
      const today = new Date();
      if (nextDate < today) {
        throw new AppError('Next service date cannot be in the past.', 400);
      }
      assetUpdatePayload.next_service_date = payload.next_service_date;
    }

    await supabase
      .from('assets')
      .update(assetUpdatePayload)
      .eq('id', ticket.asset_id);

    // Log history
    await supabase.from('asset_history').insert({
      asset_id: ticket.asset_id,
      actor_id: technicianId,
      action: 'MAINTENANCE_COMPLETED',
      details: `Repair completed successfully. Cost: $${payload.cost}. Work: ${payload.work_performed}`,
      issue_id: issueId,
    });

    return record;
  }

  async listIssues(filters: {
    status?: string;
    priority?: string;
    asset_id?: string;
    assigned_technician_id?: string;
  }) {
    const supabase = getSupabaseAdmin();
    let query = supabase.from('issues').select('*, asset:assets(id, name, code), technician:profiles!assigned_technician_id(id, name, email)');

    if (filters.status) {
      query = query.eq('status', filters.status);
    }
    if (filters.priority) {
      query = query.eq('priority', filters.priority);
    }
    if (filters.asset_id) {
      query = query.eq('asset_id', filters.asset_id);
    }
    if (filters.assigned_technician_id) {
      query = query.eq('assigned_technician_id', filters.assigned_technician_id);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      logger.error(`List issues error: ${error.message}`);
      throw new AppError('Failed to load issues', 500);
    }

    return data;
  }

  async updateIssue(id: string, payload: any) {
    const supabase = getSupabaseAdmin();

    const { data, error } = await supabase
      .from('issues')
      .update(payload)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      logger.error(`Update issue error: ${error.message}`);
      throw new AppError('Failed to update issue details', 500);
    }

    return data;
  }

  async deleteIssue(id: string) {
    const supabase = getSupabaseAdmin();

    const { error } = await supabase
      .from('issues')
      .delete()
      .eq('id', id);

    if (error) {
      logger.error(`Delete issue error: ${error.message}`);
      throw new AppError('Failed to remove issue ticket', 500);
    }

    return true;
  }

  async getIssueByTicketNumber(ticketNumber: string) {
    const supabase = getSupabaseAdmin();

    const { data, error } = await supabase
      .from('issues')
      .select('id, issue_number, title, description, status, priority, category, created_at, updated_at, asset:assets(name, code, location)')
      .eq('issue_number', ticketNumber)
      .single();

    if (error || !data) {
      throw new AppError('Ticket not found or invalid ticket number', 404);
    }

    return data;
  }
}

export const issueService = new IssueService();
