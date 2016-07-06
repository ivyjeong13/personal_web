$(document).on('click', '.filters-btn', function(){
	if($(this).hasClass('shown')){
		$('.ds-search-filters').slideUp();
		$(this).text('Show Filters');
	}else{
		$('.ds-search-filters').slideDown();
		$(this).text('Hide Filters');
	}

	$(this).toggleClass('shown');
});