$(function() {
  'use strict';

  $('.section > *').addClass('hide').scrollIn({
    classes: 'show fade-in-up'
  });

  var $testimonials = $('.peppermint').Peppermint({
    dots: true,
    slideshow: true,
    slideshowInterval: 5000,
    speed: 500
  }), peppermint = $testimonials.data('Peppermint');

  $testimonials.on('mouseover', peppermint.pause).on('mouseout', peppermint.start);

  var navbar = require('./components/navbar.min.js');

  (function initialise() {
    navbar('/');

    page('/accommodation/apartments', function(context, next) {
      $.load('/partials/apartments', function() {
        //var

        if (typeof next === 'function') next(context);
      });
    });
    page('*', function() {
      console.log('404', arguments);
    });
    page();
  })();
});
