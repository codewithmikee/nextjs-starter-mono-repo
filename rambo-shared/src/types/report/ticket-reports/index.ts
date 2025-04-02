// ---- Ticket report --------------------------------

import { TicketStatus } from '../../api-calls/backend-enums';
import { DateOrString } from '@shared/types';
import { IPrismaPagination } from '../report-types';
import { IKenoGameForReport } from '../game-reports';
import { ISimpleUserInfoForRelation } from '@shared/types/simple-types';

export interface ITicketReportResponse {
  tickets: IKenoTicketForTicketReport[];
  totalCount: number;
  totalCancelled: number; // count of status cancelled
  totalPaid: number; // count of status paid
  totalWin: number; // count of status win
  totalLose: number; // count of status lose
  pagination: IPrismaPagination;
}

export interface IKenoTicketForReport {
  id: string;
  uniqueId: string;
  totalBetAmount: number | null;
  possibleWinAmount: number | null;
  winAmount: number | null;
  status: TicketStatus;
  createdAt: DateOrString;
  cashierId: string;
  cancelledBy?: ISimpleUserInfoForRelation | null;
  printedBy: ISimpleUserInfoForRelation;
  cancelledAt: DateOrString | null;
  cancelledCashierId: string | null;
  payment: ITicketPayment | null;
  selections: IKenoTicketSelectionReport[];
}

export interface IKenoTicketSelectionReport {
  id: string;
  betAmount: number | null;
  possibleWinAmount: number | null;
  winAmount?: number | null;
  status: TicketStatus;
  selectedNumbers: number[];
}

export type IKenoTicketForTicketReport = {
  game: IKenoGameForReport;
} & IKenoTicketForReport;

export interface ITicketPayment {
  id: string;
  ticketId: string;
  cashierId: string;
  paidBy: ISimpleUserInfoForRelation;
  paidAmount: number | null;
  createdAt: DateOrString;
}
