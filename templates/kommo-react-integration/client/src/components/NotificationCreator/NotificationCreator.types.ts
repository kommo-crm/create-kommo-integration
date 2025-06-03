import { ShowNotificationParams } from 'vendor/types/app';

export interface NotificationType {
  /**
   * Displayed name (human-readable label)
   */
  name: string;
  /**
   * Actual value used internally or in API
   */
  value: ShowNotificationParams['type'];
}

export interface NotificationCreatorProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Callback triggered when the user clicks the "Notify" button.
   */
  onNotify?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
