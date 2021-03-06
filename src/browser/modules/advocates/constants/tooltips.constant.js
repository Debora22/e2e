/**
 * @ngdoc constant
 * @name ADVOCATES_TOOLTIPS
 * @description
 * The object of tooltips for the different metrics of the advocates.
 *
 * @type {Ooject}
 *
 * @memberof advocates
 */
const tooltips = {
  revenue: 'The revenue generated by users who interacted with this advocate\'s content and checked out ' +
    'within the conversion window.',
  conversions: 'The total number of checkouts completed after interacting with this advocate\'s content.',
  ctr: 'Click-through rate, calculated by the number of clicks through this advocate\'s content divided by the ' +
    'number of times it was viewed in the lightbox.',
  lightBoxViews: 'The number of times a user opened the Lightbox from this advocate.',
  shoppingClicks: 'The number of click throughs to a landing page from the lightbox.',
};

export default tooltips;
