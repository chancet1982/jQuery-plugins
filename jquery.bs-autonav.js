(function ( $ ) {
  $.fn.autonav = function( options ) {
    var links = JSON.parse('{"links":[]}');
    var isAutonav = true;
    var defaultState = true;

    // Loading default settings
    var settings = $.extend({
      addTo: ".articleBody",
      addMethod: "before",
      float:true,
      minLinks:2,
      maxLinks:10,
    }, options );

    //camelCase strings (function is used later)
    var camelize = function(str) {
      return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
        if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
        return index == 0 ? match.toLowerCase() : match.toUpperCase();
      });
    }

    var slideToID = function (id) {
      marginTop = 100;
      if (settings.float && defaultState)
        marginTop = 200;
      $("html, body").delay(100).animate({scrollTop: $(id).offset().top - marginTop }, 300);
      if (settings.float)
        floatAutonav();
    }

    var floatAutonav = function () {
      if ($(window).scrollTop() > autonavOffset ){
        if(defaultState) {
          $( "#bs-autonav").addClass("navbar-fixed-top").css("top", "50px");
          defaultState = false;
        }
      } else if (!defaultState) {
      	$( "#bs-autonav").removeClass("navbar-fixed-top").removeAttr("style");
      	defaultState = true;
    	}
    }

    $(this).each(function() { //grabing headilnes and adding them to a temporary array called links
      $(this).attr("title",$(this).text()).attr("id",camelize($(this).text().replace(/\W/g, '')))
      links['links'].push({"linkText":$(this).text(),"linkUrl":camelize($(this).text().replace(/\W/g, ''))});
    });

    if (links['links'].length > settings.minLinks) { //if there are enough links, adding a menu
      autonavHTML = "<nav id='bs-autonav' class='navbar navbar-default'><div class='container'><div class='collapse navbar-collapse'><ul class='bs-autonav nav navbar-nav'></div></div></nav>";
      if (settings.addMethod == "after") {
        $(settings.addTo).after(autonavHTML)
      } else if (settings.addMethod == "before") {
        $(settings.addTo).before(autonavHTML)
      } else if (settings.addMethod == "prepend") {
        $(settings.addTo).prepend(autonavHTML)
      } else {
        $(settings.addTo).append(autonavHTML)
      }

      autonavOffset = 0;
      if ($( "#bs-autonav").length > 0) 
        autonavOffset = $( "#bs-autonav").offset().top - $("nav.navbar.navbar-default.navbar-fixed-top").height();    
      
      for(var i in links['links']) { //adding the links to the menu
        if (links['links'].length < settings.maxLinks) {
          linkHTML = "<li><a href='#"+ links['links'][i].linkUrl +"'>" + links['links'][i].linkText +"</a></li>";
          $( ".bs-autonav" ).append(linkHTML);
        }
      }
    } else
      isAutonav = false;

    //Handling click events
    $( "#bs-autonav li a" ).on("click", function(event) {
      event.preventDefault();
      $(this).closest( "ul").find("li").removeClass("active");
      $(this).parent().addClass("active");
      slideToID($(this).attr("href"));
    });

    // Handling scroll events (if nav is floating)
    $(window).on("scroll", function(e) {
      if (settings.float && isAutonav)
      	floatAutonav();
    });
  };
}( jQuery ));
