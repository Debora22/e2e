module.exports = {
  targets: {
    browser: {
      createFolder: false,
      html: {
        default: 'index.tpl.html',
      },
      copy: [{
        from: 'assets/legacy',
        to: 'static',
      }],
    },
    gateway: {
      inspect: {
        ndb: true,
      },
      runnerOptions: {
        build: ['browser'],
      },
    },
  },
  copy: {
    enabled: true,
    items: [
      '.nvmrc',
      'config',
      'package.json',
      'package-lock.json',
      'utils',
    ],
    copyOnBuild: {
      targets: ['gateway'],
    },
  },
  version: {
    revision: {
      enabled: true,
      createRevisionOnBuild: {
        targets: ['gateway'],
      },
    },
  },
};
