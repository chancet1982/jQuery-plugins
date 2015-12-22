(function ( $ ) {
  $.fn.slidyPager = function( options ) {
    /*var links = JSON.parse('{"links":[]}');
    var isAutonav = true, defaultState = true, currentLink = 0, prevLink = 0, autonavMargin = 0;*/

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

    //Initializing slidyNav()
      links = "";

      if (settings.showSlideToTop) {
        if (settings.useIcons){
          links += "<li><a class='slidypager-btn slideToTop'><i class='fa fa-lg fa-fw fa-angle-double-up'></i></a></li>";
        } else {
          links += "<li><a class='slidypager-btn slideToTop'>"+settings.textTop+"</a></li>";
        }
      }

      if (settings.showSlidePaging) {
        if (settings.useIcons){
          links += "<li><a class='slidypager-btn slideToPrev'><i class='fa fa-lg fa-fw fa-angle-up'></i></a></li>"+
          "<li><a class='slidypager-btn slideToNext'><i class='fa fa-lg fa-fw fa-angle-down'></i></a></li>"
        } else {
          links += "<li><a class='slidypager-btn slideToPrev'>"+settings.testPrev+"</a></li>"+
          "<li><a class='slidypager-btn slideToNext'>"+settings.textNext+"</a></li>";
        }
      }

      $('.slide:first-of-type').addClass("active first");
      $('.slide:last-of-type').addClass("last");
      $('body').append("<div id='slidypager'><ul class='slidyPager'>"+links+"</ul></div>");
        if (settings.useIcons){
          $('.slidyPager').addClass("with-icons");
        }
      $( "#slidypager li a.slideToTop , #slidypager li a.slideToPrev" ).addClass("disabled");


    //sliding function
    var slideTo = function(targetTopPos) {
      $("html, body").delay(100).animate({scrollTop: targetTopPos }, 300);
    }

    //Handling click next
    $( "#slidypager li a.slideToNext" ).on("click", function(event) {
      event.preventDefault();
      slideTo($('.slide.active').next().offset().top - settings.topMargin);
      $('.slide.active').removeClass('active').next().addClass('active');
      $( "#slidypager li a.slideToTop , #slidypager li a.slideToPrev" ).removeClass("disabled");
      if($('.slide.active').is(":last-of-type")){
        $( "#slidypager li a.slideToNext" ).addClass("disabled");
      }
    });

    //Handling click prev
    $( "#slidypager li a.slideToPrev" ).on("click", function(event) {
      event.preventDefault();
      slideTo($('.slide.active').prev().offset().top - settings.topMargin);
      $('.slide.active').removeClass('active').prev().addClass('active');
      if($('.slide.active').is(":first-of-type")){
        $( "#slidypager li a.slideToTop , #slidypager li a.slideToPrev" ).addClass("disabled");
      }
    });

    //Handling click top
    $( "#slidypager li a.slideToTop" ).on("click", function(event) {
      event.preventDefault();
      slideTo("0");
      $('.slide').removeClass('active');
      $('.slide.first').addClass("active");
      $( "#slidypager li a.slideToTop , #slidypager li a.slideToPrev" ).addClass("disabled");
      $( "#slidypager li a.slideToNext" ).removeClass("disabled");
    });

    var lastScrollTop = 0;

    $(window).scroll(function(event){
       var st = $(this).scrollTop();
       currentSlide = $('.slide.active');

       if (st > lastScrollTop){// scrolling down
           if ($(currentSlide).next().isOnScreen()) { //next Slide is on screen
             $( "#slidypager li a.slideToTop , #slidypager li a.slideToPrev" ).removeClass("disabled");
             $(currentSlide).removeClass('active').next().addClass('active');
             if($(currentSlide).next().is(":last-of-type")){ // is last slide visible on screen
               $( "#slidypager li a.slideToNext" ).addClass("disabled");
             }
           }
       } else { // scrolling up
          if ($(currentSlide).prev().isOnScreen()) {//previous Slide is on screen
            $( "#slidypager li a.slideToNext" ).removeClass("disabled");
            $(currentSlide).removeClass('active').prev().addClass('active');
            if($(currentSlide).prev().is(":first-of-type")){ //is first slide visible on screen
              $( "#slidypager li a.slideToTop , #slidypager li a.slideToPrev" ).addClass("disabled");
            }
          }

       }
       lastScrollTop = st;
    });
  };
}( jQuery ));
