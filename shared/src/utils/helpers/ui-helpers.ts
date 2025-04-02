import { ActiveStatus } from '../../types/api-calls/backend-enums';

export type StatusBadgeVariant = 'default' | 'green' | 'yellow' | 'red' | 'blue' | 'purple' | 'outline' | null | undefined;

export const getBadgeVariantForActiveStatus = (
  status: ActiveStatus
): StatusBadgeVariant => {
  switch (status) {
    case ActiveStatus.IN_ACTIVE:
      return 'red';
    default:
      return 'green';
  }
};

export enum TicketStatus {
  ON_PLAY = 'ON_PLAY',
  WIN = 'WIN',
  LOSE = 'LOSE',
  PAID = 'PAID',
  CANCELLED = 'CANCELLED'
}

export const getStatusMapForTicketStatus = (
  status: TicketStatus
): {
  color: StatusBadgeVariant;
  label: string;
} => {
  switch (status) {
    case TicketStatus.ON_PLAY:
      return { color: 'blue', label: 'On Play' };
    case TicketStatus.WIN:
      return { color: 'green', label: 'Winner' };
    case TicketStatus.LOSE:
      return { color: 'yellow', label: 'Loser' };
    case TicketStatus.PAID:
      return { color: 'purple', label: 'Paid' };
    case TicketStatus.CANCELLED:
      return { color: 'red', label: 'Cancelled' };
    default:
      return { color: 'default', label: 'Unknown' };
  }
};
