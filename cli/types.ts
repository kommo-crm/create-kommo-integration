export enum AvailableLocale {
  /**
   * English language locale.
   */
  English = 'en',
  /**
   * Spanish language locale.
   */
  Spanish = 'es',
  /**
   * Portuguese language locale.
   */
  Portuguese = 'pt',
}

export const enum LocationWithAdditionalProps {
  /**
   * Digital pipeline location for widget.
   */
  DigitalPipeline = 'digital_pipeline',
  /**
   * Advanced settings location for widget.
   */
  AdvancedSettings = 'advanced_settings',
  /**
   * Mobile card location for widget.
   */
  MobileCard = 'mobile_card',
  /**
   * SMS location for widget.
   */
  Sms = 'sms',
  /**
   * Left menu location for widget.
   */
  LeftMenu = 'widget_page',
  /**
   * Salesbot location for widget.
   */
  Salesbot = 'salesbot_designer',
}

export interface SupportInfo {
  /**
   * The support link for the widget.
   * This could be a URL directing users to the widget's help or support page.
   */
  link: string;
  /**
   * The support email for the widget.
   * This is the email address users can contact for assistance with the widget.
   */
  email: string;
}

export interface ManifestJson {
  /**
   * Manifest information for the widget, including locale,
   * initialization status, and support details.
   */
  widget: {
    /**
     * The language code for the widget, using AvailableLocale enum.
     */
    locale: AvailableLocale;
    /**
     * The support information for the widget, including link and email.
     */
    support: {
      /**
       * The support link for the widget.
       * This could be a URL directing users to the widget's help or support page.
       */
      link: string;
      /**
       * The support email for the widget.
       * This is the email address users can contact for assistance with the widget.
       */
      email: string;
    };
  };
  /**
   * List of locations where the widget works.
   */
  locations: string[];
  /**
   * Digital pipeline configuration for the widget.
   * Defines behavior for the digital pipeline location,
   * such as action handling and webhook URL.
   */
  dp?: {
    /**
     * Indicates if multiple actions can be handled
     * simultaneously in the digital pipeline.
     */
    action_multiple: boolean;
    /**
     * The webhook URL to be used in the digital pipeline for notifications.
     */
    webhook_url: string;
    /**
     * Settings schema for configuring the widget inside the digital pipeline.
     * Each key represents a field with its metadata.
     */
    settings: {
      [key: string]: {
        /**
         * Translation key or display name for the field.
         */
        name: string;
        /**
         * Type of the field, such as 'text', 'number', etc.
         */
        type: 'text' | 'number' | 'custom' | string;
        /**
         * Indicates whether the field is required.
         */
        required: boolean;
      };
    };
  };
  /**
   * Advanced settings configuration for the widget.
   * Defines title and other settings for the advanced settings location.
   */
  advanced?: {
    /**
     * The title for the advanced settings section of the widget.
     */
    title: string;
  };
  /**
   * Mobile-specific settings for the widget.
   * Defines how the widget should be displayed in a mobile context.
   */
  mobile?: {
    /**
     * The "frame_url" is the URL that opens in a
     * designated area within the mobile application.
     */
    frame_url: string;
    /**
     * The color used for the widget in mobile view.
     */
    color: string;
  };
  /**
   * SMS configuration for the widget.
   * Defines the endpoint for sending SMS messages via the widget.
   */
  sms?: {
    /**
     * The SMS endpoint to which the widget should send SMS messages.
     */
    endpoint: string;
  };
  /**
   * Salesbot designer configuration for the widget.
   * Defines handler code and settings for the salesbot designer location.
   */
  salesbot_designer?: {
    handler_code: {
      name: string;
      settings: Record<
        string,
        {
          name: string;
          type: string;
          [key: string]: unknown;
        }
      >;
    };
  };
  /**
   * Left menu configuration for the widget.
   * Defines settings for the left menu location.
   *
   * @todo add more complex type for all possible configurations.
   */
  left_menu?: {
    notifications: {
      title: string;
      icon: string;
      sort: {
        after: string;
      };
    };
  };
}
