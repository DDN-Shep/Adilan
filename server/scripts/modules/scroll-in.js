(function($) {
  'use strict';

  var $window = $(window),
      $body = $(navigator.userAgent.toLowerCase().indexOf('webkit') < 0 ? 'html' : 'body'),
      q = [], handler;

  function check() {
    for (var i = 0; i < q.length; i++) q[i]();
  }

  function bind() {
    if (!handler) handler = $window.on('scroll resize', check);

    //if (!handler) handler = window.setInterval(check, 100);
  }

  $.fn.scrollIn = function(options) {
    var $this = this,
        o = $.extend({}, {
          classes: 'show',
          offset: 100,
          callback: null
        }, options);

    this.check = function() {
      var viewportTop = $body.scrollTop(),
          viewportBottom = viewportTop + $window.height();

      $this.each(function() {
        var $element = $(this), elementTop, elementBottom;

        if ($element.hasClass(o.classes)) return;

        elementTop = Math.round($element.offset().top) + o.offset;
        elementBottom = elementTop + $element.height();

        if (elementTop < viewportBottom && elementBottom > viewportTop) {
          $element.addClass(o.classes);

          if (o.callback) o.callback($element);
        }
      });
    };

    q.push(this.check);
    this.check();
    bind();
  };
})(jQuery);