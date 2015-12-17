(function ( $ ) {
  $.fn.slider = function( options ) {
    // TODO handling of resize events
    // TODO using the settings for aynthing

    // Loading default settings
    var settings = $.extend({
      showSlideToTop: true,
      showSlidePaging: true,
      useIcons:true,
      textNext:"next",
      testPrev:"previous",
      textTop:"top",
      topMargin:50
    }, options );

    $(this).each(function() { //grabing headilnes and adding them to a temporary array called links
      var slideCount = $(this).find(".slides-slide").length;
      var slideWidth = $(this).find(".slides-slide:first-of-type").width();
      var containerWidth = slideCount*slideWidth;
      console.log ("slide-count: " + slideCount + " ,slide-width: " + slideWidth +" ,container should be resized to: " + containerWidth + "px" );
      $(this).find(".slides-container").css({"width": containerWidth});
      $(this).find(".slides-slide").css({"width": slideWidth});
    });

    //Handling click events
    $( ".slider-btn.slider-next" ).on("click", function(event) {
      event.preventDefault();

      slideWidth = $(this).closest(".slider").find(".slides-container .slides-slide").width();
      //console.log("click!! slideWidth: " + slideWidth);
        if ($(this).closest(".slider").find(".slides-container .slides-slide.active").is(":last-of-type")) {
          console.log("I am the  last slide!!");
          $(this).closest(".slider").find(".slides-container .slides-slide").removeClass("active");
          $(this).closest(".slider").find(".slides-container .slides-slide:first-of-type").addClass("active");
          $(this).closest(".slider").find(".slides-container").delay(100).stop().animate({left: "0" }, 300);
        } else {
          console.log("I am NOT the last slide..");
          $(this).closest(".slider").find(".slides-container .slides-slide.active").removeClass("active").next().addClass("active");
          $(this).closest(".slider").find(".slides-container").delay(100).stop().animate({left: "-=" + slideWidth }, 300);
        }
    });

    //Handling click events
    $(".slider-btn.slider-prev").on("click", function(event) {
      event.preventDefault();
      var slideWidth = $(this).closest(".slider").find(".slides-container .slides-slide").width();
      var slideCount = $(this).closest(".slider").find(".slides-container .slides-slide").length;
      //console.log("click!! slideWidth: " + slideWidth);
        if ($(this).closest(".slider").find(".slides-container .slides-slide.active").is(":first-of-type")) {
          console.log("I am the first slide!!");
          $(this).closest(".slider").find(".slides-container .slides-slide").removeClass("active");
          $(this).closest(".slider").find(".slides-container .slides-slide:last-of-type").addClass("active");
          $(this).closest(".slider").find(".slides-container").delay(100).stop().animate({left: "-="+ slideWidth*(slideCount-1)  }, 300);
        } else {
          console.log("I am NOT the first slide..");
          $(this).closest(".slider").find(".slides-container .slides-slide.active").removeClass("active").prev().addClass("active");
          $(this).closest(".slider").find(".slides-container").delay(100).stop().animate({left: "+=" + slideWidth }, 300);
        }
    });

  };
}( jQuery ));
