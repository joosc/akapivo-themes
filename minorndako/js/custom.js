jQuery(document).ready(function($) {
	
	var hasimg = $('img').length;
	if(hasimg){
		$("img").lazyload({ effect:"fadeIn" });
	}
	
	// activate swipebox
	$('.swipebox').swipebox();
	
	var hastree = $('#red').length;
	if(hastree){
		$("#red").treeview({
				animated: "fast",
				collapsed: true,
				unique: true
		});
	}
 
});