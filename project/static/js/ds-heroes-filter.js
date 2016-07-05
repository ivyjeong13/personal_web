$(document).on('mouseover', '.ds-heroes li:not(.hide)', function(){
	var name = $(this).attr('data-name');
	$('.hero-name-display').text(name);
});

$(document).on('mouseout', '.ds-heroes li:not(.hide)', function(){
	$('.hero-name-display').text('');
});

$(document).on('click', '.ds-heroes .hero-container li', function(){
	if($(this).hasClass('hide'))
		return;

	if($('.edit-ds-heroes').length > 0 && 
		$('.ds-heroes .hero-container li.selected').length == 5){
		return;
	}

	$(this).toggleClass('selected');

	var ids = [];
	$('.hero-container li.selected').each(function(){
		ids.push($(this).attr('data-id'));
	});
	$('#sel_heroes').val(ids.join(','));
});

$(document).on('click', '.hero-refine .option', function(){
	$(this).toggleClass('selected');
	var classes=[];
	$('.hero-refine .option.selected').each(function(){
		classes.push("."+$(this).attr('data-value'));
	});
	$('.ds-heroes .hero-container li'+classes.join('')).removeClass('hide');
	if(classes.length > 0)
		$('.ds-heroes .hero-container li:not('+classes.join('')+')').addClass('hide');
});	