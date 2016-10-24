$(function() {
  'use strict';

  $('section:not(.hero) > *').addClass('hide').scrollIn({
    classes: 'show fade-in-up'
  });

  var $testimonials = $('.peppermint').Peppermint({
    dots: true,
    slideshow: true,
    slideshowInterval: 5000,
    speed: 500
  }), peppermint = $testimonials.data('Peppermint');

  $testimonials.on('mouseover', peppermint.pause).on('mouseout', peppermint.start); // BUG: Need specific selectors for each carousel

  var navbar = require('./navbar.min.js');

  function scrollTo(path) {
    if (!path) return;

    var $section = $('section.' + (path.replace('/', '') || 'hero'));

    if ($section.length) $(document.body).animate({
      scrollTop: $section.offset().top
    }, 750);
  }

  (function initialise() {
    navbar('/');

    page('/accommodation/apartments', function(context, next) {
      $.load('/partials/apartments', function() {
        //var

        if (typeof next === 'function') next(context);
      });
    });
    page('*', function(context) {
      console.log('404', arguments);

      scrollTo(context.path);
    });
    page();
  })();
});
