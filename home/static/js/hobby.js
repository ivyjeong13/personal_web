$(document).ready(function(){
	$('#hobbyHeader').height($(window).height());
	$('#hobbyHeader .h1').addClass('animated jello');
	setTimeout(function(){
		$('#hobbyHeader .h1').removeClass('animated jello').addClass('animated pulse infinite');
	}, 1500);

	var clayInterval;
	$('#clayModel').onScreen({
		tolerance:500,
		doIn:function(){
			clayInterval = setInterval(function(){
				var $first = $('.img-container.first');
				if($first.next('.img-container').length > 0){
					$first.removeClass('first').fadeOut(500);
					setTimeout(function(){
						$first.next('.img-container').addClass('first').fadeIn(500);
					},500);
				}else{
					$('.bg-wrapper .img-container').fadeOut(500);
					setTimeout(function(){
						$('.bg-wrapper .img-container:first').addClass('first').fadeIn(500);
					},500);
				}

			}, 2000);
		},
		doOut:function(){
			clearInterval(clayInterval);
		}
	});

	$('#muayThai').onScreen({
		tolerance:300,
		doIn:function(){
			$(this).find('img').removeClass('animated fadeOut').css('visibility', 'visible').addClass('animated fadeIn');
		},
		doOut:function(){
			var $this = $(this);
			$this.find('img').removeClass('animated fadeIn').addClass('animated fadeOut');
			setTimeout(function(){
				$this.find('img').css('visibility', 'hidden')
			},500);
		}
	});

	$('#videoGaming').onScreen({
		tolerance:100,
		doIn:function(){
			$(this).find('img').removeClass('animated fadeOutRight').css('visibility', 'visible').addClass('animated fadeInRight');
		},
		doOut:function(){
			var $this = $(this);
			$this.find('img').removeClass('animated fadeInRight').addClass('animated fadeOutRight');
			setTimeout(function(){
				$this.find('img').css('visibility', 'hidden')
			},500);
		}
	});

	$('#clayModel .text-container').onScreen({
		doIn:function(){
			$(this).show().find('p').addClass('animated fadeInLeft');
		},
		doOut:function(){
			$(this).hide().find('p').removeClass('animated fadeInLeft');
		}
	});

	$('#muayThai .text-container').onScreen({
		doIn:function(){
			$(this).show().find('p').addClass('animated fadeInUp');
		},
		doOut:function(){
			$(this).hide().find('p').removeClass('animated fadeInUp');
		}
	});

	$('#guitar').onScreen({
		tolerance:100,
		doIn:function(){
			$(this).find('img').removeClass('animated slideOutDown').css('visibility', 'visible').addClass('animated slideInDown');
		},
		doOut:function(){
			var $this = $(this);
			$this.find('img').removeClass('animated slideInDown').addClass('animated slideOutDown');
			setTimeout(function(){
				$this.find('img').css('visibility', 'hidden')
			},500);
		}
	});
});

$(document).on('click', '.list_sp_games .btn', function(){
	$(this).parent().find('.lightbox').slideToggle();
});

$(document).on('mouseover', '#hobbyHeader li', function(){
	$('#hobbyHeader .answer').text($(this).attr('data-name'));
});
$(document).on('mouseout', '#hobbyHeader li', function(){
	$('#hobbyHeader .answer').text('');
});

$(document).on('click', '#hobbyHeader li', function(){
	var id = $(this).attr('data-id');
	$('html,body').animate({scrollTop: $('#'+id).offset().top}, 400);;
});