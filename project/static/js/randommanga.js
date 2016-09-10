/**	
	Global variables.
**/
var MANGA_EDEN_CDN = 'https://cdn.mangaeden.com/mangasimg/';


/*****************************************
	Models.

	ChapterModel - model for viewing a manga's first chapter.
	
	MangaModel - model of the Japanese comic. Contains title, tags, volume image.
	
	ListModel - model for containing a list of manga. Grabs a list of 25
	from a random page of 17000 results on MangaEden. Pulls 10 out
	and displays them to the user.
**/
var ChapterModel = Backbone.Model.extend({
	urlRoot: 'https://www.mangaeden.com/api/chapter/',
	url: function(){
		var page = this.urlRoot + this.get('chapter_id') + '/';
		return page;
	}
});

var MangaInfoModel = Backbone.Model.extend({
	urlRoot: 'https://www.mangaeden.com/api/manga/',
	url:function(){
		var page = this.urlRoot + this.get('manga_id') + '/';
		return page;
	}
});

var Manga = Backbone.Model.extend({
	defaults: {
		c: null,
		h: null,
		i: null,
		im: null,
		t: null
	}
});

var ListModel = Backbone.Model.extend({
	urlRoot: 'https://www.mangaeden.com/api/list/0/',
	url: function(){
		var page = this.urlRoot + '?p=' + this.get('page_num') + '&l=25';
		return page;
	}
});

/*****************************************
	Views.
	
	ChapterView
	MangaView
	ListView
**/

var ChapterView = Backbone.View.extend({
	initialize: function(){
		_.bindAll(this, 'render');
	},
	render:function(){
		this.template = _.template($('#first-chapter-tpl').html());
		this.$el.html(this.template({
			chapter: this.model
		}));
	}
});

var MangaInfoView = Backbone.View.extend({
	initialize: function(){
		_.bindAll(this, 'render');
	},
	render: function(){
		this.template = _.template($('#manga-info-tpl').html());
		this.$el.html(this.template({
			info: this.model
		}));

		$(this.el).fadeIn();
	}
});

var MangaView = Backbone.View.extend({
	initialize: function(){
		_.bindAll(this, 'render');
	},
	render:function(){
		this.template = _.template($('#manga-tpl').html());
        this.$el.html(this.template({
        	manga: this.model
        }));
        return this;
	}
});

var total = 17000;
var min_results = 25;
var ListView = Backbone.View.extend({
	initialize:function(){
		var that = this;
		this._mangaViews = [];

		this.randommanga();
	},
	randommanga:function(){	
		var that = this;
		var randompage = Math.floor(Math.random() * (total/min_results - 1) + 1);
		var listModel = new ListModel({page_num: randompage});
		
		listModel.fetch().done(function(){
			that.model = listModel;
			that.render();
		});
	},
	render:function(){
		var that = this;

		var list_of_10 = {};
		var i = 0;
		while(i < 10){
			var rand = Math.floor(Math.random() * 25);
			var manga = this.model.get('manga')[rand];
			if(!list_of_10[manga['i']]){
				list_of_10[manga['i']] = manga;
				i++;
			}
		}

		var arr = [];
		for(i in list_of_10){
			arr.push(list_of_10[i]);
		}

		that._mangaViews = [];
		_.each(arr, function(manga){
			console.log(manga);
			that._mangaViews.push(new MangaView({
				model: manga,
				tagName: 'div', 
				className: 'manga'
			}));
		});

		$(this.el).empty();
		_(this._mangaViews).each(function(mangaView){
			$(that.el).append(mangaView.render().el);
		});
		$(that.el).append('<div class="load-more">Load More</div>');
		$(this.el).fadeIn();
	}
});

/*****************
	Controller
*/
var MyController = Backbone.Router.extend({
	routes: {
		"" : "home",
		"manga/:mangaid": "chapter"
	},

	home: function(){
		buildHome();
	},

	chapter: function(mangaid){
		buildChapter(mangaid);
	}
});

$(document).ready(function(){
	var yC = new MyController;
	Backbone.history.start();
});

function buildChapter(mangaid){
	var mangaInfoModel = new MangaInfoModel({manga_id: mangaid});
	//var chapterModel = new ChapterModel({chapter_id: d['chapters'][0][3]});

	mangaInfoModel.fetch().done(function(){
		if(mangaInfoModel.get('chapters_len') > 0){
			var mangaInfoView = new MangaInfoView({el: '#randomList', model: mangaInfoModel });
			mangaInfoView.render();

			var chapterModel = new ChapterModel({chapter_id: mangaInfoModel.get('chapters')[0][3]});
			chapterModel.fetch().done(function(){
				var chapterView = new ChapterView({el: '#showChapter', model:chapterModel });
				chapterView.render();

				// on screen img loading
				$('.chapter li:visible').onScreen({
					doIn: function(){
						if($(this).hasClass('rendered'))
							return;

						$(this).find('img').attr('src', $(this).attr('data-src'));
						$(this).addClass('rendered');
					}
				});

				$(window).scroll();
			});
		}
	});
}

var listView;
function buildHome(){
	listView = new ListView({el: '#randomList'});
}

function refreshHome(){
	$('#randomList').fadeOut();
	listView.randommanga();
}

$(document).on('click', '.manga', function(){
	// set router to manga/:mangaid 
	var id = $(this).find('.id_manga').attr('data-id');
	Backbone.history.navigate('manga/'+id, {trigger:true}); 
});

$(document).on('click', '.load-more', function(){
	refreshHome();
});

$(document).on('click', '.manga-info-view .right:not(.read-mode)', function(){
	$('body, .left, .right').addClass('read-mode');
});

$(document).on('click', '.manga-info-view .right.read-mode', function(){
	var $li = $('.manga-info-view .right.read-mode .chapter li:visible');
	if($li.next().length > 0){
		$li.hide();
		var $next = $li.next();
		$next.find('img').attr('src', $next.attr('data-src'));
		$next.fadeIn();
	}else{
		$('body, .left, .right').removeClass('read-mode');
		$('.manga-info-view .right .chapter li').hide();
		$('.manga-info-view .right .chapter li:first').show();
	}
});

$(document).on('click', 'body', function(e){
	if($('body').hasClass('read-mode')){
		if($(e.target).hasClass('right') || $(e.target).parents('.right:first').length > 0){

		}else{
			$('body, .left, .right').removeClass('read-mode');
		}
	}
});

$(document).on('click', '.go-back', function(){
	window.history.back();
});