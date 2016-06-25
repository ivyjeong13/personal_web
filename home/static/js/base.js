$(document).ready(function(){
	$('.first').show().addClass('animated fadeInLeft');
	setTimeout(function(){
		$('.first span').css('visibility', 'visible').addClass('animated fadeInLeft');
		setTimeout(function(){
			$('.second').show().addClass('animated flipInX');
			setTimeout(function(){
				$('.second span').css('visibility', 'visible').addClass('animated bounceIn');
				setTimeout(function(){
					$('.third').show().addClass('animated slideInUp');
					setTimeout(function(){
						$('.third span').css('visibility', 'visible').addClass('animated fadeInRight');
						setTimeout(function(){
							$('.fourth').show().addClass('animated fadeInDown');
							setTimeout(function(){
								$('.fourth span').css('visibility', 'visible').addClass('animated fadeIn');
								setTimeout(function(){
									$('.fourth span').removeClass('fadeIn').addClass('animated infinite pulse');
								}, 300);
							}, 800);
						}, 1000);
					}, 500);
				}, 550);
			}, 1000);
		}, 550);
	},1000);

	$('.first').onScreen({
		doIn:function(){
			$('#header img').removeClass("gray");
		},
		doOut:function(){
			$('#header img').addClass("gray");
		}
	});
});