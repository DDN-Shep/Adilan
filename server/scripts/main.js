$(function() {
  'use strict';

  window.adilan = window.adilan || {};

  window.adilan.initialiseRouting = function() {
    if (!History.enabled) return;

    var routes = {
          '/surrounding-area': function() {
            handleLoad();
          },
          '*': [
            '/',
            '/welcome',
            '/testimonials',
            '/accommodation-and-restaurant',
            '/contact-us'
          ]
        },
        $main = $('main').data('partial', checkPartial(window.location.pathname).key);

    function handleLoad() {
      $main.removeClass('fade-out').addClass('fade-in');

      window.adilan.initialiseScrollIn($main);
      window.adilan.initialiseCarousels($main);

      $('html, body').scrollTop(0);

      if (typeof ga === 'function') {
        ga('set', {
          page: window.location.pathname,
          title: document.title
        });
        ga('send', 'pageview');
      }

      $('a[href]', $main).off('click', handleState).on('click', handleState);

      scrollTo(window.location.pathname);
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

    function checkPartial(url) {
      return Object.keys(routes).indexOf(url) >= 0 ? {
        key: url,
        url: '/partials' + url,
        handle: routes[url] || handleLoad
      } : {
        key: '*',
        url: '/partials/index',
        handle: handleLoad
      };
    }

    History.Adapter.bind(window, 'statechange', function() {
      var state = History.getState(),
          url = state.data.url,
          partial = checkPartial(url);

      if ($main.data('partial') !== partial.key)
        $main.removeClass('fade-in')
          .addClass('fade-out')
          .load(partial.url, partial.handle)
          .data('partial', partial.key);

      scrollTo(url);
    });

    $('a[href]').off('click', handleState).on('click', handleState);

    scrollTo(window.location.pathname);
  };

  window.adilan.initialiseNavbar = function() {
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
  };

  window.adilan.initialiseRecaptcha = function() {
    window.onRecaptchaLoaded = function() {
      if (window.grecaptcha) window.grecaptcha.render('recaptcha', {
        sitekey: '6LcMcwgUAAAAAHEA-qN8o77g_HY5y-QuDcZZwXER',
        callback: function onRecaptchaVerified() {
          //console.log('Verified', arguments);
        }
      });
    };
  };

  window.adilan.initialiseCarousels = function($container) {
    $('.peppermint', $container || document.body).Peppermint({
      dots: true,
      slideshow: true,
      slideshowInterval: 5000,
      speed: 500
    }).each(function() {
      var $this = $(this),
          peppermint = $this.data('Peppermint');

      $this.on('mouseover', peppermint.pause).on('mouseout', peppermint.start);
    });
  };

  window.adilan.initialiseScrollIn = function($container) {
    $('section:not(.hero) > *', $container || document.body).addClass('hide').scrollIn({
      classes: 'show fade-in-up'
    });
  };

  window.adilan.initialiseRecaptcha();
  window.adilan.initialiseScrollIn();
  window.adilan.initialiseNavbar();
  window.adilan.initialiseCarousels();
  window.adilan.initialiseRouting();
});
