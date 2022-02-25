import angular from 'angular';

import chatMessage from './components/chatMessage/chatMessage.component';
import downloadConfirmation from './components/downloadConfirmation/downloadConfirmation.component';
import library from './components/library/library.component';
import mediaEditorModal from './components/mediaEditorModal/mediaEditorModal.component';
import mediaInfoModal from './components/mediaInfoModal/mediaInfoModal.component';
import mediaInfoRightsModal from './components/mediaInfoRightsModal/mediaInfoRightsModal.component';
import mediaModal from './components/mediaModal/mediaModal.component';
import mediaRightsExtension from './components/mediaRightsExtension/mediaRightsExtension.component';
import mediaRightsForm from './components/mediaRightsForm/mediaRightsForm.component';
import mediaRightsModal from './components/mediaRightsModal/mediaRightsModal.component';
import mediaSharingFacebook from './components/mediaSharingFacebook/mediaSharingFacebook.component';
import mediaSharingInstagram from './components/mediaSharingInstagram/mediaSharingInstagram.component';
import mediaSharingLink from './components/mediaSharingLink/mediaSharingLink.component';
import mediaSharingModal from './components/mediaSharingModal/mediaSharingModal.component';
import mediaSharingPinterest from './components/mediaSharingPinterest/mediaSharingPinterest.component';
import mediaSharingTapshop from './components/mediaSharingTapshop/mediaSharingTapshop.component';

import libraryContainer from './containers/library.container';

import LIBRARY_ACTIONS from './constants/actions.constant';
import LIBRARY_AGGREGATIONS from './constants/aggregations.constant';
import LIBRARY_EDIT_STATUS from './constants/editStatus.constant';
import LIBRARY_MEDIA_BY_APPROVAL_TYPE from './constants/mediaByApprovalType.constant';
import LIBRARY_MEDIA_STATUS from './constants/mediaStatus.constant';
import LIBRARY_MODAL_SECTIONS from './constants/modalSections.constant';
import LIBRARY_SECTIONS from './constants/sections.constant';
import LIBRARY_SHARE_MODAL_ACTIVATIONS from './constants/shareModalActivations.constant';
import LIBRARY_SORT from './constants/sort.constant';
import LIBRARY_SUGGESTIONS from './constants/suggestions.constant';

import AggregationsList from './services/aggregationsList';
import InstagramBusinessAccountsList from './services/instagramBusinessAccountsList';
import FacebookAdsAccountsList from './services/facebookAdsAccountsList';
import PinterestBoardsList from './services/pinterestBoardsList';
import Sharing from './services/sharing';
import SuggestionsList from './services/suggestionsList';

/**
 * @ngdoc overview
 * @name library
 * @description
 * This is the application library module, it display the library section.
 */
const libraryModule = angular.module('library', [])
.component('chatMessage', chatMessage)
.component('downloadConfirmation', downloadConfirmation)
.component('library', library)
.component('mediaEditorModal', mediaEditorModal)
.component('mediaInfoModal', mediaInfoModal)
.component('mediaInfoRightsModal', mediaInfoRightsModal)
.component('mediaModal', mediaModal)
.component('mediaRightsExtension', mediaRightsExtension)
.component('mediaRightsForm', mediaRightsForm)
.component('mediaRightsModal', mediaRightsModal)
.component('mediaSharingFacebook', mediaSharingFacebook)
.component('mediaSharingInstagram', mediaSharingInstagram)
.component('mediaSharingLink', mediaSharingLink)
.component('mediaSharingModal', mediaSharingModal)
.component('mediaSharingPinterest', mediaSharingPinterest)
.component('mediaSharingTapshop', mediaSharingTapshop)
.component('libraryContainer', libraryContainer)
.constant('LIBRARY_ACTIONS', LIBRARY_ACTIONS)
.constant('LIBRARY_AGGREGATIONS', LIBRARY_AGGREGATIONS)
.constant('LIBRARY_EDIT_STATUS', LIBRARY_EDIT_STATUS)
.constant('LIBRARY_MEDIA_BY_APPROVAL_TYPE', LIBRARY_MEDIA_BY_APPROVAL_TYPE)
.constant('LIBRARY_MEDIA_STATUS', LIBRARY_MEDIA_STATUS)
.constant('LIBRARY_MODAL_SECTIONS', LIBRARY_MODAL_SECTIONS)
.constant('LIBRARY_SECTIONS', LIBRARY_SECTIONS)
.constant('LIBRARY_SHARE_MODAL_ACTIVATIONS', LIBRARY_SHARE_MODAL_ACTIVATIONS)
.constant('LIBRARY_SORT', LIBRARY_SORT)
.constant('LIBRARY_SUGGESTIONS', LIBRARY_SUGGESTIONS)
.factory('aggregationsList', AggregationsList)
.factory('facebookAdsAccountsList', FacebookAdsAccountsList)
.factory('instagramBusinessAccountsList', InstagramBusinessAccountsList)
.factory('pinterestBoardsList', PinterestBoardsList)
.factory('sharing', Sharing)
.factory('suggestionsList', SuggestionsList);

export default libraryModule.name;
