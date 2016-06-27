$(document).on('mouseover', '.project', function(){
	if(!$(this).hasClass('disabled'))
		$(this).find('.headline').addClass('animated tada');
	else
		$(this).find('.headline').addClass('animated pulse');
});
$(document).on('mouseout', '.project', function(){
	$(this).find('.headline').removeClass('animated tada pulse');
});

$(document).ready(function(){
	$('#projectBody .project:not(.disabled)').addClass('animated fadeInLeft');
	$('#projectBody .project.disabled').addClass('animated fadeIn');
});