(function ( $ ) {
    $.fn.dismiss = function( options ) {

		//defaults
        var settings = $.extend({
            dismissAfter: 10000,
            autoDismiss: true,
            dismissTrigger: ".close"
        }, options );
 
 		var dis = function ($thisObj) {
			if (typeof(Storage) !== "undefined" && !$thisObj.hasClass("dismissed")) {
				localStorage.setItem(genId($thisObj), "dismissed");
				$thisObj.addClass("dismissed").hide();
			}
		};

 		var genId = function ($thisObj) {
        console.log("genId called");
 			id = 0, id_length = 0, des_length = 8;
 			s = $thisObj.text();
			for (var i = 0; i < s.length; i++){
			    id = id + s.charCodeAt(i);
			}
            id_length = (Math.log10((id ^ (id >> 31)) - (id >> 31)) | 0) + 1;
            
            if (id_length < des_length) {
            	id = id + 10000000;
			} else if (id_length > des_length) {
				access = id_length - des_length;
				id.slice(0, -access);
			}
            
			console.log("final id is: id" + id);
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