import angular from 'angular';

import loginContainer from './containers/login.container';
import logoutContainer from './containers/logout.container';
import switchAccountContainer from './containers/switchAccount.container';

/**
 * @ngdoc overview
 * @name userModule
 * @description
 * This is the application user module, it handles the login and logout of the application.
 */
const userModule = angular.module('user', [])
.component('loginContainer', loginContainer)
.component('logoutContainer', logoutContainer)
.component('switchAccountContainer', switchAccountContainer);

export default userModule.name;
