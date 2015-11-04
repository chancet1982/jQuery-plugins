(function ( $ ) {
    $.fn.dismiss = function( options ) {

		//defaults
        var settings = $.extend({
            dismissAfter: 10000,
            autoDismiss: true,
            dismissTrigger: ".close"
        }, options );
 
 		var dis = function ($thisObj) {
			if (typeof(Storage) !== "undefined" && $thisObj.attr("id") &&  !$thisObj.hasClass("dismissed")) {
				localStorage.setItem($thisObj.attr("id"), "dismissed");
				$thisObj.addClass("dismissed").hide();
			}
		};

        // in the begnining we add a class dismissed to each of the elements
        $(this).each(function(){
        	var $thisObj = $(this);
        	$thisObj.addClass("dismissable");
			
			// dismissing already dismissed objects
            if (typeof(Storage) !== "undefined" && localStorage.getItem($thisObj.attr("id")) == "dismissed")
             	dis($thisObj);

			// auto dismiss should hide after a certain period
			if (settings.autoDismiss) {
				setTimeout(function(){
					dis($thisObj);
				}, settings.dismissAfter);	
			}
        });

		//Once a dismissable element is clicked it is set in the localstorage of the browser
		$(".dismissable" + " " + settings.dismissTrigger).on("click", function(event){
			var source = event.target || event.srcElement,
				sourceJSObj = source.closest(".dismissable");

			dis($(sourceJSObj));
		});
    };
}( jQuery ));