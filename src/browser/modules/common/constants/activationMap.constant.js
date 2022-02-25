import sentToFacebookIcon from '../../../assets/images/sentToFacebookIcon.svg';
import sentToFacebookIconError from '../../../assets/images/sentToFacebookIconError.svg';
import sentToInstagramIcon from '../../../assets/images/sentToInstagramIcon.svg';
import sentToInstagramIconError from '../../../assets/images/sentToInstagramIconError.svg';
import sentToPinterestIcon from '../../../assets/images/sentToPinterestIcon.svg';
import sentToPinterestIconError from '../../../assets/images/sentToPinterestIconError.svg';
import sentToShoppableInstagram from '../../../assets/images/sentToShoppableInstagramIcon.svg';
import sentToShoppableInstagramError from '../../../assets/images/sentToShoppableInstagramIconError.svg';

/**
 * @ngdoc constant
 * @name ACTIVATION_MAP
 * @description
 * Dictionary with the activation icons and tooltips to implement for each knows network and the key's name that
 * containt the {@link ActivationStatus} on each media entity.
 *
 * @type {ActivationMap}
 *
 * @memberof common
 */
const activationMap = {
  facebook: {
    mediaKey: 'facebook_upload_status',
    statuses: {
      UPLOADED: {
        toolTip: 'Media sent to Facebook Ads Manager.',
        image: sentToFacebookIcon,
      },
      FAILED: {
        toolTip: 'There was an error when trying to send the media to Facebook Ads Manager. Please try again.',
        image: sentToFacebookIconError,
      },
    },
  },
  instagram: {
    mediaKey: 'instagram_upload_status',
    statuses: {
      UPLOADED: {
        toolTip: 'Media sent to Instagram.',
        image: sentToInstagramIcon,
      },
      FAILED: {
        toolTip: 'There was an error when trying to send the media to Instagram. Please try again.',
        image: sentToInstagramIconError,
      },
      SCHEDULED: {
        toolTip: 'Media scheduled to be send.',
        image: sentToInstagramIcon,
      },
    },
  },
  pinterest: {
    mediaKey: 'pinterest_upload_status',
    statuses: {
      UPLOADED: {
        toolTip: 'Media sent to Pinterest.',
        image: sentToPinterestIcon,
      },
      FAILED: {
        toolTip: 'There was an error when trying to send the media to Pinterest. Please try again.',
        image: sentToPinterestIconError,
      },
    },
  },
  shoppableInstagram: {
    mediaKey: 'shoppable_i_upload_status',
    statuses: {
      UPLOADED: {
        toolTip: 'Media sent to Tapshop.',
        image: sentToShoppableInstagram,
      },
      SCHEDULED: {
        toolTip: 'Media scheduled to be sent to Tapshop.',
        image: sentToShoppableInstagram,
      },
      FAILED: {
        toolTip: 'There was an error when trying to send the media to Tapshop. Please try again.',
        image: sentToShoppableInstagramError,
      },
    },
  },
};

export default activationMap;
