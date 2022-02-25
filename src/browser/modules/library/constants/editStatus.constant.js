import cropIcon from '../../../assets/images/crop-icon.svg';

/**
 * @ngdoc constant
 * @name LIBRARY_EDIT_STATUS
 * @description
 * The object to map the media Edit Status that indicates the diferent icons and tooltips for
 * the different states of the media.
 *
 * @type {EditStatusMap}
 *
 * @memberof library
 */
const libraryEditStatus = {
  PENDING: {
    toolTip: 'Your edits are being processed. Please refresh the page to see the changes.',
    image: cropIcon,
    errorIcon: false,
  },
  PROCESSED: {
    toolTip: 'This media is an edited version of the original.',
    image: cropIcon,
    errorIcon: false,
  },
  FAILED: {
    toolTip: 'There was an error while saving your edits. Please try again.',
    image: cropIcon,
    errorIcon: true,
  },
};

export default libraryEditStatus;
