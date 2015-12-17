(function ( $ ) {
  $.fn.navfx = function( options ) {
    var links = JSON.parse('{"links":[]}');
    var isAutonav = true, defaultState = true, currentLink = 0, prevLink = 0, autonavMargin = 0;

    // Loading default settings
    var settings = $.extend({
      threshhold: 150,
      initialClass: "initial",
      uniqueClass:"unique",
      minLinks:2,
      maxLinks:10,
    }, options );

    var throttle = function(fn, threshhold, scope) {
      threshhold || (threshhold = 250);
      var last,
          deferTimer;
      return function () {
        var context = scope || this;
        var now = +new Date,
            args = arguments;
        if (last && now < last + threshhold) {
          clearTimeout(deferTimer);
          deferTimer = setTimeout(function () {
            last = now;
            fn.apply(context, args);
          }, threshhold);
        } else {
          last = now;
          fn.apply(context, args);
        }
      };
    }

    $(this).each(function() { //grabing headilnes and adding them to a temporary array called links
      $(this).addClass("navfx").addClass(settings.initialClass);
    });

    //Handling throttled scroll events
    $(window).on("scroll", throttle(function (event) {
      if ($(window).scrollTop() > settings.threshhold ) {
        if ($(".navfx").hasClass(settings.initialClass)) {
          $(".navfx."+settings.initialClass).removeClass(settings.initialClass).addClass(settings.uniqueClass)
        }
      } else {
        if ($(".navfx").hasClass(settings.uniqueClass)) {
          $(".navfx."+settings.uniqueClass).removeClass(settings.uniqueClass).addClass(settings.initialClass);
        }
      }
    }, 100));
  };
}( jQuery ));
