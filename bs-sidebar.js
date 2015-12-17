$(function() {
    $.fn.sidebar = function( options ) {

		//defaults
        var settings = $.extend({
            toggleFixPos: true,
            toggleBackground: true,
            customToggle: false, //implemented
            toggleID:'.navbar-toggle', //implemented
            pageID:'.screen-wrapper', //implemented
            animated: true, //implemented
            dismissOnPage: true, //implemented
			offsetPage: false, //implemented
			collapseSidebar: '768px', //implemented
			sidebarWidth: '280px', //implemented
			togglerWidth: '75px', //implemeneted
			borderColor: '#E7E7E7', //implemented
			borderColorOn: '#E7E7E7', //implemented
			toggleIconColor: '#888', //implemented
			toggleBorderColor: '#ddd', //implemeneted
			toggleBackgroundColorOn: '#E7E7E7', //implemented
			sidebar:true,
			hidebar:false
        }, options );

		/*--- sidebars support  ---*/
		if (settings.sidebar) {
			css = 	"<style>"+
					".navbar-fixed-left, "+
					".navbar-fixed-right {position: fixed;top:0px;bottom: 0px;z-index: 1030;}"+
					".navbar-fixed-left {left:0px;}"+
					".navbar-fixed-right {right:0px;}"+
					".navbar-fixed-left .container,"+
					".navbar-fixed-right .container {width: "+settings.sidebarWidth+";height: 100%;}"+
					".navbar-fixed-left .navbar-collapse,"+
					".navbar-fixed-right .navbar-collapse {padding-right: 0px;padding-left: 0px;}"+
					"@media (min-width:"+settings.collapseSidebar+"){"+
					"    .navbar-fixed-left {left: 0px;}"+
					"    .navbar-fixed-right {right: 0px;}"+
					"    .navbar-fixed-left .navbar-header,"+
					"    .navbar-fixed-right .navbar-header,"+
					"    .navbar-fixed-left .navbar-nav,"+
					"    .navbar-fixed-right .navbar-nav,"+
					"    .navbar-fixed-left .navbar-nav > li,"+
					"    .navbar-fixed-right .navbar-nav > li {float: none;}"+
					"}"+
					"@media (max-width:"+settings.collapseSidebar+"){"+
						settings.pageID+" {position: absolute;top: 0px;width: 100%;}"+
						settings.pageID+".left {padding-left: "+settings.togglerWidth+";left:0px;}"+
						settings.pageID+".right {padding-right: "+settings.togglerWidth+";right:0px;}"+
						settings.pageID+".custom-toggle {padding-left: 0;padding-right: 0;}"+
						settings.pageID+".offset-left {left: "+settings.sidebarWidth+";}"+
						settings.pageID+".offset-right {right: "+settings.sidebarWidth+";}"+
					"    nav.navbar-fixed-left,"+
					"    nav.navbar-fixed-right {margin-bottom: 0px;}"+
					"    .nav {padding-left: 15px;padding-right: 15px;margin-bottom: 0px;}"+
					"    .navbar-nav {margin:0;}"+
					"    .navbar-nav > li > a {padding-top: 15px;padding-bottom: 15px;}"+
					"    .navbar-fixed-left .navbar-toggle,"+
					"    .navbar-fixed-right .navbar-toggle {position: absolute;top:0px;margin-left: 15px;}"+
					"    .navbar-fixed-left.collapsed .navbar-toggle {left:0px;}"+
					"    .navbar-fixed-left.expanded .navbar-toggle {left:"+settings.sidebarWidth+";}"+
					"    .navbar-fixed-right.collapsed .navbar-toggle {right:0px;}"+
					"    .navbar-fixed-right.expanded .navbar-toggle {right:"+settings.sidebarWidth+";}"+   
					"    .navbar-toggle {border-color: "+settings.toggleBorderColor+";}"+
					"    .navbar-toggle:hover {background-color: "+settings.toggleBackgroundColorOn+";}"+
					"    .navbar-toggle .icon-bar {background-color: "+settings.toggleIconColor+";}"+
					"    .navbar-fixed-left .container {border-right: solid 1px "+settings.borderColor+";}"+
					"    .navbar-fixed-right .container {border-left: solid 1px "+settings.borderColor+";}"+
					"    .navbar-fixed-left .container,"+
					"    .navbar-fixed-right .container {position: absolute;}"+
						settings.pageID+".animated,"+
					"    .navbar-fixed-left.animated,"+
					"    .navbar-fixed-right.animated,"+
					"    .navbar-fixed-left.animated .container,"+
					"    .navbar-fixed-right.animated .container,"+
					"    .navbar-fixed-left.animated .navbar-toggle,"+
					"    .navbar-fixed-right.animated .navbar-toggle {-webkit-transition: all 0.3s ease-out;transition: all 0.3s ease-out;}"+
					"    .navbar-fixed-left.collapsed .container {left: -"+settings.sidebarWidth+";}"+
					"    .navbar-fixed-left.expanded .container {left: 0;}"+
					"    .navbar-fixed-right.collapsed .container {right: -"+settings.sidebarWidth+";}"+
					"    .navbar-fixed-right.expanded .container {right: 0;}"+
					"    .navbar-fixed-left.collapsed,"+
					"    .navbar-fixed-right.collapsed {width:"+settings.togglerWidth+";}"+
					"    .navbar-fixed-left.custom-toggle.collapsed,"+
					"    .navbar-fixed-right.custom-toggle.collapsed {width:0px;}"+
					"    .navbar-fixed-left.expanded,"+
					"    .navbar-fixed-right.expanded {width:355px;}"+
					"    .navbar-fixed-left.custom-toggle.expanded,"+
					"    .navbar-fixed-right.custom-toggle.expanded {width:"+settings.sidebarWidth+";}"+
					"}"+
					"</style>";	
		}

		if (settings.hidebar) {
			css = 	"<style>"+
					".navbar-fixed-bottom.scroll, .navbar-fixed-top.scroll {"+
						"position: absolute;"+
					"}"+
					"</style>";	
		}

		//initializing the page
		$(this).each(function(){
			thisObj = $(this);
			togglePosition = undefined;
			if ($(this).hasClass('navbar-fixed-left')) {
				togglePosition = 'left';
			} else if ($(this).hasClass('navbar-fixed-right')){
				togglePosition = 'right';
			}

			if (togglePosition != undefined ) {
				$(this).find('.navbar-collapse').removeClass('collapse');
			}
			
			if (!settings.customToggle) {
				$(this).prepend($(this).find('.navbar-toggle').clone().addClass(togglePosition));				
			} else {
				$(this).addClass('custom-toggle');
				$(settings.pageID).addClass('custom-toggle');				
				$(settings.toggleID).addClass(togglePosition);
			}

			$(settings.toggleID).attr('data-toggle','collapse-offscreen');				
			$(this).find('.container .navbar-toggle' ).remove();
			
			if (settings.animated) {
				$(this).addClass('animated');
				if (settings.offsetPage) {
					$(settings.pageID).addClass('animated');	
				}
			} 
			$('head').append(css);

			$(this).addClass('collapsed');	
			$(settings.pageID).addClass(togglePosition);
		});
		
		//collapse sidebar function
		if (settings.hidebar) {
			console.log("should use hidebar");
			var position = $(window).scrollTop();

			$(window).scroll(function() {
				var scroll = $(window).scrollTop();
				if ($(thisObj).hasClass('navbar-fixed-top')) {
					thisObjFixedPos = 'top';
				} else if ($(thisObj).hasClass('navbar-fixed-bottom')){
					thisObjFixedPos = 'bottom';
				}

				console.log(thisObjFixedPos);

				if (scroll > position) {
					if (!$(thisObj).hasClass('scroll')) { // scrolling down
						$(thisObj).addClass('scroll').css(thisObjFixedPos,"-"+$(thisObj).outerHeight()+"px"); 
					}
				} else {
					if ($(thisObj).hasClass('scroll')) { // scrolling up	
						if (thisObjFixedPos == 'top') {
							$(thisObj).removeClass('scroll').animate({'top':0}, 300); 
						} else if (thisObjFixedPos == 'bottom'){
							$(thisObj).removeClass('scroll').animate({'bottom':0}, 300);
						}
						
					}
				}
				position = scroll;
			});	
		}

		//collapse sidebar function
		var collapseSidebar = function(targetElement) {
			targetElement.removeClass('expanded').addClass('collapsed');
			if (settings.offsetPage) {
				$(settings.pageID).removeClass('offset-left').removeClass('offset-right');
			}	
		}

		//expand sidebar function
		var expandSiderbar = function(targetElement) {
			targetElement.removeClass('collapsed').addClass('expanded');
			if (settings.offsetPage) {
				if (targetElement.hasClass('navbar-fixed-left')) {
					$(settings.pageID).addClass('offset-left');
				} else if (targetElement.hasClass('navbar-fixed-right')) {
					$(settings.pageID).addClass('offset-right');
				}
			}
		}				

		//handling click events
		$(document).mouseup(function (e) {
		    var container = $("nav.navbar-fixed-left, nav.navbar-fixed-right");
			var source = e.target || e.srcElement;		    
			if($(source).data('toggle') != 'collapse-offscreen') { //clicking not on data-toggle
				if (settings.dismissOnPage) {
				    if (!container.is(e.target) // if the target of the click isn't the container...
				        && container.has(e.target).length === 0) { // ... nor a descendant of the container
						collapseSidebar(container);
				    }	    					
				}
			} else { //clicking not on data-toggle
				if (container.hasClass('collapsed')) {
					expandSiderbar(container);					
				} else {
					collapseSidebar(container);					
				}				
			}
		});
    };


}( jQuery ));