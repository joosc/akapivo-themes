jQuery(document).ready(function($) {
		
	// scroll to correct location on page load
	$("html, body").animate({ scrollTop: $('#branch-10').position().top }, {duration: 2000, queue: false});
	$("html, body").animate({ scrollLeft: $('#branch-10').position().left }, {duration: 2000, queue: false});
	
});
