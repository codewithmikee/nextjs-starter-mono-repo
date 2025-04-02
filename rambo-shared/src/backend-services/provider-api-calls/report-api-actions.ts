'use server';

// import { ReportApi } from '@/backend-services/server-side-calls/report-server-side-calls';
// import { IServerResponse } from '@/types/api-calls/api-types';
// import { ICashReportResponse } from '@/types/report/cash-report-types';
import {
  IReportFilter,
  IReportFilterForTicket
} from '@/types';
// import { ITicketReportResponse } from '@shared/types/report/ticket-reports/ticket-report-types';
import { ReportApi } from './server-side-calls';
import { IServerResponse } from '@shared/types';
import { ITicketReportResponse } from '@/types';
import { ICashReportResponse } from '@/types';

export async function fetchCashReport(
  query: IReportFilter
): Promise<IServerResponse<ICashReportResponse[]>> {
  try {
    const report = await ReportApi.filteredCashReport(query);

    return {
      data: report
    };
  } catch (error) {
    console.error('Failed to fetch cash report:', error);
    return { error: 'Failed to load cash report. Please try again later.' };
  }
}

// Server Action to fetch ticket report
export async function fetchTicketReport(
  query?: IReportFilterForTicket
): Promise<IServerResponse<ITicketReportResponse>> {
  try {
    const report = await ReportApi.filteredTicketReport(query);
    console.info('Ticket report fetched', {
      filter: query,
      report
    });

    return {
      data: report
    };
  } catch (error) {
    console.error('Error fetching ticket report:', error);
    throw new Error('Failed to fetch ticket report');
  }
}

// Server Action to fetch game report
export async function fetchGameReport(
  query?: IReportFilter
): Promise<ICashReportResponse[]> {
  try {
    return await ReportApi.filteredGameReport(query);
  } catch (error) {
    console.error('Error fetching game report:', error);
    throw new Error('Failed to fetch game report');
  }
}
