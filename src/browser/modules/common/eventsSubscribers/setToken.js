/**
 * @ngdoc overview
 * @name setToken
 * @description
 * When the app session is loaded or created, we need to update all API with the correct token.
 *
 * @param {$rootScope}             $rootScope              To remove the listeners on the $destroy event.
 * @param {AnalyticsExportAPI}     analyticsExportAPI      To set the authorization token and customerId.
 * @param {AppAPI}                 appAPI                  To set the authorization token and customerId.
 * @param {AppSession}             appSession              To subscribe for the app session events.
 * @param {CustomerAvatarUploader} customerAvatarUploader  To set the authorization token and customerId.
 * @param {FullStory}              fullStory               To identify the user in FullStory.
 * @param {Heap}                   heap                    To identify the user in Heap Analytics.
 * @param {Intercom}               intercom                To identify the user in Intercom.
 * @param {RightsExtension}        rightsExtension         To set up the auth data.
 * @param {Tracking}               tracking                To identify the account and user in the traking service.
 *
 * @memberof common
 */
const setToken = (
  $rootScope,
  analyticsExportAPI,
  appAPI,
  appSession,
  customerAvatarUploader,
  fullStory,
  heap,
  intercom,
  rightsExtension,
  tracking,
) => {
  'ngInject';

  const update = () => {
    const { account, token, user } = appSession.getSession();
    appAPI.setAuthorizationToken(token);
    appAPI.setAuthorizationCustomerId(account.id);
    analyticsExportAPI.setAuthorizationToken(token);
    analyticsExportAPI.setAuthorizationCustomerId(account.id);
    customerAvatarUploader.setAuthorizationToken(token);
    customerAvatarUploader.setAuthorizationCustomerId(account.id);

    fullStory.identify(account, user);
    heap.identify(account, user);
    intercom.identify(account, user);
    tracking.setConfig(account, user);

    rightsExtension.setupAuthData(
      account.id,
      token,
      account.name,
      user.email,
    );
  };

  const subscriptions = [
    appSession.onSessionLoaded(update),
    appSession.onSessionCreated(update),
  ];

  $rootScope.$on('$destroy', () => {
    subscriptions.forEach((unsubscribeFn) => unsubscribeFn());
  });
};

export default setToken;
