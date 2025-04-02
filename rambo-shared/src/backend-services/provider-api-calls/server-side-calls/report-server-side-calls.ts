import {
  ICashReportForResponse,
  ICashReportResponse
} from '@/types/report/cash-report-types';
import {
  IReportFilter,
  IReportFilterForDataReport
} from '@/types/report/report-types';
import { ServerApiService } from '@shared/lib/api-configurations/server-side-call-handler';
export class ReportApi {
  static prefix = 'provider/report';
  static async filteredCashReport(query?: IReportFilter) {
    return ServerApiService.get<ICashReportResponse[]>(
      `${this.prefix}/cash`,
      query
    );
  }

  static async filteredTicketReport(
    query?: IReportFilterForDataReport
  ): Promise<any> {
    return await ServerApiService.get<any>(`${this.prefix}/ticket`, query);
  }

  static async filteredGameReport(query?: IReportFilter) {
    return ServerApiService.get<ICashReportResponse[]>(
      `${this.prefix}/game`,
      query
    );
  }
}
