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