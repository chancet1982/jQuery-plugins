$(function() {
    $.fn.sidebar = function( options ) {

		//defaults
        var settings = $.extend({
            customToggle: true, //use custom toggler instead of built-in toggler, it should have the following structure:
			customToggleID:'.custom-sidebar-toggle', //what class does the custom toggle button have EXAMPLE: <a class="custom-sidebar-toggle">toggle the sidebar</a>
            pageID:'.screen-wrapper', //what class is wrapping the page.
            animated: true, //determines if the offcanvas is animated or not.
            dismissOnPage: true, //determines if the sider should be collpased if clicked outside
			offsetPage: true, //determines if the page content should be offset once sidebar is expanded
			collapseSidebar: '768px', //what width should the sidebar collapse in
			sidebarWidth: 280, //what is the width os the sidebar when expanded.
			togglerWidth: 75, //what is the width needed for the sidebar toggler
			units:'px',
			borderColor: '#E7E7E7', //what is the border color to be used for the sidebar
			borderColorOn: '#E7E7E7', //what is the border color for the sidebar on hover
			toggleIconColor: '#888', //color code for the built-in toggler.
			toggleBorderColor: '#ddd', //color code for the border around the toggler.
			toggleBackgroundColorOn: '#E7E7E7', //what is the color code for the background of the toggler
			sidebarOnDesktop:false, // determines if the sidebar should be a sidebar in larger resolution, I.E. desktop
			targetClass: '.sidebar', //class for sidebar (only used if sidebarOnDesktop is FALSE)
			sidebarPos:'left' //position of sidebar can be left or right (only used if sidebarOnDesktop is FALSE)
        }, options );

		/*--- sidebars support  ---*/
		css = 	"<style>"+
				"@media (max-width:"+settings.collapseSidebar+"){"+
					settings.targetClass +"{position: fixed;top:0px;bottom: 0px;z-index: 1030;}"+
					settings.targetClass +" {"+settings.sidebarPos+":0px;}"+
					settings.targetClass +" .container {width: "+settings.sidebarWidth+settings.units+";height: 100%;}"+
					settings.targetClass +" .navbar-collapse {padding-right: 0px;padding-left: 0px;}"+					
					settings.pageID+" {position: absolute;top: 0px;width: 100%;}"+
					settings.pageID+"."+settings.sidebarPos+" {padding-"+settings.sidebarPos+": "+settings.togglerWidth+settings.units+";"+settings.sidebarPos+":0px;}"+
					settings.pageID+".custom-toggle {padding-left: 0;padding-right: 0;}"+
					settings.pageID+".offset-"+settings.sidebarPos+" {"+settings.sidebarPos+": "+settings.sidebarWidth+settings.units+";}"+
					"nav"+settings.targetClass +" {margin-bottom: 0px;}"+
					".nav {padding-left: 15px;padding-right: 15px;margin-bottom: 0px;}"+
					".navbar-nav {margin:0;}"+
					".navbar-nav > li > a {padding-top: 15px;padding-bottom: 15px;}"+
					settings.targetClass +" .navbar-toggle {position: absolute;top:0px;margin-left: 15px;}"+
					settings.targetClass +".collapsed .navbar-toggle {"+settings.sidebarPos+":0px;}"+
					settings.targetClass +".expanded .navbar-toggle {"+settings.sidebarPos+":"+settings.sidebarWidth+settings.units+";}"+
					".navbar-toggle {border-color: "+settings.toggleBorderColor+";}"+
					".navbar-toggle:hover {background-color: "+settings.toggleBackgroundColorOn+";}"+
					".navbar-toggle .icon-bar {background-color: "+settings.toggleIconColor+";}"+
					settings.targetClass +" .container {position: absolute;}"+
					settings.pageID+".animated,"+
					settings.targetClass +".animated,"+
					settings.targetClass +".animated .container,"+
					settings.targetClass +".animated .navbar-toggle {-webkit-transition: all 0.3s ease-out;transition: all 0.3s ease-out;}"+
				
					settings.targetClass +".collapsed .container {"+settings.sidebarPos+": -"+settings.sidebarWidth+settings.units+";}"+
					settings.targetClass +".expanded .container {"+settings.sidebarPos+": 0;}"+
					settings.targetClass +".collapsed {width:"+settings.togglerWidth+settings.units+";}"+
					settings.targetClass +".custom-toggle.collapsed {width:0px;}"+
					settings.targetClass +".expanded {width:"+(settings.sidebarWidth+settings.togglerWidth)+settings.units+ ";}"+
					settings.targetClass +".custom-toggle.expanded {width:"+settings.sidebarWidth+settings.units+";}";

		if (settings.sidebarPos == 'left') {

			css +=	settings.targetClass +" .container {border-right: solid 1px "+settings.borderColor+";}"+
					settings.targetClass +"{border-right:solid 1px "+settings.borderColor+";}"+
				"}";
		} else {
			css +=	settings.targetClass +" .container {border-left: solid 1px "+settings.borderColor+";}"+
					settings.targetClass +"{border-left:solid 1px "+settings.borderColor+";}"+
				"}";				
		}
		
		var pageIDWidth = $(window).width() - settings.sidebarWidth;
		
		if (settings.sidebarOnDesktop) {
			css +=	"@media (min-width:"+settings.collapseSidebar+"){"+
					settings.targetClass +"{position: fixed;top:0px;bottom: 0px;z-index: 1030;}"+
					settings.targetClass +" .container {width: "+settings.sidebarWidth+settings.units +";height: 100%;}"+
					settings.targetClass +" .navbar-collapse {padding-right: 0px;padding-left: 0px;}"+					
					settings.pageID +" {width: "+pageIDWidth+settings.units+"; margin-left:"+settings.sidebarWidth+settings.units+"; }"+
					settings.targetClass +" .navbar-header,"+
					settings.targetClass +" .navbar-nav,"+
					settings.targetClass +" .navbar-nav > li {float: none;}";
			if (settings.sidebarPos == 'left') {
			css +=	settings.targetClass +"{"+settings.sidebarPos+":0px;right:auto;border-right-width:1px;border-right-style:solid;}"+
				"}";
			} else {
			css +=	settings.targetClass +"{"+settings.sidebarPos+":0px;left:auto;border-left-width:1px;border-left-style:solid;}"+
				"}";				
			}
		}

		css+="</style>";						
/*console.log("$(window).width(): " + $(window).width());
console.log("$(settings.targetClass).width(): " + $(settings.targetClass).width());*/
		

		//initializing the page
		$(this).each(function(){
			thisObj = $(this);
			/*togglePosition = undefined;*/
			togglePosition = settings.sidebarPos;
			$(this).find('.navbar-collapse').removeClass('collapse');
			
			if (!settings.customToggle) {
				$(this).prepend($(this).find('.navbar-toggle').clone().addClass(togglePosition));				
			} else {
				$(this).addClass('custom-toggle');
				$(settings.pageID).addClass('custom-toggle');				
				$(settings.customToggleID).addClass(togglePosition);
			}

			$(settings.customToggleID).attr('data-toggle','collapse-offscreen');				
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
				$(settings.pageID).addClass('offset-'+settings.sidebarPos);
			}
		}				

		//handling click events
		$(document).mouseup(function (e) {
		    var container = $("nav"+settings.targetClass);
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