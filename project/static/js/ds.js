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

$(document).on('keypress', 'input[type="text"]', function(e){
	if ( e.which == 13 ) {
		$(this).parents('form:first').find('.btn-submit').click();
	}
});