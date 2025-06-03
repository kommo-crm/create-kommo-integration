/**
 * The global APP object which provides relevant data based on
 * the user interface they are currently using.
 *
 * @see https://developers.kommo.com/docs/environment-variables
 */
export interface AppInterface {
  /**
   * The method will return a string indicating the entity you
   * are currently in (e.g., leads or contacts).
   *
   * @see https://developers.kommo.com/docs/environment-variables#name-of-the-entity-you-are-in
   *
   * @todo add concrete entities to return type
   */
  getBaseEntity: () => string;
  /**
   * The method will return a boolean value (true/false)
   * indicating whether you are currently in the card.
   *
   * @see https://developers.kommo.com/docs/environment-variables#check-whether-you-are-in-the-card
   */
  isCard: () => boolean;
  /**
   * The method will return the string code of the current page.
   *
   * @see https://developers.kommo.com/docs/environment-variables#get-the-current-page-code
   *
   * @todo add concrete entities to return type
   */
  getWidgetsArea: () => string;
  /**
   * Determine the language set in the user profile.
   *
   * @see https://developers.kommo.com/docs/environment-variables#determine-the-language-set-in-the-user-profile
   */
  lang_id: 'en' | 'pt' | 'es' | string;
  /**
   * The function is designed to retrieve the constant's
   * value passed to the key.
   *
   * @see https://developers.kommo.com/docs/environment-variables#appconstantkey
   */
  constant: <T extends keyof Constants>(key: T) => Constants[T];
  /**
   * Returns an object with user statuses.
   *
   * @todo add more methods.
   */
  sdk: {
    /**
     * Shows whether user is online or not.
     *
     * @see https://developers.kommo.com/docs/environment-variables#obtain-the-online-status-users
     */
    showUserStatus: () => UserStatus;
  };
  /**
   * Returns an object with data about current catalog.
   *
   * @see https://developers.kommo.com/docs/environment-variables#accessing-data-on-a-page
   */
  data: {
    /**
     * Represents the current interface view (excluding cards).
     *
     * The `APP.data.current_view` object contains the root DOM element
     * of the active interface the user is currently interacting with.
     *
     * @see https://developers.kommo.com/docs/environment-variables#appdatacurrent_view
     *
     * @todo determine correct return type
     */
    current_view: object;
    /**
     * Returns arrays with objects with detailed
     * information about current catalog's items.
     *
     * @see https://developers.kommo.com/docs/environment-variables#appdatacurrent_list
     *
     * @todo determine correct return type
     */
    current_list?: object | false;
    /**
     * Returns object with detailed
     * information about current card.
     * If not in the card returns false.
     *
     * @see https://developers.kommo.com/docs/environment-variables#appdatacurrent_card
     *
     * @todo determine correct return type
     */
    current_card?: object | false;
  };
  /**
   * Interface for managing user-facing notifications.
   *
   * @see https://developers.kommo.com/docs/add-notifications
   */
  notifications: {
    /**
     * Displays a standard notification message.
     *
     * @see https://developers.kommo.com/docs/add-notifications#information-notice
     */
    show_message: (params: ShowMessageParams) => void;
    /**
     * Displays an error notification in the interface only.
     *
     * @see https://developers.kommo.com/docs/add-notifications#error-notification
     */
    show_message_error: (params: ShowMessageErrorParams) => void;
    /**
     * The method enables you to show a pop-up notification for a call or an error.
     * If you utilize this feature, it will only appear in the interface and will not
     * be sent through other channels.
     *
     * @see https://developers.kommo.com/docs/add-notifications#incoming-call-notification
     */
    show_notification: (params: ShowNotificationParams) => void;
    /**
     * The method enables you to add an error notification to the notification center,
     * and the message will be sent to all active channels in the user’s account.
     *
     * @see https://developers.kommo.com/docs/add-notifications#adding-an-error-notification
     */
    add_error: (params: AddErrorParams) => void;
    /**
     * Displays an incoming call notification across all delivery channels.
     *
     * @see https://developers.kommo.com/docs/add-notifications#incoming-call-notification-1
     */
    add_call: (params: AddCallParams) => void;
  };
}
/**
 * Parameters for `APP.notifications.show_message()`
 */
export interface ShowMessageParams {
  /**
   * Post Title displayed at the top of the message.
   */
  header: string;
  /**
   * Notification text displayed to the user.
   */
  text: string;
  /**
   * (Optional) Date in Unix Timestamp format.
   */
  date?: number;
  /**
   * (Optional) URL to an icon file. If not passed, the default robot icon is used.
   */
  icon?: string;
}

/**
 * Parameters for `APP.notifications.show_message_error()`
 */
export interface ShowMessageErrorParams {
  /**
   * Post Title displayed at the top of the error message.
   */
  header: string;
  /**
   * Notification text displayed to the user.
   */
  text: string;
  /**
   * (Optional) Date in Unix Timestamp format.
   */
  date?: number;
  /**
   * (Optional) URL where a user will be redirected if they click the notification.
   */
  link?: string;
}

/**
 * Parameters for `APP.notifications.show_notification()`
 */
export interface ShowNotificationParams {
  /**
   * An object containing header and text for the notification.
   */
  text: {
    /**
     * Notification Header text.
     */
    header: string;
    /**
     * Text message content.
     */
    text: string;
  };
  /**
   * Type of pop-up notification. Can be 'call', 'error'.
   */
  type: 'call' | 'error';
  /**
   * (Optional) Date in Unix Timestamp format.
   */
  date?: number;
}

/**
 * Parameters for `APP.notifications.add_error()`
 */
export interface AddErrorParams {
  /**
   * (Optional) Post title of the error notification.
   */
  header?: string;
  /**
   * Notification text displayed to the user.
   */
  text: string;
  /**
   * (Optional) Date in Unix Timestamp format.
   */
  date?: number;
  /**
   * (Optional) URL where a user will be redirected if they click the notification.
   */
  link?: string;
}

/**
 * Parameters for `APP.notifications.add_call()`
 */
export interface AddCallParams {
  /**
   * Text message displayed in the notification.
   */
  text: string;
  /**
   * (Optional) Date in Unix Timestamp format.
   */
  date?: number;
  /**
   * (Optional) Initiator of the call (name or phone number).
   */
  from?: string;
  /**
   * (Optional) Recipient of the call (manager name or extension).
   */
  to?: string;
  /**
   * Entity info to navigate on click.
   */
  element: {
    /**
     * ID of the entity to link to.
     */
    id: number;
    /**
     * Type of entity: 'contact', 'lead', or 'company'.
     */
    type: 'contact' | 'lead' | 'company';
  };
  /**
   * (Optional) Duration of the call in seconds.
   */
  duration?: number;
  /**
   * (Optional) Link to the call recording.
   */
  link?: string;
}

export interface TaskTypesConstant {
  /**
   * Objects width detailed information about custom task types.
   */
  [key: string]: TaskType;
}

export interface TaskType {
  /**
   * The is of a custom taks.
   */
  id: number;
  /**
   * The name od a custom type.
   */
  option: string;
  /**
   * The hexadecimal color value for this custom task type icon.
   */
  color: string;
  /**
   * The id of this custom task type icon.
   */
  icon_id: number;
}

export interface GroupsConstant {
  /**
   * The id of a group of users.
   */
  [groupId: string]: string;
}

export interface ManagersConstant {
  /**
   * User id
   */
  [id: string]: Manager;
}

export interface Manager {
  /**
   * User id.
   */
  id: string;
  /**
   * User name.
   */
  title: string;
  /**
   * User name.
   */
  option: string;
  /**
   * Shows whether the user is activated in account.
   */
  active: boolean;
  /**
   * User login represented as email.
   */
  login: string;
  status: string;
  /**
   * Shows whether the user is admin or not.
   */
  is_admin: 'Y' | 'N';
  /**
   * Shows whether the user is free or not.
   */
  free_user: 'Y' | 'N';
  /**
   * User's amojo id.
   */
  amojo_id: string;
  /**
   * Account's amojo id.
   */
  amo_profile_id: string | null;
  /**
   * Endpoint for user's avatar.
   */
  avatar: string;
  /**
   * Shows the preffered theme of interface for the user, where 1
   * is a light theme and 2 is a dark theme.
   */
  theme: 1 | 2;
  /**
   * User's phone number&
   */
  phone: string;
  /**
   * Shows id of user's group.
   */
  group: string;
}

export interface UserStatus {
  /**
   * User id.
   */
  [id: string]: {
    /**
     * User id.
     */
    id: string;
    /**
     * Online status.
     */
    online: boolean;
  };
}

type UserConstant = {
  /**
   * The amojo ID of the user.
   */
  amojo_id: string;
  /**
   * The unique identifier of the user.
   */
  id: number;
  /**
   * The login name of the user.
   */
  login: string;
  /**
   * The full name of the user.
   */
  name: string;
  /**
   * The personal mobile number of the user.
   */
  personal_mobile: string;
  /**
   * The URL of the user's photo.
   */
  photo: string;
  /**
   * The theme ID selected by the user.
   */
  theme: number;
  /**
   * Indicates whether the user has completed the onboarding tour.
   */
  tour: boolean;
  /**
   * The rank or role of the user.
   */
  user_rank: string;
  /**
   * The UUID of the user.
   */
  uuid: string;
};

enum ConstantsKey {
  /**
   * Key for user-related constant values.
   */
  USER = 'user',
  /**
   * Key for permissions and access rights assigned to a user.
   */
  USER_RIGHTS = 'user_rights',
  /**
   * Key for account-specific configuration values.
   */
  ACCOUNT = 'account',
  /**
   * Key for information about managers or supervisory roles.
   */
  MANAGERS = 'managers',
  /**
   * Key for groups or organizational units within the application.
   */
  GROUPS = 'groups',
  /**
   * Key for types of tasks available in the system.
   */
  TASK_TYPES = 'task_types',
}

type Constants = {
  /**
   * User-related constant values.
   */
  [ConstantsKey.USER]: UserConstant;
  /**
   * Permissions and access rights assigned to a user.
   */
  [ConstantsKey.USER_RIGHTS]: object;
  /**
   * Account-specific configuration values.
   */
  [ConstantsKey.ACCOUNT]: object;
  /**
   * Information about managers or supervisory roles.
   */
  [ConstantsKey.MANAGERS]: object;
  /**
   * Groups or organizational units within the application.
   */
  [ConstantsKey.GROUPS]: object;
  /**
   * Types of tasks available in the system.
   */
  [ConstantsKey.TASK_TYPES]: object;
};
