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

var tag = document.createElement('script');
		tag.src = 'https://www.youtube.com/player_api';
var firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var tv,
		playerDefaults = {autoplay: 0, autohide: 1, modestbranding: 0, rel: 0, showinfo: 0, controls: 0, disablekb: 1, enablejsapi: 0, iv_load_policy: 3};
var vid = [
			{'videoId': 'sfcxifX8VZc', 'startSeconds': 0, 'suggestedQuality': 'hd720'}
		],
		randomvid = Math.floor(Math.random() * (vid.length - 1 + 1));

function onYouTubePlayerAPIReady(){
  tv = new YT.Player('tv', {events: {'onReady': onPlayerReady, 'onStateChange': onPlayerStateChange}, playerVars: playerDefaults});
}

function onPlayerReady(){
	setTimeout(function(){
		var height = $('.img-wrapper').height();
		$('.img-wrapper').fadeOut(1000);
		$('.middle').addClass('playing');
		setTimeout(function(){
			$('.tv-wrapper').css('max-height', height).fadeIn(1000);
			tv.loadVideoById(vid[randomvid]);
		},500);
	},2000);
  //tv.mute();
}

function onPlayerStateChange(e) {
  if (e.data === 1){
    $('#tv').addClass('active');
  } else if (e.data === 0){
    //tv.seekTo(vid[randomvid].startSeconds)
    $('.tv-wrapper').fadeOut(1000);
    setTimeout(function(){
    	$('.img-wrapper').fadeIn(1000);
    	$('.middle').removeClass('playing');
    },1000);
  }
}

function vidRescale(){

  var w = $(window).width()+200,
    h = $(window).height()+200;

  if (w/h > 16/9){
    tv.setSize(w, w/16*9);
    $('.tv .screen').css({'left': '0px'});
  } else {
    tv.setSize(h/9*16, h);
    $('.tv .screen').css({'left': -($('.tv .screen').outerWidth()-w)/2});
  }
}

$(window).on('load resize', function(){
  vidRescale();
});

$('.hi span').on('click', function(){
  $('#tv').toggleClass('mute');
  if($('#tv').hasClass('mute')){
    tv.mute();
  } else {
    tv.unMute();
  }
});