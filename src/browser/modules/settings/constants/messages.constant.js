/**
 * @ngdoc constant
 * @name SETTINGS_MESSAGES
 * @description
 * The text to be displayed in different stages of connecting a social account.
 *
 * @type {Object}
 *
 * @memberof settings
 */
const settingsMessages = {
  facebookConfirmation: `You are about to connect a Facebook Account to the platform. This will allow you to: <br>
    - Collect by user mention and hashtags.<br>
    - Request rights on content.<br>
    - Post via Content Scheduler.<br><br>
    Make sure:<br>
    - The account you are connecting has Admin or Editor role to the Facebook page.<br>
    - The instagram Account you want to collect from is set to business and is associated to the Facebook page.`,
  facebookSuccess: `Well done! You have sucessfully connected your Facebook Account.<br><br>
    You can now:<br>
    - Collect by user mention and hashtag (a collection needs to be created).<br>
    - Request Rights on content.`,
};

export default settingsMessages;
