$(document).on('mouseover', '.snp-banner a', function(){
	$('.snp-banner span').fadeIn().addClass('animated pulse infinite');
});

$(document).on('mouseout', '.snp-banner a', function(){
	$('.snp-banner span').fadeOut().removeClass('animated pulse infinite');
});