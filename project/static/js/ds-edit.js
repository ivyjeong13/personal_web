$(document).ready(function(){
	var sel = $('#sel_heroes').val().split(',');

	var i;
	for(i=0; i<sel.length;i++){
		$('.ds-heroes .hero-container li[data-id="'+sel[i]+'"]').addClass('selected');
	}
});

$(document).on('click', '.cancel.btn', function(){
	document.location.reload(true);
});