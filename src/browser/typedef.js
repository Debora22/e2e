/**
 * @typedef  {Object}  Action
 * @property {String}  id                         The action id.
 * @property {String}  name                       The action name.
 * @property {Object}  permission                 The permission information.
 * @property {String}  permission.name            The permissions name to check when asserting if the action
 *                                                should be disabled or not.
 * @property {String}  permission.phrase          The action to display in the message when trying to perform
 *                                                a forbidden action.
 * @property {Object}  visible                    The action visibility map configuration.
 * @property {Object}  visible.card               The visibility map configuration of the card.
 * @property {Array}   visible.card.primary       The list of sections where the action is visible
 *                                                in the primary location of the card.
 * @property {Array}   visible.card.secondary     The list of sections where the action is visible
 *                                                in the secondary location of the card.
 * @property {Object}  visible.library            The visibility map configuration of the library.
 * @property {Array}   visible.library.primary    The list of sections where the action is visible
 *                                                in the primary location of the library.
 * @property {Array}   visible.library.secondary  The list of sections where the action is visible
 *                                                in the secondary location of the library.
 * @property {Boolean} single                     If the action should only be visible for single media in the modal.
 */

/**
 * @typedef  {Object}          Aggregation
 * @property {String}          key          The key of the aggregation.
 * @property {Boolean}         expanded     If the aggregation is expanded or not.
 * @property {Array}           values       The list of available {@link Filter}.
 * @property {?AggregationMap} map          The extended AggregationMap used as a configuration map.
 */

/**
 * @typedef  {Object} AggregationMap
 * @property {String}                  label              The display label of the aggregation.
 * @property {Number}                  order              The order in which the aggregation should appear.
 * @property {?Array}                  requiresFilterBy   The list of {@link QueryFilter} that are necessary to exist
 *                                                        in the query search for the aggregation to be visible.
 * @property {Object}                  phrase             The phrase object used to generate the Filters Phrase.
 * @property {?String}                 phrase.connector   The text connector to start an agregation phrase.
 * @property {?String}                 phrase.symbol      The symbol to add to the filter label of an agregation.
 * @property {?Object}                 phrase.override    The configuration of overrides of filter labels to do.
 * @property {?Object.<String,String>} phrase.override    The configuration of overrides of filter labels to do.
 * @property {?String}                 icon               The icon type to add to the aggregation filters.
 * @property {?Boolean}                unCapitalize       If the aggregation should be uncapitalized or not.
 * @property {?Boolean}                expanded           If the aggregation should be initially expanded or not.
 * @property {?Object}                 tooltip            The aggregation tooltip configuration.
 * @property {?String}                 tooltip.direction  The direction of the tooltip.
 * @property {?String}                 tooltip.label      The display label of the tooltip.
 * @property {?Object}                 keyMap             The map to use to transform the filter label to a proper key.
 */

/**
 * @typedef  {Object}                 AppRoute
 * @property {String}                 title     The title of the AppRoute.
 * @property {String}                 route     The route of the AppRoute.
 * @property {String}                 target    The target of the AppRoute.
 * @property {Array}                  items     The array of descendant AppRoutes.
 * @property {?AppRouteConfiguration} config    The configuration of the AppRoute.
 */

/**
 * @typedef  {Object}          AppRouteConfiguration
 * @property {Boolean}         hideMenu                      If the menu should be hidden.
 * @property {String}          redirectPath                  The redirect path to use after a successful login.
 * @property {Boolean}         requiresAnonymous             If the route requires to be anonymous.
 * @property {Array}           requiresPermissions           The list of required permissions.
 * @property {Boolean}         requiresSwitchAccountEnabled  If the route requires to be able to switch account.
 * @property {String|Function} template                      The template of the navigation element.
 */

/**
 * @typedef  {Object} CdnMediaAsset
 * @property {String} url            The media original file url.
 * @property {String} name           The filename for the media original file.
 */

/**
 * @typedef  {Object} CollectionBaseType
 * @property {String} id                  The type value used in the BE.
 * @property {String} name                The type string shown in the dropdown.
 * @property {String} data                The type data value used in the BE.
 * @property {String} placeholder         The placeholder used in the form.
 * @property {String} phrase              The string used when generating the phrase.
 * @property {String} symbol              The symbol used when generating the phrase.
 * @property {RegExp} pattern             The pattern when validating the base value.
 */

/**
 * @typedef  {Object} CollectionRuleType
 * @property {String} id                  The type value used in the BE.
 * @property {String} name                The type string shown in the dropdown.
 * @property {String} data                The type data value used in the BE.
 * @property {Number} maxlength           The maxlength used in the form.
 * @property {String} placeholder         The placeholder used in the form.
 * @property {String} phrase              The string used when generating the phrase.
 * @property {String} symbol              The symbol used when generating the phrase.
 * @property {RegExp} pattern             The pattern when validating the base value.
 */

/**
 * @typedef  {Object}  Confirmation
 * @property {String}  title         The confirmation title.
 * @property {String}  content       The confirmation content.
 * @property {String}  confirmText   The text of the confirm button.
 * @property {String}  cancelText    The text of the cancel button.
 * @property {Promise} deferred      The confirmation result deferred promise.
 */

/**
 * @typedef  {Object}              EditStatusMap
 * @property {MediaEditStatusProp} PENDING        Setting to use when media assets_edit_status is 'PENDING'.
 * @property {MediaEditStatusProp} PROCESSED      Setting to use when media assets_edit_status is 'PROCESSED'.
 * @property {MediaEditStatusProp} FAILED         Setting to use when media assets_edit_status is 'FAILED'.
 */

/**
 * @typedef  {Object}     Filter
 * @property {String}     name      The name (key) of the Filter.
 * @property {?String}    label     The display label of the Filter.
 * @property {Number}     total     The total amount of Media it will filter.
 * @property {Boolean}    selected  If the filter is selected or not.
 * @property {?FilterMap} map       The extended FilterMap used as a configuration map.
 */

/**
 * @typedef  {Object}  FilterMap
 * @property {String}  label      The actual display label of the Filter.
 * @property {?String} icon       The icon the filter should display.
 */

/**
 * @typedef  {Object} ActivationMap
 * @property {Object.<String, Activation>} facebook            The facebook activation.
 * @property {Object.<String, Activation>} instagram           The instagram activation.
 * @property {Object.<String, Activation>} pinterest           The pinterest activation.
 * @property {Object.<String, Activation>} shoppableInstagram  The shoppable instagram activation.
 */

/**
 * @typedef  {Object} Activation
 * @property {String}              mediaKey  The key name that contains the {@link ActivationStatus} on each
 *                                           media entity.
 * @property {ActivationStatusMap} statuses  The activation status map.
 */

/**
 * @typedef  {Object} ActivationStatusMap
 * @property {ActivationStatus} UPLOADED   The activation status map for 'FAILED' to process media.
 * @property {ActivationStatus} FAILED     The activation status map for 'SCHEDULED' to be processed media.
 * @property {ActivationStatus} SCHEDULED  The activation status map for 'UPLOADED' media.
 */

/**
 * @typedef  {Object} ActivationStatus
 * @property {String} tooltip           Message shown within the Tooltip.
 * @property {String} image             Icon URL to show in the status section.
 */

/**
 * @typedef  {Object} MediaChangeRequest
 * @property {Array}  media               The list of media to change the status to.
 * @property {String} status              The status to set to the given media.
 * @property {String} successMessage      The message to display on success.
 * @property {String} errorMessage        The message to display on error.
 */

/**
 * @typedef  {Object}  MediaEditStatusProp
 * @property {String}  toolTip              Message shown within the Tooltip.
 * @property {String}  image                Icon URL to show in the edit status section.
 * @property {Boolean} errorIcon            Flag to indicate if the error icon should be visible.
 */

/**
 * @typedef  {Object}  Notification
 * @property {Number}  id            The id of the notification.
 * @property {String}  type          The type of notification to display.
 * @property {Number}  expiration    The notification expiration time.
 * @property {Boolean} expired       If the notification is expired or not.
 * @property {String}  content       The notification content to display.
 * @property {Boolean} visible       If the notification is visible or not.
 */

/**
 * @typedef  {Object} Pagination
 * @property {Number} from        The pagination start point.
 * @property {String} next        The pagination next page url.
 * @property {String} prev        The pagination previous page url.
 * @property {Number} to          The pagination end point.
 * @property {Number} total       The total amount of entities.
 */

/**
 * @typedef  {Object}  RightsMessagesGroup
 * @property {Object}  details                              The social networks details of the group.
 * @property {Object}  details.instagram                    The details for instagram of the group.
 * @property {Number}  details.instagram.current_templates  The count of the templates for instagram.
 * @property {Boolean} details.instagram.valid              If the group is valid to be used for instagram in bulk.
 * @property {Object}  details.twitter                      The details for twitter of the group.
 * @property {Number}  details.twitter.current_templates    The count of the templates for twitter.
 * @property {Boolean} details.twitter.valid                If the group is valid to be used for twitter in bulk.
 * @property {Number}  id                                   The rights messages group id.
 * @property {String}  name                                 The rights messages group name.
 * @property {Array}   templates                            The list of {@link RightsMessage} of the group.
 */

/**
 * @typedef  {Object} RightsMessage
 * @property {String} id                    The rights message id.
 * @property {Object} message               The rights message content.
 * @property {String} message.instance      The instance of the rights message to use when asking for rights.
 * @property {String} message.template      The template of the rights message.
 * @property {String} message.vars.hashtag  The approval hashtag of the rights message.
 * @property {Object} message.vars.tos_url  The TOS url of the rights message.
 * @property {String} name                  The rights message name.
 * @property {String} social_network        The social netwkor the rights message was created for.
 * @property {String} status                The rights message status.
 */

/**
 * @typedef  {Object} ShareModalActivation
 * @property {String} id                    The id for the section.
 * @property {String} helpUrl               The url to link the Help Website.
 * @property {String} name                  The name of the section to be displayed.
 */

/**
 * @typedef  {Object} Sort
 * @property {Number} id     The sort id.
 * @property {String} name   The sort name.
 * @property {Array}  values The list of sorts to set to the query when selected.
 */

/**
 * @typedef  {Object}   SuggestionMap
 * @property {String}   aggregation   The aggregation that the suggestion is linked with.
 * @property {String}   id            The if of the suggestion.
 * @property {String}   label         The display label of the suggestion.
 * @property {Number}   order         The order in which the suggestion should appear.
 * @property {?String}  symbol        The symbol to add to the label of the suggestion values.
 * @property {?Boolean} unCapitalize  If the suggestion should be uncapitalized or not.
 * @property {Array}    values        The list of suggestion values to display.
 */

/**
 * @external TwitterText
 * @see https://github.com/twitter/twitter-text
 */

/**
 * @external FileSaver
 * @see https://github.com/eligrey/FileSaver.js
 */

/**
 * @external Moment
 * @see https://github.com/moment/moment
 */
