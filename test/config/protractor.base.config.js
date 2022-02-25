const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const frameworkPath = require.resolve('protractor-cucumber-framework');
const implicitlyWait = 6000;

module.exports = {
  allScriptsTimeout: 50000,
  seleniumAddress: 'http://localhost:4444/wd/hub',
  baseUrl: '[...]',
  resultJsonOutputFile: 'test/e2e/report/report.json',
  framework: 'custom',
  frameworkPath,
  capabilities: {
    browserName: 'chrome',
    acceptInsecureCerts: true,
  },

  // How long to wait for a page to load.
  getPageTimeout: 50000,
  onPrepare: () => {
    chai.use(chaiAsPromised);
    global.chai = chai;
    global.expect = chai.expect;
    global.EC = protractor.ExpectedConditions;
    chai.config.truncateThreshold = 0;

    // Disable animations so e2e tests run more quickly.
    browser.addMockModule('disableNgAnimate', () => {
      angular.module('disableNgAnimate', []).run(['$animate', ($animate) => {
        $animate.enabled(false);
      }]);
    });

    /* This is special hidden automatic wait, on each driver.findElement(...). Original webdriver
     * throws NoSuchElementException if element cannot be found in page DOM
     * structure. This kind of wait will be done before EVERY driver.findElement, no matter what
     * kind of locator do you use. When implicit wait timed out, NoSuchElementException will be
     * thrown outside findElement function.
     */

    browser.manage().timeouts().implicitlyWait(implicitlyWait);
    browser.manage().window().maximize();
  },
  specs: [
    '../test/e2e/features/*.feature',
    '../test/e2e/features/*/*.feature',
  ],
  cucumberOpts: {
    format: ['progress', 'json:test/e2e/report/e2e-test-results.json'],
    require: '../test/e2e/features/*/*.js',
    keepAlive: false,
  },
};
