$(document).on('mouseover', '.snp-banner a', function(){
	$('.snp-banner span').fadeIn().addClass('animated pulse infinite');
});

$(document).on('mouseout', '.snp-banner a', function(){
	$('.snp-banner span').fadeOut().removeClass('animated pulse infinite');
});

$(document).on('click', '#sub-nav li', function(){
	var id = $(this).attr('data-id');
	$('html,body').animate({scrollTop: $('#'+id).offset().top - $('#nav').height() - 10}, 400);;
});