import { Langs, I18n } from '@utils/i18n/i18n.types';
import { AuthorizedAjax } from '@utils/http/http.types';

type TrueCallback = () => boolean;

type OriginalAdvancedSettingsCallback = () => void;
type OriginalBindActionsCallback = TrueCallback;
type OriginalDestroyCallback = () => void;
type OriginalInitCallback = TrueCallback;
type OriginalLeadsSelectedCallback = () => void;
type OriginalTodoSelectedCallback = () => void;
type OriginalContactsSelectedCallback = () => void;
type OriginalDpSettingsCallback = () => void;
type OriginalInitMenuPageCallback = (params: InitMenuPageParams) => void;
type OriginalLinkCardCallback = TodoAny;
type OriginalLoadCatalogElementCallback = (catalog_element: object) => void;
type OriginalLoadElementsCallback = TodoAny;
// type: Record<string, string | number>,
// id: number
type OriginalLoadPreloadedDataCallback = () => Promise<unknown[]>;
type OriginalOnAddAsSourceCallback = (pipelineId: number) => void;
type OriginalOnSalesbotDesignerSaveCallback = (
  handlerCode: string,
  params: Record<string, unknown>
) => string;
type OriginalOnSaveCallback = TrueCallback;
type OriginalRenderCallback = TrueCallback;
type OriginalSalesbotDesignerSettingsCallback = TodoAny;
type OriginalSettingsCallback = (modalContentElement: JQuery) => void;

type ContextWrapper<F extends (...args: any) => any> = (
  self: AbstractIntegration,
  ...args: Parameters<F>
) => ReturnType<F>;

export type AdvancedSettingsCallback =
  ContextWrapper<OriginalAdvancedSettingsCallback>;
export type BindActionsCallback = ContextWrapper<OriginalBindActionsCallback>;
export type DestroyCallback = ContextWrapper<OriginalDestroyCallback>;
export type InitCallback = ContextWrapper<OriginalInitCallback>;
export type LeadsSelectedCallback =
  ContextWrapper<OriginalLeadsSelectedCallback>;
export type TodoSelectedCallback = ContextWrapper<OriginalTodoSelectedCallback>;
export type ContactsSelectedCallback =
  ContextWrapper<OriginalContactsSelectedCallback>;
export type DpSettingsCallback = ContextWrapper<OriginalDpSettingsCallback>;
export type InitMenuPageCallback = ContextWrapper<OriginalInitMenuPageCallback>;
export type LinkCardCallback = ContextWrapper<OriginalLinkCardCallback>;
export type LoadCatalogElementCallback =
  ContextWrapper<OriginalLoadCatalogElementCallback>;
export type LoadElementsCallback = ContextWrapper<OriginalLoadElementsCallback>;
export type LoadPreloadedDataCallback =
  ContextWrapper<OriginalLoadPreloadedDataCallback>;
export type OnAddAsSourceCallback =
  ContextWrapper<OriginalOnAddAsSourceCallback>;
export type OnSalesbotDesignerSaveCallback =
  ContextWrapper<OriginalOnSalesbotDesignerSaveCallback>;
export type OnSaveCallback = ContextWrapper<OriginalOnSaveCallback>;
export type RenderCallback = ContextWrapper<OriginalRenderCallback>;
export type SalesbotDesignerSettingsCallback =
  ContextWrapper<OriginalSalesbotDesignerSettingsCallback>;
export type SettingsCallback = ContextWrapper<OriginalSettingsCallback>;

/**
 * For all api reference go to:
 *
 * @see https://developers.kommo.com
 */
export interface AbstractIntegration {
  /**
   * The render_template() method wraps the provided markup
   * or template in the standard widget layout and places the
   * resulting markup in the right column of the widgets.
   * You can pass HTML markup or a template with data for rendering
   * to this function, just like with the render() method.
   * The function supplements the provided markup with its own,
   * stored in the template_element variable of the widget object.
   *
   * @see https://developers.kommo.com/docs/script-js#selfrender_template
   */
  render_template(options: {
    /**
     * Modal window title
     */
    caption: {
      /**
       * Custom class of a title
       */
      class_name: string;
    };
    /**
     * Plain html string.
     */
    body: string;
    /**
     * underscore.js template string.
     */
    render: '';
  }): void;
  render_template(
    options: {
      /**
       * Modal window title
       */
      caption: {
        /**
         * Custom class of a title
         */
        class_name: string;
      };
      /**
       * Plain html string.
       */
      body: '';
      /**
       * underscore.js template string.
       */
      render: string;
    },
    renderParams: object
  ): void;
  /**
   * Integration's langs
   */
  langs: Langs;
  /**
   * The method of getting langs via key.
   *
   * @see https://developers.kommo.com/docs/script-js#self-i18n-key
   */
  i18n: I18n;
  /**
   * The method adding to request 'X-Auth-Token'
   *
   * Works only with oauth integrations
   *
   * @see https://developers.kommo.com/docs/one-time-tokens
   */
  $authorizedAjax: AuthorizedAjax;
  /**
   * This method is necessary to retrieve user input from
   * the widget and return it as a JavaScript object.
   *
   * @see https://developers.kommo.com/docs/script-js#selfget_settings
   */
  get_settings: () => object;
  /**
   * The method allows user to add custom settings.
   *
   * @see https://developers.kommo.com/docs/script-js#selfset_settings
   */
  set_settings(newSettings: {
    /**
     * Custom settings in format key: value.
     */
    [key: string]: unknown;
  }): void;
  /**
   * This function retrieves a list of checked contacts or
   * leads from the respective table and returns it as an
   * array of objects. The objects contain two properties:
   * count_selected and selected. One of the selected objects
   * contains an array of checkboxed objects with emails, IDs,
   * phones, and type properties.
   *
   * @see https://developers.kommo.com/docs/script-js#selflist_selected
   *
   * @todo determine correct return type
   */
  list_selected: () => object[];
  /**
   * This function allows you to change the default
   * settings for files from the i18n folder.
   * The current lang object is stored in
   * the langs variable of the widget object.
   *
   * @see https://developers.kommo.com/docs/script-js#selfset_lang
   */
  set_lang: (newLangs: Langs) => void;
  /**
   * This function allows you to find out which pipeline the widget is connected
   * to as a source. Available if there is a lead_sources area in manifest.json.
   *
   * @see https://developers.kommo.com/docs/script-js#selfget_pipeline_id
   */
  get_pipeline_id: () => JQuery.Deferred<string>;
  /**
   * Sets the status of the widget. The status is displayed in the
   * settings area and on the widget icon.
   * Available statuses are:
   * - 'install': The widget is not active.
   * - 'installed': The widget is active.
   * - 'error': The widget is in an error state, often used when
   * there is an issue with the configuration or third-party API.
   *
   * @see https://developers.kommo.com/docs/script-js#selfset_status
   */
  set_status: (status: 'install' | 'installed' | 'error') => void;
  /**
   * Retrieves the version number of the widget.
   * This method is useful for resetting the static cache
   * after an update, ensuring that the correct version is
   * being used.
   *
   * @see https://developers.kommo.com/docs/script-js#selfget_version
   */
  get_version: () => string;
  /**
   * Retrieves the installation status of the widget.
   * This method returns a string representing the current
   * installation status.
   *
   * Available statuses:
   * - 'install': The widget is not active.
   * - 'installed': The widget is active.
   * - 'not_configured': The widget tour has been completed,
   *
   * But the settings have not been filled in.
   *
   * @see https://developers.kommo.com/docs/script-js#selfget_install_status
   */
  get_install_status: () => 'install' | 'installed' | 'not_configured';
  /**
   * Sets the catalog ID for the widget.
   * This method links the widget to a specific catalog (or directory) by its ID.
   * The catalog ID is required to edit, load, or perform other actions on
   * catalog elements.
   * This should be called before attempting to edit a catalog element to ensure that
   * the widget knows which catalog it is working with.
   *
   * @see https://developers.kommo.com/docs/lists-sdk
   */
  setSdkCatalogId: (catalogId: string | number) => void;
  /**
   * Widget's set of callbacks
   *
   * @see https://developers.kommo.com/docs/script-js#a-template-of-scriptjs
   */
  callbacks: {
    /**
     * When installing the widget, the callbacks.render method is called first.
     * This method usually outlines the steps required to display the widget.
     * By default, the widget will only appear in the settings menu.
     * To show the widget in other areas, such as the widget panel on the right,
     * you need to use specific methods within this function, such as the object
     * methods render() and/or render_template(), which are further parsed.
     *
     * It is crucial that the callbacks.render function returns true. This is because
     * without this, the callbacks.init and callbacks.bind_actions methods will not start.
     *
     * @see https://developers.kommo.com/docs/script-js#render
     */
    render: OriginalRenderCallback;
    /**
     * The init method runs immediately after callbacks.render
     * and along with callbacks.bind_actions. Typically, the
     * init method is used to gather necessary information and
     * perform other actions, such as communicating with a
     * third-party server and API authorization if the widget
     * is used to send or request information. In the simplest case,
     * it can determine the user's current location.
     *
     * Use init or bind_actions if your widget reacts to events or has to re-initialize.
     *
     * The callbacks.init method must return true for further work.
     *
     * @see https://developers.kommo.com/docs/script-js#init
     */
    init: InitCallback;
    /**
     * This function is also triggered when you disable the widget through
     * its settings menu. For instance, if the widget is disabled, you need
     * to remove all its elements from the DOM or take any other necessary action.
     * Additionally, this function is also called when you switch between
     * widget display areas.
     *
     * @see https://developers.kommo.com/docs/script-js#destroy
     */
    destroy: DestroyCallback;
    /**
     * This method is used to attach events to the user's actions,
     * such as when they click on a button.
     *
     * The callbacks.bind_actions method must return true.
     *
     * @see https://developers.kommo.com/docs/script-js#bind_actions
     */
    bind_actions: BindActionsCallback;
    /**
     * The callbacks.settings method is triggered when the user
     * clicks on the widget's icon in the settings area.
     *
     * @see https://developers.kommo.com/docs/script-js#settings
     */
    settings: OriginalSettingsCallback;
    /**
     * This method is called when the user navigates
     * to the widget's advanced settings page.
     *
     * To enable callbacks.advancedSettings method,
     * you need to specify the widget connection area `'advanced_settings'`.
     *
     * @see https://developers.kommo.com/docs/script-js#advancedsettings
     */
    advancedSettings?: OriginalAdvancedSettingsCallback;
    /**
     * The method is called in the digital pipeline area
     *
     * It is necessary to add `digital_pipeline` location in
     * the manifest.json for this callback to work.
     *
     * @see https://developers.kommo.com/docs/script-js#dpsettings
     */
    dpSettings?: OriginalDpSettingsCallback;
    /**
     * The method is called by user clicking button 'Install/Save'
     * in widget's settings. may be used for sending data filled in
     * settings form and changing the widget's status.
     *
     * Please note that this method also fires when the widget is disabled.
     * The `onSave` method is triggered first, followed by the `destroy` method.
     *
     * @see https://developers.kommo.com/docs/script-js#onsave
     */
    onSave?: () => OriginalOnSaveCallback;
    /**
     * The callback of the widget loadCatalogElement will be called,
     * when you try to edit the directory element.In
     * this case, the standard edit card of the list element
     * won't open.
     * In order to specify the directory id, it is necessary to
     * call the widget method setSdkCatalogId first, passing the directory
     * id to the argument until the widget's settings are saved.
     *
     * @see https://developers.kommo.com/docs/lists-sdk
     *
     * @todo determine correct return type
     */
    loadCatalogElement?: OriginalLoadCatalogElementCallback;
    /**
     * This method is triggered when the widget's tab is initialized.
     *
     * It is responsible for displaying data intended to be
     * added to the card when the search field is opened.
     *
     * The method returns a Promise object that, upon
     * completion of the request, returns an array of objects.
     *
     * @see https://developers.kommo.com/docs/card-sdk#loadpreloadeddata-method
     */
    loadPreloadedData?: OriginalLoadPreloadedDataCallback;
    /**
     * The function defines the logic of the source
     * and is triggered when a source such as an SMS is used.
     *
     * @see https://developers.kommo.com/docs/script-js#onsource
     */
    onSource?: () => void;
    /**
     * The function defines the logic of the widget action and is called when
     * the widget is added to the Salesbot constructor during saving.
     *
     * @see https://developers.kommo.com/docs/script-js#onsalesbotdesignersave
     *
     * @todo determine correct type for params
     */
    onSalesbotDesignerSave?: OriginalOnSalesbotDesignerSaveCallback;
    /**
     * The function is called when adding a widget
     * as a source in the digital pipeline settings.
     *
     * @see https://developers.kommo.com/docs/script-js#onaddassource
     */
    onAddAsSource?: OriginalOnAddAsSourceCallback;
    /**
     * Object containing event handler related to contacts.
     * Used for handling selected contacts.
     *
     * @see https://developers.kommo.com/docs/script-js#contactsselected
     */
    contacts?: {
      /**
       * This function is triggered when you select items
       * from the contacts list by using the checkbox and
       * then clicking on the widget name in the additional
       * menu that appears while choosing items from a list. It
       * is used when you need to take any action with the
       * selected objects.
       *
       * @see https://developers.kommo.com/docs/script-js#contactsselected
       */
      selected: OriginalContactsSelectedCallback;
    };
    /**
     * Object containing event handler related to leads.
     * Used for handling selected contacts.
     *
     * @see https://developers.kommo.com/docs/script-js#leadsselected
     */
    leads?: {
      /**
       * This function is triggered when you select items
       * from the leads list by using the checkbox and
       * then clicking on the widget name in the additional
       * menu that appears while choosing items from a list. It
       * is used when you need to take any action with the
       * selected objects.
       *
       * @see https://developers.kommo.com/docs/script-js#leadsselected
       */
      selected: OriginalLeadsSelectedCallback;
    };
    /**
     * Object containing event handler related to tasks.
     * Used for handling selected contacts.
     * @see https://developers.kommo.com/docs/script-js#todoselected
     */
    todo?: {
      /**
       * This function is triggered when you select items
       * from the tasks list by using the checkbox and
       * then clicking on the widget name in the additional
       * menu that appears while choosing items from a list. It
       * is used when you need to take any action with the
       * selected objects.
       *
       * @see https://developers.kommo.com/docs/script-js#todoselected
       */
      selected: OriginalTodoSelectedCallback;
    };
    /**
     * The method is triggered when the user enters a custom widget page,
     * or a subsection of a system section like 'stats' or 'settings'.
     * This method renders the page based on its current state.
     *
     * @see https://developers.kommo.com/docs/left-menu
     */
    initMenuPage?: InitMenuPageCallback;
  };
}

export interface InitMenuPageParams {
  /**
   * The current location of the page. It can be:
   */
  location: string;
  /**
   * The item code specified in manifest.json for custom sections.
   * This field is only present for custom sections
   * (not for system sections like 'stats' or 'settings').
   */
  item_code?: string;
  /**
   * The subitem code specified in manifest.json for subsections.
   * This field is only present for subsections under
   * system sections like 'stats' or 'settings'.
   */
  subitem_code?: string;
}
