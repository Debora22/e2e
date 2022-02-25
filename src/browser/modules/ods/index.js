import angular from 'angular';

import 'olapic-design-system/elements/buttons/buttons.scss';
import 'olapic-design-system/elements/checkbox/checkbox.scss';
import 'olapic-design-system/elements/identity/identity.scss';
import 'olapic-design-system/elements/input/input.scss';
import 'olapic-design-system/elements/messageBanner/messageBanner.scss';
import 'olapic-design-system/elements/multiline-input/multiline-input.scss';
import 'olapic-design-system/elements/onofftoggle/onofftoggle.scss';
import 'olapic-design-system/elements/radiobuttons/radiobuttons.scss';
import 'olapic-design-system/elements/titles/titles.scss';
import 'olapic-design-system/elements/tooltip/tooltip.scss';

import odsActivationStatus from 'olapic-design-system/elements/activationStatus/angularjs/activationStatus.component';
import odsCalendar from 'olapic-design-system/elements/calendar/angularjs/calendar.component';
import odsConfirmation from 'olapic-design-system/elements/confirmation/angularjs/confirmation.component';
import odsDropdown from 'olapic-design-system/elements/dropdown/angularjs/dropdown.component';
import odsFilterBar from 'olapic-design-system/elements/filterBar/angularjs/filterBar.component';
import odsFilterBarDate from 'olapic-design-system/elements/filterBarDate/angularjs/filterBarDate.component';
import odsImageCropper from 'olapic-design-system/elements/imageCropper/angularjs/imageCropper.component';
import odsKeyword from 'olapic-design-system/elements/keyword/angularjs/keyword.component';
import odsMediaCard from 'olapic-design-system/elements/mediaCard/angularjs/mediaCard.component';
import odsMenu from 'olapic-design-system/elements/menu/angularjs/menu.component';
import odsModal from 'olapic-design-system/elements/modal/angularjs/modal.component';
import odsNotifications from 'olapic-design-system/elements/notifications/angularjs/notifications.component';
import odsPagination from 'olapic-design-system/elements/pagination/angularjs/pagination.component';
import odsSearchBox from 'olapic-design-system/elements/searchBox/angularjs/searchBox.component';
import odsVideoPlayer from 'olapic-design-system/elements/videoPlayer/angularjs/videoPlayer.component';

/**
 * @ngdoc overview
 * @name odsModule
 * @description
 * This is the application ods module, it handles the integration with the Olapic Design System.
 */
const odsModule = angular.module('ods', [])
.component('odsActivationStatus', odsActivationStatus)
.component('odsCalendar', odsCalendar)
.component('odsConfirmation', odsConfirmation)
.component('odsDropdown', odsDropdown)
.component('odsFilterBar', odsFilterBar)
.component('odsFilterBarDate', odsFilterBarDate)
.component('odsImageCropper', odsImageCropper)
.component('odsKeyword', odsKeyword)
.component('odsMediaCard', odsMediaCard)
.component('odsMenu', odsMenu)
.component('odsModal', odsModal)
.component('odsNotifications', odsNotifications)
.component('odsPagination', odsPagination)
.component('odsSearchBox', odsSearchBox)
.component('odsVideoPlayer', odsVideoPlayer);

export default odsModule.name;
