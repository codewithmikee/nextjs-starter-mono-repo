import {
  TicketStatus,
  GameType,
  GameStatus,
  OddType
} from '../api-calls/backend-enums';
import { DateOrString } from '@shared/types';
import { ISimpleShopInfo } from '@shared/types/simple-types';
import { IKenoTicketForReport } from './ticket-reports';

export interface IKenoGameForReport {
  id: string;
  uniqueId: string;
  shopId: string;
  gameType: GameType;
  status: GameStatus;
  oddType: OddType;
  createdAt: DateOrString;
  startAt: DateOrString;
  endAt: DateOrString;
  winningNumbers: number[];
  ticketWillBeDisabledAt: DateOrString;
  winningNumberWillBeShowedAt: DateOrString;
  shop: ISimpleShopInfo;
}
// ----- Ticket report --------------------------------
export interface IKenoGameReportDetail {
  tickets: IKenoTicketForReport[];
}

export interface IDBKenoGame {
  id: string;
  gameId: string;
  winningNumbers: number[];
  ticketWillBeDisabledAt: DateOrString;
  winningNumberWillBeShowedAt: DateOrString;
}
