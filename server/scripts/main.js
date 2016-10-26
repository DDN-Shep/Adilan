$(function() {
  'use strict';

  (function initialiseRouting() {
    function scrollTo(path) {
      if (!path) return;

      var $section = $('section.' + (path.replace('/', '') || 'hero'));

      if ($section.length) $('html, body').animate({
        scrollTop: $section.offset().top
      }, 750);
    }

    (function initialise() {
      page('*', function(context) {
        scrollTo(context.path);
      });
      page();
    })();
  })();

  (function initialiseNavbar() {
    var timer,
        $navbar = $('.navbar').on('focusout', function() {
          timer = setTimeout(function() {
            $navbar.removeClass('open');
          }, 100);
        }).on('focusin', function(e) {
          if ($(e.target, $navbar).length) clearTimeout(timer);
        });

        $('.nav-toggle', $navbar).on('click', function(e) {
          e.preventDefault();

          $navbar.toggleClass('open');
        });

        $('nav > a', $navbar).on('click', function() {
          $navbar.removeClass('open');
        });
  })();

  (function initialiseRecaptcha() {
    window.onRecaptchaLoaded = function() {
      if (window.grecaptcha) window.grecaptcha.render('recaptcha', {
        sitekey: '6LcMcwgUAAAAAHEA-qN8o77g_HY5y-QuDcZZwXER',
        callback: function onRecaptchaVerified() {
          console.log('Verified', arguments);
        }
      });
    };
  })();

  (function initialiseCarousels() {
    $('.peppermint').Peppermint({
      dots: true,
      slideshow: true,
      slideshowInterval: 5000,
      speed: 500
    }).each(function() {
      var $this = $(this),
          peppermint = $this.data('Peppermint');

      $this.on('mouseover', peppermint.pause).on('mouseout', peppermint.start);
    });
  })();

  (function initialiseScrollIn() {
    $('section:not(.hero) > *').addClass('hide').scrollIn({
      classes: 'show fade-in-up'
    });
  })();
});
