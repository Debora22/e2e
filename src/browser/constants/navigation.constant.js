import { string as sanitizeString } from 'olapic-js-utils/browser/sanitize';

const content = {
  title: 'Content',
  route: '/content',
  config: {
    reloadOnSearch: false,
    requiresPermissions: ['admin.content'],
    template: `
      <library-container></library-container>
    `,
  },
};

/**
 * @ngdoc constant
 * @name NAVIGATION
 * @description
 * Object of navigation elements.
 *
 * @type {Object}
 * @property {Array}  avatarItems  The list of avatar {@link AppRoute}.
 * @property {Object} home         The {@link AppRoute} of the home.
 * @property {Array}  mainNav      The list of main navigation {@link AppRoute}.
 * @property {Array}  subNav       The list of secondary navigation {@link AppRoute}.
 * @property {Array}  unmapped     The list of unmapped {@link AppRoute} (routes that don't appear on the menu).
 * @property {Array}  legacy       The list of legacy {@link AppRoute}.
 *
 * @memberof contentEngineAdmin
 */
const navigation = {
  avatarItems: [{
    title: 'Settings',
    route: '/settings',
    config: {
      reloadOnSearch: false,
      requiresPermissions: ['admin.settings'],
      template: `
        <settings-container></settings-container>
      `,
    },
  }, {
    title: 'Permissions',
    route: '/permissions',
    target: '_blank',
    config: {
      hideMenu: true,
      // Use the double array so it checks if it has any permission.
      requiresPermissions: [[
        'admin',
        'super_admin',
        'brand_admin',
      ]],
      template: `
        <external-app-container
          app="permissions"
          redirect="true"
        ></external-app-container>
      `,
    },
  }, {
    title: 'Switch Account',
    route: '/switch-account',
    config: {
      hideMenu: true,
      requiresSwitchAccountEnabled: true,
      template: '<switch-account-container></switch-account-container>',
    },
  }, {
    title: 'Log out',
    route: '/logout',
    config: {
      hideMenu: true,
      redirectPath: '/',
      template: '<logout-container></logout-container>',
    },
  }],
  home: content,
  mainNav: [{
    title: 'Collect',
    items: [{
      title: 'Collections',
      route: '/collections',
      config: {
        requiresPermissions: ['admin.collections'],
        template: `
          <collections-container></collections-container>
        `,
      },
    }, {
      title: 'Content Uploader',
      route: '/content-uploader',
      config: {
        requiresPermissions: ['admin.tools'],
        template: `
          <content-uploader-container></content-uploader-container>
        `,
      },
    }, {
      title: 'Blocked List',
      route: '/blocked-list',
      config: {
        requiresPermissions: ['admin.blacklist'],
        template: `
          <external-app-container
            app="photorank"
            route="admin/tools/blacklist"
          ></external-app-container>
        `,
      },
    }],
  }, {
    title: 'Curate',
    items: [
      content, {
        title: 'Streams',
        route: '/streams',
        config: {
          reloadOnSearch: false,
          requiresPermissions: ['admin.medialibrary'],
          template: `
            <external-app-container
              app="photorank"
              route="admin/streams2"
            ></external-app-container>
          `,
        },
      }, {
        title: 'Categories',
        route: '/categories',
        config: {
          requiresPermissions: ['admin.moderator'],
          template: `
            <external-app-container
              app="photorank"
              route="admin/streams/category?version=2"
            ></external-app-container>
          `,
        },
      }, {
        title: 'Automatic Rights List',
        route: '/automatic-rights-list',
        config: {
          requiresPermissions: ['admin.whitelist'],
          template: `
            <whitelist-container></whitelist-container>
          `,
        },
      }, {
        title: 'Rights Messages',
        route: '/rights-messages',
        config: {
          requiresPermissions: ['admin.settings'],
          template: `
            <rights-messages-container></rights-messages-container>
          `,
        },
      }, {
        title: 'Rights Log',
        route: '/rights-log',
        config: {
          requiresPermissions: ['admin.moderator'],
          template: `
            <external-app-container
              app="photorank"
              route="admin/rights"
            ></external-app-container>
          `,
        },
      }],
  }, {
    title: 'Activate',
    items: [{
      title: 'Scheduled Content',
      route: '/scheduled-content',
      config: {
        requiresPermissions: ['admin.scheduled_content'],
        template: `
          <scheduler-container></scheduler-container>
        `,
      },
    }, {
      title: 'Tapshop Manager',
      route: '/tapshop-manager',
      config: {
        requiresPermissions: ['admin.tapshop_admin'],
        template: `
          <external-app-container
            app="tapshopAdmin"
          ></external-app-container>
        `,
      },
    }, {
      title: 'Widget Design',
      route: '/widget-design',
      config: {
        requiresPermissions: ['admin.developer'],
        template: `
          <external-app-container
            app="sandbox"
            route="editor"
          ></external-app-container>
        `,
      },
    }, {
      title: 'Widget Management',
      route: '/widget-management',
      config: {
        requiresPermissions: ['admin.developer'],
        template: `
          <external-app-container
            app="photorank"
            route="admin/widgets"
          ></external-app-container>
        `,
      },
    }, {
      title: 'E-mail',
      route: '/email',
      config: {
        requiresPermissions: ['admin.developer'],
        template: `
          <external-app-container
            app="emailStudio"
          ></external-app-container>
        `,
      },
    }, {
      title: 'Content Publishing',
      route: '/content-publishing',
      target: '_blank',
      config: {
        hideMenu: true,
        requiresPermissions: ['piqora.content_publisher'],
        template: `
          <external-app-container
            app="contentPublishing"
            route="home"
            redirect="true"
          ></external-app-container>
        `,
      },
    }],
  }, {
    title: 'Analyze',
    config: {
      requiresPermissions: ['admin.analytics'],
    },
    items: [
      {
        title: 'Analytics',
        route: '/analytics',
        config: {
          requiresPermissions: ['admin.analytics'],
          template: `
            <external-app-container
              app="lemuramaAnalytics"
              route="analytics"
            ></external-app-container>
          `,
        },
      }, {
        title: 'Advocates',
        route: '/advocates',
        config: {
          requiresPermissions: ['admin.analytics'],
          template: `
            <advocates-container></advocates-container>
          `,
        },
      }, {
        title: 'Dashboard',
        route: '/dashboard',
        config: {
          requiresPermissions: ['admin.analytics'],
          template: `
            <external-app-container
              app="lemuramaAnalytics"
              route="welcome"
            ></external-app-container>
          `,
        },
      },
    ],
  }],
  subNav: [{
    title: 'Help',
    route: '/help',
    target: '_blank',
    config: {
      hideMenu: true,
      template: `
        <external-app-container
          app="zendesk"
        ></external-app-container>
      `,
    },
  }],
  unmapped: [{
    route: '/login',
    config: {
      fallbackURL: '/',
      hideMenu: true,
      requiresAnonymous: true,
      template: '<login-container></login-container>',
    },
  }, {
    route: '/help/:articleId',
    target: '_blank',
    config: {
      hideMenu: true,
      template: ({ articleId = '' }) => `
        <external-app-container
          app="zendesk"
          article-id="${sanitizeString(articleId)}"
        ></external-app-container>
      `,
    },
  }, {
    route: '/unauthorized',
    config: {
      template: '<unauthorized-container></unauthorized-container>',
    },
  }],
  legacy: [{
    route: '/admin/settings',
    config: { redirectTo: '/settings' },
  }, {
    route: '/admin/accounts',
    config: { redirectTo: '/switch-account' },
  }, {
    route: '/admin/logout',
    config: { redirectTo: '/logout' },
  }, {
    route: '/admin/collectors',
    config: { redirectTo: '/collections' },
  }, {
    route: '/admin/tools/contentuploader',
    config: { redirectTo: '/content-uploader' },
  }, {
    route: '/admin/tools/blacklist',
    config: { redirectTo: '/blocked-list' },
  }, {
    route: '/admin/content',
    config: { redirectTo: '/content' },
  }, {
    route: '/admin/streams2',
    config: { redirectTo: '/streams' },
  }, {
    route: '/admin/streams/category',
    config: { redirectTo: '/categories' },
  }, {
    route: '/admin/whitelist',
    config: { redirectTo: '/automatic-rights-list' },
  }, {
    route: '/admin/rightsmessages',
    config: { redirectTo: '/rights-messages' },
  }, {
    route: '/admin/rights',
    config: { redirectTo: '/rights-log' },
  }, {
    route: '/admin/scheduler',
    config: { redirectTo: '/scheduled-content' },
  }, {
    route: '/admin/tapshop',
    config: { redirectTo: '/tapshop-manager' },
  }, {
    route: '/editor',
    config: { redirectTo: '/widget-design' },
  }, {
    route: '/admin/widgets',
    config: { redirectTo: '/widget-management' },
  }, {
    route: '/admin/email',
    config: { redirectTo: '/email' },
  }, {
    route: '/admin/analytics-v2',
    config: { redirectTo: '/analytics' },
  }, {
    route: '/admin/advocates',
    config: { redirectTo: '/advocates' },
  }, {
    route: '/admin/dashboard-v2',
    config: { redirectTo: '/dashboard' },
  }, {
    route: '/admin/support/login',
    config: { redirectTo: '/help' },
  }, {
    route: '/admin/docs',
    config: { redirectTo: '/help' },
  }, {
    route: '/admin/login',
    config: { redirectTo: '/login' },
  }],
};

export default navigation;
