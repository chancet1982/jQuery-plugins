(function ( $ ) {
    $.fn.dismiss = function( options ) {

		//defaults
        var settings = $.extend({
            dismissAfter: 10000,
            autoDismiss: false,
            dismissTrigger: ".close"
        }, options );

		// detect IE function - cause IE never works as it should
        var detectIE = function() {
            var ua = window.navigator.userAgent;        	
            var msie = false;
            if ((ua.indexOf('MSIE ') > -1) || (ua.indexOf('Trident/') > -1))
                msie = true;
        	return msie;
        } 

		// dismiss function (based on content)
 		var dis = function ($thisObj) {
			if (typeof(Storage) !== "undefined" && !$thisObj.hasClass("dismissed")) {
				localStorage.setItem(genId($thisObj), "dismissed");
				$thisObj.addClass("dismissed").hide();
			}
		};

		// generating ID for the dismissable element based on content.
 		var genId = function ($thisObj) {
 			id = 0, id_length = 0, des_length = 8;
 			s = $thisObj.text();
			for (var i = 0; i < s.length; i++){
			    id = id + s.charCodeAt(i);
			}

            if (detectIE()) {
            	id_length = id.toString().length;;
            } else {
            	id_length = (Math.log10((id ^ (id >> 31)) - (id >> 31)) | 0) + 1;            	
            }
                        
            if (id_length < des_length) {
            	id = id + 10000000;
			} else if (id_length > des_length) {
				access = id_length - des_length;
				id.slice(0, -access);
			}
			return "id"+id;
		};		

        // in the begnining we add a class dismissed to each of the elements
        $(this).each(function(){
        	var $thisObj = $(this);
        	$thisObj.addClass("dismissable");
        	id = genId($thisObj);
			// dismissing already dismissed objects
            if (typeof(Storage) !== "undefined" && localStorage.getItem(genId($thisObj)) == "dismissed")
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