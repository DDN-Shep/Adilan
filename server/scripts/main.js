$(function() {
  'use strict';

  (function initialiseRouting() {
    if (!History.enabled) return;

    var routes = {
      '/surrounding-area': function() {
        console.log('/surrounding-area');

        handleLoad();
      }
    };

    function handleLoad() {
      $('html, body').scrollTop(0);

      if (typeof ga === 'function') {
        ga('set', {
          page: window.location.pathname,
          title: document.title
        });
        ga('send', 'pageview');
      }
    }

    function handleState(e) {
      if (e && typeof e.preventDefault === 'function') e.preventDefault();

      if (window.location === this.href) return;

      var $this = $(this),
          data = {
            title: $this.attr('title') || $this.text() || document.title,
            url: $this.attr('href')
          };

      History.pushState(data, data.title, data.url);
    }

    function scrollTo(path) {
      if (!path) return;

      var $section = $('section.' + (path.replace('/', '') || 'hero'));

      if ($section.length) $('html, body').animate({
        scrollTop: $section.offset().top
      }, 750);
    }

    History.Adapter.bind(window, 'statechange', function() {
      var state = History.getState(),
          handle = routes[state.data.url];

      if (typeof handle === 'function') $('main').load(state.url, function() {
        $('a[href]').off('click', handleState).on('click', handleState);

        handle.apply(this, arguments);
      });
      else scrollTo(state.data.url);
    });

    $('a[href]').off('click', handleState).on('click', handleState);
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
          //console.log('Verified', arguments);
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
