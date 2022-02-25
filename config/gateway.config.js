/* eslint-disable no-process-env */

module.exports = {
  appTitle: process.env.APP_TITLE || '',
  appHTMLTitle: process.env.APP_HTML_TITLE || 'Olapic',
  version: process.env.VERSION,
  port: process.env.PORT,
  debug: {
    configurationController: process.env.DEBUG_CONFIGURATION_CONTROLLER === 'true',
    showErrors: process.env.DEBUG_SHOW_ERRORS === 'true',
    logRequests: process.env.DEBUG_LOG_REQUESTS === 'true',
  },
  adminAPI2Server: {
    url: process.env.ADMIN_API_2_URL,
    endpoints: {
      collections: {
        byId: 'collectors/rules/filters/:collectionId',
        getAll: 'collectors/rules',
      },
      keywords: {
        search: 'keywords/:phrase',
      },
      media: {
        discarded: {
          path: 'media/indexed_search/predeleted',
          query: {
            count: null,
          },
        },
        edit: 'media/:mediaId/assets/edit',
        filters: {
          path: 'media/indexed_search',
          query: {
            count: 0,
          },
        },
        keywords: 'media/:mediaId/keywords',
        metadata: 'metadata',
        search: {
          path: 'media/indexed_search/stream/positions',
          query: {
            count: null,
          },
        },
        status: 'media/status',
        streamsPositions: {
          single: 'media/:mediaId/streams/positions',
          bulk: {
            path: 'media/streams/positions',
            query: {
              media_ids: null,
            },
          },
        },
        suggestions: {
          path: 'search/suggestions',
          query: {
            phrase: null,
          },
        },
      },
      rights: {
        get: 'rightsmanagement/groups/templates',
        messages: 'rightsmanagement/groups',
        messagesById: 'rightsmanagement/groups/:messageId',
        requestBulk: 'rightsmanagement/rights/group',
        requestSingle: 'rightsmanagement/rights/message',
        templates: 'rightsmanagement/templates',
        templatesById: 'rightsmanagement/templates/:templateId',
      },
      settings: {
        avatar: 'customer/avatar',
        analytics: 'customer/settings/analytics',
      },
      sharing: {
        sharingDocuments: 'v1/sharing_documents',
      },
      social: {
        accounts: 'socialconnections',
        accountsById: 'socialconnections/:socialConnectionId',
        mentionsAccounts: 'collectors/rules/customers/me/handlers/mentions',
      },
      streams: {
        search: {
          path: 'streams/search',
          query: {
            items_per_page: null,
            page_number: null,
            pagination_key: null,
            phrase: null,
          },
        },
      },
      whitelist: {
        delete: 'whitelist/:whitelistUserId',
        getAll: {
          path: 'whitelist/search',
          query: {
            items_per_page: null,
            page_number: null,
            sort_by: null,
            sort_order: null,
            status: null,
            username: null,
            label: null,
            label_partial_match: null,
          },
        },
        update: 'whitelist/bulk',
        validate: 'whitelist/bulk/validate',
      },
      zendesk: {
        dashboard: 'zendesk/dashboard',
      },
    },
    oneValueFilters: [
      'rights_whitelisted',
    ],
  },
  apiV2Server: {
    url: process.env.API_V2_URL,
    endpoints: {
      users: 'users',
    },
  },
  authNZSever: {
    url: process.env.AUTHNZ_API_URL,
    endpoints: {
      permissions: 'customeraccounts/:customerId/permissions',
    },
  },
  downloader: {
    allowedDomains: process.env.DOWNLOADER_ALLOWED_DOMAINS.split(','),
    bulkLimit: 90,
  },
  externalApps: {
    contentPublishing: process.env.CONTENT_PUBLISHING_URL,
    emailStudio: process.env.EMAIL_STUDIO_URL,
    lemuramaAnalytics: process.env.LEMURAMA_ANALYTICS_URL,
    permissions: process.env.PERMISSIONS_URL,
    photorank: process.env.PHOTORANK_URL,
    sandbox: process.env.SANDBOX_URL,
    tapshopAdmin: process.env.TAPSHOP_ADMIN_URL,
  },
  features: {
    analytics: {
      enabled: process.env.GA_ENABLED ? (process.env.GA_ENABLED === 'true') : true,
      id: process.env.GA_ID || 'UA-284996-9',
      eventsPrefix: 'ContentEngineAdmin:',
    },
    fullStory: {
      enabled: process.env.FS_ENABLED ? (process.env.FS_ENABLED === 'true') : true,
    },
    heapAnalytics: {
      enabled: process.env.HEAP_ENABLED ? (process.env.HEAP_ENABLED === 'true') : true,
      id: process.env.HEAP_ID || '2432849863',
    },
    intercom: {
      enabled: process.env.INTERCOM_ENABLED ? (process.env.INTERCOM_ENABLED === 'true') : true,
      id: process.env.INTERCOM_ID || 'mpj8a0bm',
    },
    sentry: {
      enabled: process.env.SENTRY_ENABLED ? (process.env.SENTRY_ENABLED === 'true') : true,
      apiKey: process.env.SENTRY_API_KEY,
      projectId: process.env.SENTRY_PROJECT_ID,
    },
  },
  genericError: 'Unexpected error',
  imageServer: {
    url: process.env.IMAGE_SERVER_URL,
  },
  moe: {
    url: process.env.MOE_URL,
    endpoints: {
      auth: 'auth/:network?token=:token&customer_id=:customerId',
    },
  },
  olapicCustomerHeader: 'x-olapic-customer-id',
  pinterestGatewayAPIServer: {
    url: process.env.PINTEREST_GATEWAY_API_URL,
    endpoints: {
      getBoards: 'api/boards',
      getPinDetails: 'api/pins/:pinId',
      createPins: 'api/pins',
    },
  },
  reportingAPIServer: {
    url: process.env.REPORTING_API_URL,
    endpoints: {
      advocates: {
        enterprise: {
          path: 'v2/reports/enterprise/ambassadors/:customerFocus/overview',
          query: {
            conversion_interval: null,
            currency: null,
            date_from: null,
            date_to: null,
            sort: null,
          },
        },
        child: {
          path: 'v2/reports/ambassadors/:customerFocus/overview',
          query: {
            conversion_interval: null,
            currency: null,
            date_from: null,
            date_to: null,
            sort: null,
          },
        },
      },
      export: {
        advocates: {
          enterprise: {
            path: 'v2/reports/enterprise/ambassadors/:customerFocus/overview.csv',
            query: {
              conversion_interval: null,
              currency: null,
              date_from: null,
              date_to: null,
              sort: null,
            },
          },
          child: {
            path: 'v2/reports/ambassadors/:customerFocus/overview.csv',
            query: {
              conversion_interval: null,
              currency: null,
              date_from: null,
              date_to: null,
              sort: null,
            },
          },
        },
      },
    },
  },
  schedulerAPIServer: {
    url: process.env.SCHEDULER_API_URL,
    endpoints: {
      task: 'customers/:customerId/tasks',
      taskById: 'customers/:customerId/tasks/:taskId',
      scheduledTasks: {
        path: 'customers/:customerId/tasks',
        query: {
          from: null,
          to: null,
        },
      },
    },
  },
  sharingAPIServer: {
    url: process.env.SHARING_API_URL,
    endpoints: {
      sharing: {
        sharingDocuments: 'sharing_documents',
      },
    },
  },
  socialConnectorAPIServer: {
    url: process.env.SOCIAL_CONNECTOR_API_URL,
    endpoints: {
      adsAccounts: 'customers/:customerId/fb/ads/adaccounts',
      adAccountAssets: 'customers/:customerId/fb/ads/adaccounts/:adAccountId/assets',
      instagramBusinessAccounts: 'customers/:customerId/instagram/accounts',
    },
  },
  sso: {
    url: process.env.SSO_URL,
    settings: {
      client: 'admin',
      accountSelection: true,
      accountScope: 'content_engine',
      accountPermissionScopes: [
        'content_engine',
        'content_granular_permissions',
      ],
      applicationPermissions: [
        'authnz_server',
      ],
    },
  },
  uploaderAPIServer: {
    url: process.env.UPLOADER_API_URL,
    endpoints: {
      media: 'media',
    },
  },
  uploaderPreviewerAPIServer: {
    url: process.env.UPLOADER_PREVIEWER_API_URL,
    endpoints: {
      upload: 'upload',
    },
  },
};
