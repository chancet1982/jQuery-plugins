(function ( $ ) {
//TODO fix better throttling.
//TODO fix toggler (currently none exist and menu is hidden in small resolutions)

  $.fn.autonav = function( options ) {
    var links = JSON.parse('{"links":[]}');
    var isAutonav = true, defaultState = true, currentLink = 0, prevLink = 0, autonavMargin = 0;

    // Loading default settings
    var settings = $.extend({
      addTo: "body",
      addMethod: "prepend",
      marginTop: "100",
      fixToBody:true,
      floatNav:true,
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

    var slideToID = function (id) {
      $("html, body").delay(100).animate({scrollTop: $(id).offset().top - autonavMargin - settings.marginTop }, 300);
      if (settings.floatNav && !settings.fixToBody)
        floatAutonav();
    }

    var floatAutonav = function () {
      if ($(window).scrollTop() > autonavOffset ){
        if(defaultState) {
          $("#bs-autonav-placeholder").show();
          $( "#bs-autonav").addClass("navbar-fixed-top").css("top", "50px");
          defaultState = false;
          autonavMargin = getAutonavMargin();
        }
      } else if (!defaultState) {
        $("#bs-autonav-placeholder").hide();
        $( "#bs-autonav").removeClass("navbar-fixed-top").removeAttr("style");
        defaultState = true;
        autonavMargin = getAutonavMargin();
      }
    }

    var getAutonavMargin = function () {
    tempMargin = 0;
      $("nav.navbar-default.navbar-fixed-top").each(function(){
        if ($(this).css('display') == 'none'){
        } else
          tempMargin += $(this).outerHeight();
      });
      /*tempMargin += 50; */
      console.log("getAutonavMargin(): " + tempMargin);
      return tempMargin;
    }

    $(this).each(function() { //grabing headilnes and adding them to a temporary array called links
      $(this).attr("title",$(this).text()).attr("id",camelize($(this).text().replace(/\W/g, '')))
      links['links'].push({"linkText":$(this).text(),"linkUrl":camelize($(this).text().replace(/\W/g, '')),"linkOffest": $(this).offset().top});
    });

    if (links['links'].length > settings.minLinks) { //if there are enough links, adding a menu

    if (settings.fixToBody) {
      autonavHTML = "<nav id='bs-autonav' class='navbar navbar-default navbar-fixed-top'><div class='container'><div class='collapse navbar-collapse'><ul class='bs-autonav nav navbar-nav'></div></div></nav>";
    } else {
      autonavHTML = "<nav id='bs-autonav-placeholder' class='navbar navbar-default'></nav><nav id='bs-autonav' class='navbar navbar-default'><div class='container'><div class='collapse navbar-collapse'><ul class='bs-autonav nav navbar-nav'></div></div></nav>";
    }
      //autonavHTML = "<nav id='bs-autonav-placeholder' class='navbar navbar-default'></nav><nav id='bs-autonav' class='navbar navbar-default'><div class='container'><div class='collapse navbar-collapse'><ul class='bs-autonav nav navbar-nav'></div></div></nav>";
      if (settings.addMethod == "after") {
        $(settings.addTo).after(autonavHTML)
      } else if (settings.addMethod == "before") {
        console.log(autonavHTML);
        $(settings.addTo).before(autonavHTML)
      } else if (settings.addMethod == "prepend") {
        $(settings.addTo).prepend(autonavHTML)
      } else {
        $(settings.addTo).append(autonavHTML)
      }
      autonavOffset = 0;

      if ($("#bs-autonav").length > 0) {
        $("#bs-autonav-placeholder").hide();
        autonavOffset = $( "#bs-autonav").offset().top - $("nav.navbar.navbar-default.navbar-fixed-top").height();
      }

      autonavMargin = getAutonavMargin();

      if (settings.fixToBody) {
        $("#bs-autonav").next().css({"margin-top": autonavMargin})
      }

      for(var i in links['links']) { //adding the links to the menu
        if (links['links'].length < settings.maxLinks) {
          linkHTML = "<li class=item-no-"+(i+1)+"><a href='#"+ links['links'][i].linkUrl +"'>" + links['links'][i].linkText +"</a></li>";
          $( ".bs-autonav" ).append(linkHTML);
        }
      }
    } else
      isAutonav = false;

    //Handling click events
    $( "#bs-autonav li a" ).on("click", function(event) {
      event.preventDefault();
      slideToID($(this).attr("href"));
    });

    //Handling throttled scroll events
    $(window).on("scroll", throttle(function (event) {
      for (var i = 0; i < links['links'].length ; i++ ){
        if ($(window).scrollTop() + autonavMargin/2 /* + settings.marginTop*/ >= links['links'][i].linkOffest  ) {
            currentLink = (i+1);
        }
      }

      if (currentLink != prevLink) {
        /*console.log("current link is :"+currentLink+" ($(window).scrollTop(): " + $(window).scrollTop() +" ,autonavMargin/2: " + autonavMargin/2 +" ,settings.marginTop: " + settings.marginTop + " ,links['links']["+currentLink+"].linkOffest: " + links['links'][currentLink-1].linkOffest);*/
        $("#bs-autonav").find("li").removeClass("active");
        $("#bs-autonav li:nth-child("+currentLink+")").addClass("active");
        prevLink = currentLink;
      }
    }, 100));

    //Handling scroll events
    $(window).on("scroll", function(e) {
      if (settings.floatNav && isAutonav && !settings.fixToBody)
        floatAutonav();
    });
  };
}( jQuery ));
