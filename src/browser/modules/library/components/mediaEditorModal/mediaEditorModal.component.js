import template from './mediaEditorModal.html';
import './mediaEditorModal.scss';

import aspectRatioOriginalIcon from '../../../../assets/images/aspect-ratio-original.svg';
import aspectRatioSquareIcon from '../../../../assets/images/aspect-ratio-square.svg';
import rotateLeftIcon from '../../../../assets/images/rotateLeftIcon.svg';
import rotateRightIcon from '../../../../assets/images/rotateRightIcon.svg';
/**
 * @ngdoc controller
 * @name MediaEditorModal
 * @description
 * This component renders the media editor modal.
 *
 * @memberof library
 */
class MediaEditorModal {
  /**
   * @param {$timeout} $timeout  To wait some time before updating the Cropper data.
   * @param {$window}  $window   To add the resize listener.
   */
  constructor($timeout, $window) {
    'ngInject';

    /**
     * The local reference to the `$timeout` service.
     *
     * @type {$timeout}
     */
    this.$timeout = $timeout;
    /**
     * The local reference to the `$window` service.
     *
     * @type {$window}
     */
    this.$window = $window;
    /**
     * The first media of the list of media to display.
     *
     * @type {Object}
     */
    this.firstMedia = {};
    /**
     * The flag to indicate that the media is rotated or not.
     *
     * @type {Boolean}
     */
    this.isRotated = false;
    /**
     * The instance of CropperJS.
     *
     * @type {?Object}
     */
    this.cropperInstance = null;
    /**
     * The original (before edits) media width.
     *
     * @type {Number}
     */
    this.originalMediaWidth = null;
    /**
     * The original (before edits) media height.
     *
     * @type {Number}
     */
    this.originalMediaHeight = null;
    /**
     * The original rotation of the media before edit. This is used to fix angles before sending to BE.
     *
     * @type {Number}
     */
    this.originalMediaRotate = 0;
    /**
     * The height of the cropped image.
     *
     * @type {?Number}
     */
    this.croppedHeight = null;
    /**
     * The width of the cropped image.
     *
     * @type {?Number}
     */
    this.croppedWidth = null;
    /**
     * The rotate angle of the cropped image.
     *
     * @type {Number}
     */
    this.croppedRotate = 0;
    /**
     * The X position of the cropped image.
     *
     * @type {Number}
     */
    this.croppedXposition = 0;
    /**
     * The Y position of the cropped image.
     *
     * @type {Number}
     */
    this.croppedYposition = 0;
    /**
     * The minimum optimal width to crop the image.
     *
     * @type {Number}
     */
    this.minCroppedImageWidth = 320;
    /**
     * The flag to indicate the cropper to reset.
     *
     * @type {Boolean}
     */
    this.resetCropper = false;
    /**
     * The dictionary for the scaling.
     *
     * @type {Object}
     */
    this.sizes = {
      original: 'original',
      square: 'square',
    };
    /**
     * The flag to show the error message when the cropped width is below the optimal limit.
     *
     * @type {Boolean}
     */
    this.sizeErrorMessage = false;
    /**
     * The flag to indicate if the CropperJS is loading the image.
     *
     * @type {Boolean}
     */
    this.loading = false;
    /**
     * The selected size.
     *
     * @type {String}
     */
    this.selectedSize = this.sizes.original;
    /**
     * The dictionary for the rotate angles.
     *
     * @type {Object}
     */
    this.angles = {
      left: -90,
      right: 90,
      zero: 0,
      full: 360,
      flip: 180,
    };
    /**
     * The time to wait for timeouts in ms.
     *
     * @type {Number}
     */
    this.waitingTimeOut = 200;
    /**
     * The selected rotate angle.
     *
     * @type {Number}
     */
    this.rotateAngle = this.angles.zero;
    /**
     * Reference to the original aspect ratio icon.
     *
     * @type {String}
     */
    this.aspectRatioOriginalIcon = aspectRatioOriginalIcon;
    /**
     * Reference to the square aspect ratio icon.
     *
     * @type {String}
     */
    this.aspectRatioSquareIcon = aspectRatioSquareIcon;
    /**
     * Reference to the rotate left icon.
     *
     * @type {String}
     */
    this.rotateLeftIcon = rotateLeftIcon;
    /**
     * Reference to the rotate right icon.
     *
     * @type {String}
     */
    this.rotateRightIcon = rotateRightIcon;
    /**
     * The current timeout that is in progress.
     *
     * @type {?Promise}
     */
    this.currentTimeout = null;
    /**
     * @ignore
     */
    this.onWindowResize = this.onWindowResize.bind(this);
  }
  /**
   * Initialize variables and add the resize listener.
   */
  $onInit() {
    if (!this.mediaImageSize) {
      this.mediaImageSize = 'originalCE';
    }
    this.$window.addEventListener('resize', this.onWindowResize);
  }
  /**
   * Remove the resize listener on destroy.
   */
  $destroy() {
    this.$window.removeEventListener('resize', this.onWindowResize);
  }
  /**
   * Each time the media binding changes, update the firstMedia, croppedHeight and croppedWidth variables.
   *
   * @param {Object} changes        The binding changes.
   * @param {Object} changes.media  The media change object.
   */
  $onChanges({ media }) {
    if (media && media.currentValue && this.media) {
      [this.firstMedia] = this.media;
      this.aspectRatioOriginalIcon = this.firstMedia.width === this.firstMedia.height ?
        aspectRatioSquareIcon :
        aspectRatioOriginalIcon;
      this.isRotated = this._isRotated(
        this.firstMedia.width,
        this.firstMedia.height,
      );
      this.loading = true;
    }
  }
  /**
   * Check if we are able to edit the media.
   *
   * @return {Boolean}
   */
  isMediaEditEnabled() {
    return this.firstMedia.assets_edit_status !== 'PENDING' &&
      !this.firstMedia.video_url &&
      !this.firstMedia.parent_id;
  }
  /**
   * Callback to execute when the CropperJS is ready.
   *
   * @param {Object} cropper  The instance of CropperJS passed from `imageCropper`.
   */
  onCropperReady(cropper) {
    this.cropperInstance = cropper;
    this.loading = false;

    const cropperImageData = this.cropperInstance.getImageData();
    const hasExif = cropperImageData.rotate !== this.angles.zero;

    [this.originalMediaWidth, this.originalMediaHeight] = hasExif ?
      [cropperImageData.naturalHeight, cropperImageData.naturalWidth] :
      [cropperImageData.naturalWidth, cropperImageData.naturalHeight];
    this.originalMediaRotate = cropperImageData.rotate;
    this.aspectRatioOriginalIcon = cropperImageData.naturalWidth === cropperImageData.naturalHeight ?
      aspectRatioSquareIcon :
      aspectRatioOriginalIcon;
    this.updateCropperData();
  }
  /**
   * Callback to execute when the reset has finished to turn all variables to the original state.
   */
  onCropperReset() {
    this.resetCropper = false;
    this.selectedSize = this.sizes.original;
    this.updateCropperData();
  }
  /**
   * Fix Cropper behavior when rezising the window.
   */
  onWindowResize() {
    if (this.currentTimeout) {
      this.$timeout.cancel(this.currentTimeout);
    }
    this.currentTimeout = this.$timeout(() => {
      this.reset();
    }, this.waitingTimeOut);
  }
  /**
   * Reset to the cropper to the original state.
   */
  reset() {
    this.resetCropper = true;
  }
  /**
   * Rotate the image.
   *
   * @param {Number} angle  The selected rotate angle.
   */
  rotate(angle) {
    this.rotateAngle = angle;
  }
  /**
   * Callback to execute when the Save Changes for media edited is clicked.
   * We are fixing the angle with the originalMediaRotate to avoid the BE of doing it again.
   */
  saveEditedMedia() {
    let angle = this.croppedRotate - this.originalMediaRotate;
    if (angle < 0) {
      angle += this.angles.full;
    }
    const editData = {
      crop: {
        height: this.croppedHeight,
        width: this.croppedWidth,
        x_position: this.croppedXposition,
        y_position: this.croppedYposition,
      },
      rotate: {
        angle: angle === this.angles.full ?
          this.angles.zero :
          angle,
      },
    };

    this.onSave({ editData });
  }
  /**
   * Update the Cropper data.
   */
  updateCropperData() {
    this.$timeout(() => {
      const cropperSizeData = this.cropperInstance.getData();
      this.croppedHeight = Math.round(cropperSizeData.height);
      this.croppedWidth = Math.round(cropperSizeData.width);
      this.croppedXposition = Math.round(cropperSizeData.x);
      this.croppedYposition = Math.round(cropperSizeData.y);
      this.sizeErrorMessage = this.croppedWidth < this.minCroppedImageWidth;

      this.rotateAngle = this.angles.zero;
      this.croppedRotate = cropperSizeData.rotate;
      if (this.croppedRotate < 0) {
        this.croppedRotate += this.angles.full;
      }
      const cropperImageData = this.cropperInstance.getImageData();
      this.isRotated = this._isRotated(
        cropperImageData.naturalWidth,
        cropperImageData.naturalHeight,
      );
    });
  }
  /**
   * Update the selected size when square or original aspect ratio buttons are clicked.
   *
   * @param {String} size  The selected size.
   */
  updateSelectedSize(size) {
    this.selectedSize = size;
  }
  /**
   * Check if the media is rotated or not.
   *
   * @param {Number} width   The image width.
   * @param {Number} height  The image height.
   *
   * @return {Boolean}
   *
   * @access protected
   */
  _isRotated(width, height) {
    const rotated = [this.angles.zero, this.angles.flip].includes(this.croppedRotate);

    return width > height ? rotated : !rotated;
  }
}

/**
 * @ngdoc component
 * @name mediaEditorModal
 * @description
 * The media modal component.
 *
 * @memberof library
 */
export default {
  /**
   * The controller class for the component.
   *
   * @type {MediaEditorModal}
   */
  controller: MediaEditorModal,
  /**
   * The HTML template for the component.
   *
   * @type {String}
   */
  template,
  /**
   * Component bindings.
   *
   * @type {Object}
   * @property {String}   mediaImageSize  The type of media image size we should display.
   * @property {Array}    media           The list of media to display.
   * @property {Function} onSave          Callback to save the changes and close the editor modal. It receives the
   *                                      edit data to crop the media.
   * @property {Function} onCancel        Callback to cancel the changes and close the editor modal.
   */
  bindings: {
    mediaImageSize: '@',
    media: '<',
    onSave: '&',
    onCancel: '&',
  },
};
