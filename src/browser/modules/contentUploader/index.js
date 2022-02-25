import angular from 'angular';

import bulkModal from './components/bulkModal/bulkModal.component';
import contentUploader from './components/contentUploader/contentUploader.component';
import dropzone from './components/dropzone/dropzone.component';
import editModal from './components/editModal/editModal.component';
import imageCard from './components/imageCard/imageCard.component';

import contentUploaderContainer from './containers/contentUploader.container';

import UsersList from './services/usersList';

/**
 * @ngdoc overview
 * @name contentUploader
 * @description
 * This is the application contentUploader module, it displays the content uploader section.
 */
const contentUploaderModule = angular.module('contentUploader', [])
.component('bulkModal', bulkModal)
.component('contentUploader', contentUploader)
.component('dropzone', dropzone)
.component('editModal', editModal)
.component('imageCard', imageCard)
.component('contentUploaderContainer', contentUploaderContainer)
.factory('usersList', UsersList);

export default contentUploaderModule.name;
