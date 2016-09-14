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
	$('#projectBody .project').addClass('animated fadeInLeft');
});

function nextProject(){
	if($('.project.hiddenproject').length == 0){
		$('.project:first').addClass('hiddenproject');
	}else{
		if($('.project:not(.hiddenproject)').length == 0){
			return;
		}else{
			$('.project.hiddenproject:last').next().addClass('hiddenproject');
		}
	}
}

function previousProject(){
	if($('.project.hiddenproject').length == 0){
		return;
	}else{
		$('.project.hiddenproject:last').removeClass('hiddenproject');
	}
}