import angular from 'angular';

import settings from './components/settings/settings.component';
import settingsAccount from './components/settingsAccount/settingsAccount.component';
import settingsInstructionsModal from './components/settingsInstructionsModal/settingsInstructionsModal.component';
import settingsSocialAccounts from './components/settingsSocialAccounts/settingsSocialAccounts.component';
import socialAccounts from './components/socialAccounts/socialAccounts.component';
import socialAccountsConnector from './components/socialAccountsConnector/socialAccountsConnector.component';

import settingsContainer from './containers/settings.container';

import SETTINGS_CHECKOUT_PIXEL from './constants/checkoutPixel.constant';
import SETTINGS_CURRENCY from './constants/currencies.constant';
import SETTINGS_INSTRUCTIONS from './constants/instructions.constant';
import SETTINGS_MESSAGES from './constants/messages.constant';

/**
 * @ngdoc overview
 * @name settings
 * @description
 * This is the application settings module, it displays the settings section.
 */
const settingsModule = angular.module('settings', [])
.component('settings', settings)
.component('settingsAccount', settingsAccount)
.component('settingsInstructionsModal', settingsInstructionsModal)
.component('settingsSocialAccounts', settingsSocialAccounts)
.component('socialAccounts', socialAccounts)
.component('socialAccountsConnector', socialAccountsConnector)
.component('settingsContainer', settingsContainer)
.constant('SETTINGS_CHECKOUT_PIXEL', SETTINGS_CHECKOUT_PIXEL)
.constant('SETTINGS_CURRENCY', SETTINGS_CURRENCY)
.constant('SETTINGS_INSTRUCTIONS', SETTINGS_INSTRUCTIONS)
.constant('SETTINGS_MESSAGES', SETTINGS_MESSAGES);

export default settingsModule.name;
