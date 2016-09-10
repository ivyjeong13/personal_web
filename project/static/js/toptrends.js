var CountryTrend = Backbone.Model.extend({
	tagName: 'div',
	defaults:{
		name: null,
		postal: null,
		trending:null
	}
});

var CountryTrendCollection = Backbone.Collection.extend({
	model: CountryTrend
});

var RelatedTweets = Backbone.Model.extend({
	urlRoot: '/toptrends/api/twitter?result_type=popular',
	url:function(){
		var page = this.urlRoot + '&q=' + this.get('term');
		return page;
	}
});

var RelatedTweetsView = Backbone.View.extend({
	initialize: function(){
		_.bindAll(this, 'render');
	},
	render:function(){
		this.template = _.template($('#popular-tweets-tpl').html());
		this.$el.html(this.template({
			tweets: this.model
		}));

		var maxHeight = -1;
		$('.related-tweets li .tweet').each(function() {
		     maxHeight = maxHeight > $(this).height() ? maxHeight : $(this).height();
		});

		$('.related-tweets li .tweet').each(function() {
		    $(this).height(maxHeight);
		});
	}
});

var CountryCollectionView = Backbone.View.extend({
	initialize: function(){
		_.bindAll(this, 'render');
	},
	render:function(){
		$(this.el).empty();
		$(this.el).append('<canvas id="main_canvas" width="" height=""></canvas>'
			+'<div id="listTrendingFromCountry"></div>');
		buildTrendingCanvas(this.collection);
	}
});

var CountryCollectionPopupView = Backbone.View.extend({
	initialize: function(){
		_.bindAll(this, 'render');
		this.model.bind('change', this.render);
	},
	render:function(){
		this.template = _.template($('#top-trends-tpl').html());
		this.$el.html(this.template({
			country: this.model
		}));
	}
});

/*****************
	Controller
*/
var MyController = Backbone.Router.extend({
	routes: {
		"" : "home",
		"tweets/:term": "tweets"
	},

	home: function(){
		buildHome();
	},

	tweets: function(term){
		buildTweets(term);
	}
});

$(document).ready(function(){
	var yC = new MyController;
	Backbone.history.start();
});

function buildHome(){
	if(typeof countries !== 'undefined'){
		var countryTrendCollection = new CountryTrendCollection()

		var c;
		for(c in countries){
			var country = countries[c];
			countryTrendCollection.add([
				{
					name:country['name'], 
					postal:country['postal'], 
					trending:country['trending']
				}
			]);
		}

		var countryCollectionView = new CountryCollectionView({ 
			el: '#trendBackbone', 
			collection: countryTrendCollection 
		});
		countryCollectionView.render();
	}
}

var canvas;
var stage;
function buildTrendingCanvas(collection){
	$('canvas').attr('width', $(window).width());
	$('canvas').attr('height', $(window).height()*.85);
	canvas = document.getElementById('main_canvas');
	stage = new createjs.Stage(canvas);
	stage.enableMouseOver(20);

	var colors = randomColor({hue: 'blue', count: 50});
	var selectedcolors = {};

	collection.each(function(country){
		var rand = Math.floor(Math.random() * 50);
		var color = colors[rand];

		while(typeof selectedcolors[color] !== 'undefined'){
			rand = Math.floor(Math.random() * 50);
			color = colors[rand];
		}

		selectedcolors[color] = 1;

		var ball = new createjs.Shape();
		var radius = Math.random() * (100-50) + 50;
		ball.graphics.setStrokeStyle(1, 'round', 'round');
		ball.graphics.beginStroke('#000000');
		ball.graphics.beginFill(color).drawCircle(0, 0, radius);
		ball.graphics.endStroke();
		ball.graphics.endFill();
		ball.graphics.moveTo(0, 0);
		ball.alpha = 0.33;

		var min_x = radius;
		var max_x = $(window).width() - radius;
		var initx = Math.random() * (max_x-min_x) + min_x;
		ball.x = initx;
		ball.y = -100;

		ball.set({'countryModel': country});
		ball.addEventListener('click', handleClick);
		ball.addEventListener('mouseover', function(){
			ball.alpha = 0.85;
			stage.update();
			stage.setChildIndex(ball, stage.getNumChildren()-1);
			stage.setChildIndex(txt, stage.getNumChildren()-1);
		});
		ball.addEventListener('mouseout', function(){
			ball.alpha = 0.33;
			stage.update();
		});

		var txt = new createjs.Text(country.get('name').toUpperCase(), "100 14px Arial");
		txt.textAlign = "center";
		txt.x = initx;
		txt.y = -100;

		var max_y = $(window).height() - radius;
		var min_y = radius;
		var randy = Math.random() * (max_y-min_y) + min_y;
		var tween = createjs.Tween.get(ball, {loop: false})
				.to({x: ball.x, y: randy, rotation: 0}, 1500, createjs.Ease.bounceOut).call(handleComplete);
				/**
				.wait(1000)
				.to({x: canvas.width - 55, rotation: 360}, 2500, createjs.Ease.bounceOut)
				.wait(1000).call(handleComplete)
				.to({scaleX: 2, scaleY: 2, x: canvas.width - 110, y: canvas.height - 110}, 2500, createjs.Ease.bounceOut)
				.wait(1000)
				.to({scaleX: .5, scaleY: .5, x: 30, rotation: -360, y: canvas.height - 30}, 2500, createjs.Ease.bounceOut);
				**/

		tween = createjs.Tween.get(txt, {loop: false})
				.to({x: ball.x, y: randy - 7, rotation: 0}, 1500, createjs.Ease.bounceOut).call(handleTextComplete);

		var circle_max_x = (Math.random() * (max_x-min_x) + min_x)/4;
		var circle_max_y = circle_max_x;

		var direction = Math.round(Math.random() * 4);
		function handleTextComplete(tween){
			var txt = tween._target;

			var left_x_min = ball.x;
			var left_y_min = ball.y;
			var left_x_max = ball.x + circle_max_x;
			var left_y_max = ball.y + circle_max_y;
			var left_x_max2 = ball.x - circle_max_x;
			var left_y_max2 = ball.y - circle_max_y;
				
			if(direction==1){
				var tween = createjs.Tween.get(txt, {loop:true})
					.to({x:left_x_min, y:left_y_max-7}, 10000, createjs.Ease.linear)
					.to({x:left_x_max, y:left_y_max-7}, 10000, createjs.Ease.linear)
					.to({x:left_x_max, y:left_y_min-7}, 10000, createjs.Ease.linear)
					.to({x:left_x_min, y:left_y_min-7}, 10000, createjs.Ease.linear)
			}else if(direction==2){
				var tween = createjs.Tween.get(txt, {loop:true})
					.to({x:left_x_max, y:left_y_min-7}, 10000, createjs.Ease.linear)
					.to({x:left_x_max, y:left_y_max-7}, 10000, createjs.Ease.linear)
					.to({x:left_x_min, y:left_y_max-7}, 10000, createjs.Ease.linear)
					.to({x:left_x_min, y:left_y_min-7}, 10000, createjs.Ease.linear)
			}else if(direction==3){
				var tween = createjs.Tween.get(txt, {loop:true})
					.to({x:left_x_min, y:left_y_max2-7}, 10000, createjs.Ease.linear)
					.to({x:left_x_max2, y:left_y_max2-7}, 10000, createjs.Ease.linear)
					.to({x:left_x_max2, y:left_y_min-7}, 10000, createjs.Ease.linear)
					.to({x:left_x_min, y:left_y_min-7}, 10000, createjs.Ease.linear)
			}else{
				var tween = createjs.Tween.get(txt, {loop:true})
					.to({x:left_x_max2, y:left_y_min-7}, 10000, createjs.Ease.linear)
					.to({x:left_x_max2, y:left_y_max2-7}, 10000, createjs.Ease.linear)
					.to({x:left_x_min, y:left_y_max2-7}, 10000, createjs.Ease.linear)
					.to({x:left_x_min, y:left_y_min-7}, 10000, createjs.Ease.linear)
			}
		}

		function handleComplete(tween) {
			var ball = tween._target;

			var left_x_min = ball.x;
			var left_y_min = ball.y;
			var left_x_max = ball.x + circle_max_x;
			var left_y_max = ball.y + circle_max_y;
			var left_x_max2 = ball.x - circle_max_x;
			var left_y_max2 = ball.y - circle_max_y;

			if(direction==1){
				var tween = createjs.Tween.get(ball, {loop:true})
					.to({x:left_x_min, y:left_y_max}, 10000, createjs.Ease.linear)
					.to({x:left_x_max, y:left_y_max}, 10000, createjs.Ease.linear)
					.to({x:left_x_max, y:left_y_min}, 10000, createjs.Ease.linear)
					.to({x:left_x_min, y:left_y_min}, 10000, createjs.Ease.linear)
			}else if(direction==2){
				var tween = createjs.Tween.get(ball, {loop:true})
					.to({x:left_x_max, y:left_y_min}, 10000, createjs.Ease.linear)
					.to({x:left_x_max, y:left_y_max}, 10000, createjs.Ease.linear)
					.to({x:left_x_min, y:left_y_max}, 10000, createjs.Ease.linear)
					.to({x:left_x_min, y:left_y_min}, 10000, createjs.Ease.linear)
			}else if(direction==3){
				var tween = createjs.Tween.get(ball, {loop:true})
					.to({x:left_x_min, y:left_y_max2}, 10000, createjs.Ease.linear)
					.to({x:left_x_max2, y:left_y_max2}, 10000, createjs.Ease.linear)
					.to({x:left_x_max2, y:left_y_min}, 10000, createjs.Ease.linear)
					.to({x:left_x_min, y:left_y_min}, 10000, createjs.Ease.linear)
			}else{
				var tween = createjs.Tween.get(ball, {loop:true})
					.to({x:left_x_max2, y:left_y_min}, 10000, createjs.Ease.linear)
					.to({x:left_x_max2, y:left_y_max2}, 10000, createjs.Ease.linear)
					.to({x:left_x_min, y:left_y_max2}, 10000, createjs.Ease.linear)
					.to({x:left_x_min, y:left_y_min}, 10000, createjs.Ease.linear)
			}
		}

		stage.addChild(ball, txt);	

		createjs.Ticker.addEventListener("tick", stage);
	});
}

var popupView = null;
function handleClick(event){
	$('#listTrendingFromCountry').animate({'left': "-50%"});
	var seconds = 500;
	if($('#listTrendingFromCountry').css('left').indexOf('-') > -1)
		seconds = 0;

	setTimeout(function(){	
		var cModel = event.target.countryModel;
		popupView = new CountryCollectionPopupView({
			el:'#listTrendingFromCountry',
			model:cModel
		});
		popupView.render();
		$('#listTrendingFromCountry').animate({'left': 0});
	},seconds);
}

function buildTweets(term){
	var date = new Date();
	var day = date.getDate();
	if(day == 1)
		day = 28;
	var date_str = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + day;

	var relatedTweets = new RelatedTweets({term: term, date: date_str});
	relatedTweets.fetch().done(function(){
		var relatedTweetsView = new RelatedTweetsView({el: '#trendBackbone', model: relatedTweets});
		relatedTweetsView.render();
	});
}

/**
	When clicking on trending term, find the most popular
	15 tweets in the last day.
**/
$(document).on('click', '.country-trending-list li', function(){
	var query = $(this).text();
	Backbone.history.navigate('tweets/'+query, {trigger:true});
});

$(document).on('click', '.go-back-btn', function(){
	Backbone.history.navigate('', {trigger:true});
});

$(document).on('click', '.trendtitle .title', function(){
	Backbone.history.navigate('', {trigger:true});
});