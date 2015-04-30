jQuery(document).ready(function($) {
	
	var collected = new Array();
	
	// ADD FUNCTIONALITY
	$("[name='my-checkbox']").bootstrapSwitch();
	$('.slider').slider({
		tooltip: 'always',
		formatter: function(value) {
			var waarde = '';
			switch(value){
				case 0 : waarde = 'helemaal niet'; break;
				case 25 : waarde = 'niet echt'; break;
				case 50 : waarde = 'geen mening'; break;
				case 75 : waarde = 'eerder wel'; break;
				case 100 : waarde = 'helemaal wel'; break;
			}
			return waarde;
		}
	});
	
	// EVENT LISTENERS
	$('.slider').on('slide change',function(e){
		$.doTimeout( 'doneSliding', 1000, function(){   
			enquete_sliding_done(e);
		}, true);
	});
	$("input[name='my-checkbox']").on('switchChange.bootstrapSwitch', function(event, state) {
		$.doTimeout( 'doneSwitching', 1000, function(){
			enquete_switching_done(event,state);
		});
	});
	$(".opentekstform").on('input', function(event){
		$.doTimeout( 'doneTyping', 1000, function(){   
			enquete_typing_done(event);
		}, true);
	});
	$('.modal').on('hidden.bs.modal', function (event) {
		saveCachedData(event);
	});	
	
	
	// COLLECT INFO
	function enquete_sliding_done(event){
		var enquete_id = get_enquete_id();
		var vraag_id = get_vraag_id(event.target.id);
		var value = event.value;
		cacheAnswer(enquete_id,vraag_id,value,false);
		update_enquete_view(enquete_id,vraag_id);
	}
	function enquete_typing_done(event){
		var enquete_id = get_enquete_id();
		var vraag_id = get_vraag_id(event.target.id);
		var value = event.target.value;
		cacheAnswer(enquete_id,vraag_id,value,true);
		update_enquete_view(enquete_id,vraag_id);
	}
	function enquete_switching_done(event,state){
		var enquete_id = get_enquete_id();
		var vraag_id = get_vraag_id(event.target.id);
		var value = (state) ? 100 : 0;
		cacheAnswer(enquete_id,vraag_id,value,false);
		update_enquete_view(enquete_id,vraag_id);
	}
	function get_enquete_id(){
		var enquete_id = $('#enquete-wrapper').data('enquete-id');
		return enquete_id;
	}
	function get_vraag_id(input){
		var vraag_array = input.split('-');
		var vraag_id = vraag_array[vraag_array.length-1];
		return vraag_id;
	}
	
	// checkForCompletedBranches
	function checkForCompletedBranches(enquete_id){
		$('.branch[data-branch-completed="100"] .thumbnail img').each(function(index){
			var target = $(this);
			if(target.attr('data-completed') !== undefined){
				var target_src = target.attr('data-completed');
				target.attr('src',target_src);
				target.removeAttr('data-completed');
			}
		});
	}
	
	// AJAX UPDATE...
	function update_enquete_view(enquete_id,vraag_id){
		// current state vraag:
		var current_state_vraag = $('#tab'+vraag_id).attr('data-answered');
		
		if(current_state_vraag == 0){
			//console.log('NIEUW!!!');
			$('#tab'+vraag_id).attr('data-answered',1);
			// label aanpassen?
			if($('a.dropdown[href="#tab'+vraag_id+'"]')){
				var dropdown_link = $('a.dropdown[href="#tab'+vraag_id+'"]');
				var dropdown_link_parent = dropdown_link.parent();
				dropdown_link_parent.attr('data-answered',1);
				var dropdown_link_content = dropdown_link.html();
				dropdown_link.html('<span class="glyphicon glyphicon-ok" aria-hidden="true"></span> '+dropdown_link_content);
			}
			// titel aanpassen?
			if($('#tab'+vraag_id+' p.lead')){
				var p_lead = $('#tab'+vraag_id+' p.lead');
				var p_lead_html = p_lead.html();
				p_lead.html('<span class="glyphicon glyphicon-ok" aria-hidden="true"></span> '+p_lead_html);
			}
			// Aantal updaten
			// 1. Enquete
			var enq_wrapper = $('#enquete-wrapper');
			var aantal_antwoorden = parseInt(enq_wrapper.attr('data-aantal-antwoorden'),10) + 1;
			var aantal_vragen = parseInt(enq_wrapper.attr('data-aantal-vragen'),10);
			var enquete_completed = Math.round(100 * (aantal_antwoorden/aantal_vragen));
			enq_wrapper.attr('data-aantal-antwoorden',aantal_antwoorden);
			enq_wrapper.attr('data-enquete-completed',enquete_completed);
			
			// 2. branch
			var branch_id = $('#tab'+vraag_id).attr('data-branch');
			var branch = $('#branch-'+branch_id);
			var aantal_antwoorden_b = parseInt(branch.attr('data-aantal-antwoorden'),10) + 1;
			var aantal_vragen_b = parseInt(branch.attr('data-aantal-vragen'),10);
			var branch_completed = Math.round(100 * (aantal_antwoorden_b/aantal_vragen_b));
			branch.attr('data-aantal-antwoorden',aantal_antwoorden_b);
			branch.attr('data-branch-completed',branch_completed);
			
			// 3. progress
			// 3.1 : progress bar?
			if($('#branch-'+branch_id+' .modal-progress .default-progressbar')){
				console.log('PROG BAR.....');
				var progressbar = $('#branch-'+branch_id+' .modal-progress .default-progressbar .progress-bar');
				
				console.log(progressbar);
				progressbar.css('width',branch_completed+'%');
				//progressbar.tween('width',current_width,branch_completed+'%');
				
				
				
			}
			// 3.2 : switching image
			if($('#branch-'+branch_id+' .modal-progress .switching-image')){
				console.log('SWITCH IMAGE.....');
				if(branch_completed == 100){
					var switching_image = $('#branch-'+branch_id+' .modal-progress .switching-image');
					var target_src = switching_image.attr('data-completed');
					switching_image.attr('src',target_src);
					switching_image.removeAttr('data-completed');
				}
			}
			
			
			
		} else {
			//console.log('oud... :( ');
		}
	}
	
	// CACHE ANSWERS
	function cacheAnswer(enquete_id,vraag_id,value,is_body){
		var enquete_cookie = Cookie.read("enquete"+enquete_id);
		var data_to_save = new Object;
		data_to_save.vraag_id = vraag_id;
		if(is_body){
			value = value.clean();
			value = value.stripScripts();
			data_to_save.body = value;
		} else {
			data_to_save.value = value;
		}
		
		if(enquete_cookie == null){
			var all_data = new Array();
			all_data.push(data_to_save);
			var serialized_data = JSON.encode(all_data);
			var enquete_cookie = Cookie.write("enquete"+enquete_id,serialized_data);
		} else{
			var content = Cookie.read("enquete"+enquete_id);
			var unserialized = JSON.decode(content);
			var vraag_existed = false;
			for(var i=0; i<unserialized.length; i++){
				var cached_vraag = unserialized[i];
				if(cached_vraag.vraag_id == vraag_id){
					vraag_existed = true;
					if(is_body){
						cached_vraag.body = value;
					} else {
						cached_vraag.value = value;
					}
				}
			}
			if(!vraag_existed){
				unserialized.push(data_to_save);
			}
			var serialized_data = JSON.encode(unserialized);
			var enquete_cookie = Cookie.write("enquete"+enquete_id,serialized_data);
		}
		
		// DEBUG OUTPUT
		/*
		var enquete_cookie = Cookie.read("enquete"+enquete_id);
		var readable = JSON.decode(enquete_cookie);
		console.log(readable);
		*/
	}
	
	// SAVE CACHED DATA
	function saveCachedData(event){
		var enquete_id = get_enquete_id();
		var enquete_cookie = Cookie.read("enquete"+enquete_id);
		
		if(enquete_cookie !== null){
			
			
			var unserialized = JSON.decode(enquete_cookie);
			
			console.log(enquete_cookie);
			console.log(unserialized);
			
			$.get("http://be.minorndako:8888/enquete/"+enquete_id+"/save/"+enquete_cookie )
				.done(function( data ){
						//alert("data back => "+data);
						console.log(data);
						Cookie.dispose("enquete"+enquete_id);
				
				checkForCompletedBranches(enquete_id);					
			});

		}
		
		
	}
 
});