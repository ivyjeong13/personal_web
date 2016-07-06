$(document).on('click', '.btn-submit', function(){
	var $form = $(this).parents('form:first');
	if($form.hasClass('register')){
		if($form.find('input[name="dup_password"]').val() != $form.find('input[name="password"]').val()){
			alert('error: not matching password');
			return;
		}
	}

	$(this).parents('form:first').submit();
});

$(document).on('keypress', 'input', function(e){
	if ( e.which == 13 ) {
		console.log('enter');
		$(this).parents('form:first').find('.btn-submit').click();
	}
});

$(document).on('click', '.show-matches', function(){
	if($(this).hasClass('shown')){
		$('.matches').slideUp();
		$(this).text('Show matches');
	}
	else{
		$('.matches').slideDown();
		$(this).text('Hide Matches');
	}
	$(this).toggleClass('shown');
});