/**
 * @ngdoc constant
 * @name LIBRARY_MODAL_SECTIONS
 * @description
 * The list of sections for the library's modal.
 *
 * @type {Object}
 * @property {String}  id                     The section id.
 * @property {String}  name                   The section name.
 * @property {Array}   librarySections        The list of library sections where the modal section should be displayed.
 * @property {Array}   librarySectionsSingle  The list of library sections where the modal section should be displayed
 *                                            when the modal is in single mode.
 *
 * @memberof library
 */
const libraryModalSections = {
  info: {
    id: 'info',
    name: 'Info',
    librarySections: [
      'New Content',
      'Saved For Later',
      'Rights Pending',
      'Approved Content',
      'Reported',
      'Discarded',
    ],
  },
  tagToStream: {
    id: 'tagToStream',
    name: 'Tag to Stream',
    librarySections: [
      'New Content',
      'Saved For Later',
      'Rights Pending',
      'Approved Content',
      'Reported',
    ],
  },
  rights: {
    id: 'rights',
    name: 'Rights',
    librarySections: [
      'New Content',
      'Saved For Later',
      'Reported',
    ],
    librarySectionsSingle: [
      'Rights Pending',
      'Approved Content',
      'Discarded',
    ],
  },
  share: {
    id: 'share',
    name: 'Share To',
    librarySections: [
      'Approved Content',
    ],
  },
};

export default libraryModalSections;
