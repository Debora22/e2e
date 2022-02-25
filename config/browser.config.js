/* eslint-disable no-process-env */
const version = process.env.VERSION;

module.exports = {
  version,
  api: {
    url: `/api/${version}`,
    endpoints: {
      advocates: {
        getAll: {
          path: 'advocates/:accountType/:customerFocus',
          query: {
            conversionInterval: null,
            currency: null,
            dateFrom: null,
            dateTo: null,
            sort: null,
          },
        },
      },
      collections: {
        byId: 'collections/:collectionId',
        getAll: 'collections',
      },
      keywords: {
        search: 'keywords/:phrase',
      },
      media: {
        download: 'media/download',
        edit: 'media/:mediaId/edit',
        filters: 'media/filters',
        keywords: 'media/:mediaId/keywords',
        metadata: 'media/metadata',
        search: {
          path: 'media/search',
          query: {
            count: 90,
          },
        },
        status: 'media/status',
        streamsPositions: 'media/:mediaId/streams/positions',
        suggestions: {
          path: 'media/suggestions',
          query: {
            phrase: null,
          },
        },
        upload: 'media/upload',
      },
      rights: {
        messages: 'rights/messages',
        messagesById: 'rights/messages/:messageId',
        requestBulk: 'rights/request/bulk',
        requestSingle: 'rights/request/single',
        templates: 'rights/templates',
        templatesById: 'rights/templates/:templateId',
      },
      scheduler: {
        task: 'scheduler',
        taskById: 'scheduler/:taskId',
        scheduledTasks: {
          path: 'scheduler/tasks',
          query: {
            from: null,
            to: null,
          },
        },
      },
      settings: {
        analytics: 'settings/analytics',
      },
      sharing: {
        documents: 'sharing/documents',
      },
      social: {
        accounts: 'social/accounts',
        accountsById: 'social/accounts/:socialConnectionId',
        adsAccounts: 'social/fb/adsaccounts',
        adsAccountsAssets: 'social/fb/adsaccounts/assets',
        instagramBusinessAccounts: 'social/instagram/accounts',
        mentionsAccounts: 'social/accounts/mentions',
        pinterestBoards: 'social/pinterest/boards',
        pinterestPins: 'social/pinterest/pins',
        pinterestPinById: 'social/pinterest/pins/:pinId',
      },
      streams: {
        search: {
          path: 'streams/search',
          query: {
            itemsPerPage: 90,
            pageNumber: 1,
            paginationKey: null,
            phrase: null,
          },
        },
        positions: {
          path: 'streams/positions',
          query: {
            mediaIds: null,
          },
        },
      },
      users: {
        getAll: 'users',
      },
      whitelist: {
        delete: 'whitelist/:whitelistUserId',
        getAll: {
          path: 'whitelist/search',
          query: {
            itemsPerPage: 20,
            labelPartialMatch: true,
            pageNumber: 1,
            search: null,
            sortBy: null,
            sortOrder: null,
            status: null,
            criteria: null,
          },
        },
        update: 'whitelist/bulk',
        validate: 'whitelist/bulk/validate',
      },
      zendesk: {
        dashboard: 'zendesk/dashboard',
      },
    },
  },
  approveNextStatus: {
    forReviewFlow: {
      id: 23,
      name: 'SFL',
      section: 'Saved for Later',
    },
    normalFlow: {
      id: 40,
      name: 'OK',
      section: 'Approved Content',
    },
    manualStreamsFlow: {
      id: 23,
      name: 'SFL',
      section: 'Saved for Later',
    },
  },
  collections: {
    hashtagLimit: 30,
  },
  esSyncTime: 1000,
  externalAppsWaitTime: 10000,
  notifications: {
    animationTime: 500,
    maxOnDisplay: 3,
  },
  rights: {
    extension: {
      id: 'ehbkkbccendigiccmmpnbhheleicghem',
      version: '1.1.0',
    },
    maxChars: {
      instagram: 300,
      twitter: 119,
    },
    minMessages: 5,
    pii: {
      messagesName: 'Copyright & Author consent',
      streamName: 'NO PII',
    },
  },
};
