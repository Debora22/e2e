import facebookIcon from '../../../assets/images/facebookIcon.svg';
import instagramIcon from '../../../assets/images/instagramIcon.svg';
import tapshopIcon from '../../../assets/images/tapshopIcon.svg';
import shareLinkIcon from '../../../assets/images/shareLinkIcon.svg';
import pinterestIcon from '../../../assets/images/pinterestIcon.svg';

/**
 * @ngdoc constant
 * @name LIBRARY_SHARE_MODAL_ACTIVATIONS
 * @description
 * The list of activations for the share modal.
 *
 * @type {Object}
 * @property {ShareModalActivation} facebook   The settings for the facebook activation in mediaSharingModal component.
 * @property {ShareModalActivation} instagram  The settings for the instagram activation in mediaSharingModal component.
 * @property {ShareModalActivation} pinterest  The settings for the Pinterest activation in mediaSharingModal component.
 * @property {ShareModalActivation} shareLink  The settings for the shareLink activation in mediaSharingModal component.
 * @property {ShareModalActivation} tapshop    The settings for the tapshop activation in mediaSharingModal component.
 *
 * @memberof library
 */
const libraryShareModalActivations = {
  facebook: {
    id: 'facebook',
    icon: facebookIcon,
    helpUrl: '/help/216962066',
    name: 'Facebook Ads Manager',
    requiresSettings: [
      'content_discovery_socialsharing_enabled',
    ],
  },
  instagram: {
    id: 'instagram',
    icon: instagramIcon,
    helpUrl: '/help/216962066',
    name: 'Instagram',
    requiresSettings: [
      'activation_facebook_instagram',
    ],
  },
  pinterest: {
    id: 'pinterest',
    icon: pinterestIcon,
    helpUrl: '/help/216962066',
    name: 'Pinterest',
    requiresSettings: [
      'activation_pinterest_share',
    ],
  },
  shareLink: {
    id: 'shareLink',
    icon: shareLinkIcon,
    helpUrl: '/help/216962066',
    name: 'Share Link',
  },
  tapshop: {
    id: 'tapshop',
    icon: tapshopIcon,
    helpUrl: '/help/216962066',
    name: 'Tapshop',
    requiresSettings: [
      'activation_olapic_shoppable_instagram',
    ],
  },
};

export default libraryShareModalActivations;
