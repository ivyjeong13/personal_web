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

	$('#footer').onScreen({
		tolerance:300,
		doIn:function(){
			$('.f_1').show().addClass('animated rotateInDownLeft');
			setTimeout(function(){
				$('.f_1 span').css('visibility', 'visible').addClass('animated fadeInLeft');
				setTimeout(function(){
					$('.f_2').show().addClass('animated rotateInDownRight');
					setTimeout(function(){
						$('.f_3').show().addClass('animated flipInX');
						setTimeout(function(){
							$('.f_3 span').css('visibility', 'visible').addClass('animated fadeInRight');
							setTimeout(function(){
								$('.f_4 span').css('visibility', 'visible');
								$('.f_4').show().addClass('animated rollIn');
								setTimeout(function(){
									$('.f_4 span').addClass('animated infinite bounce');
									setTimeout(function(){
										$('.f_5').show().addClass('animated rotateInUpLeft');
										setTimeout(function(){
											$('.f_5 span').css('visibility', 'visible').addClass('animated fadeIn');
										}, 750);
									},500)
								}, 400);
							}, 750);
						}, 700);
					},1000);
				},500);
			},1000);
		}
	})
});