var API_URL = 'http://pokeapi.co/api/v2/';

/*****************
	Models
*/
var Pokemon = Backbone.Model.extend({
	urlRoot: API_URL + 'pokemon-species/',
	url: function(){
		var url = this.urlRoot 
		if(this.get('id'))
			url += this.get('id') + '/';

		if(this.get('offset'))
			url += "?offset=" + this.get('offset');

		return url;
	}
});

var Generation = Backbone.Model.extend({
	urlRoot: API_URL + 'generation/',
	url:function(){
		var url = this.urlRoot + this.get('id') + '/';
		return url;
	}
});

var Region = Backbone.Model.extend({
	urlRoot: API_URL + 'region/',
	url: function(){
		var url = this.urlRoot + this.get('id') + '/';
		return url;
	}
});

var Biome = Backbone.Model.extend({
	urlRoot: API_URL + 'pokemon-habitat/',
	url: function(){
		var url = this.urlRoot + this.get('id') + '/';
		return url;
	}
});

/*****************
	Views
*/
var HomeView = Backbone.View.extend({
	initialize: function(){
		_.bindAll(this, 'render');
	},
	render:function(){
		this.template = _.template($('#home-tpl').html());
		this.$el.html(this.template({}));
	}
});


var PokemonView = Backbone.View.extend({
	initialize: function(){
		_.bindAll(this, 'render');
	},
	render:function(){
		this.template = _.template($('#species-tpl').html());
		this.$el.html(this.template({}));
	}
});

var ResultsView = Backbone.View.extend({
	initialize: function(){
		_.bindAll(this, 'render');
	},
	render:function(){
		this.template = _.template($('#results-tpl').html());
		this.$el.html(this.template({ results: this.model }));
	}
});

var RegionView = Backbone.View.extend({
	initialize: function(){
		_.bindAll(this, 'render');
	},
	render:function(){
		this.template = _.template($('#region-tpl').html());
		this.$el.html(this.template({ results: this.model }));
	}
});

/*****************
	Controller
*/
var MyController = Backbone.Router.extend({
	routes: {
		"" : "home",
		"region/:id": "region",
		"biome/:id": "biome",
		"pokemon-species/:id": "pokemon",
		"pokemon-index/:offset": "identify_num"
	},

	home: function(){
		buildHome();
	},

	region: function(id){
		buildRegion(id);
	},

	biome: function(id){
		buildBiome(id);
	},

	pokemon: function(id){	
		buildPokemon(id);	
	},

	identify_num: function(offset){
		buildByNum(offset);
	}
});

function buildPokemon(id){
	var pokemon = new Pokemon({ id: id });
	console.log(pokemon);
}

function buildBiome(id){
	var biome = new Biome({ id: id });
	console.log(biome);
}

function buildRegion(id){
	var region = new Region({ id: id });
	region.fetch().done(function(){
		var regionView = new RegionView({ el: "#pokemonBody", model: region });
		var pokemon = new Generation({id: region.get('main_generation')['url'].split('/generation/')[1].replace('/', '')});
		
		regionView.render();
		pokemon.fetch().done(function(){
			var resultsView = new ResultsView({ el: '#regionPokedex', model: pokemon });
			resultsView.render();

			$('#pokemonBody').fadeIn();
		});
	});
}

function buildHome(){
	var homeView = new HomeView({el: '#pokemonBody'});
	homeView.render();
	
	$('#pokemonBody').fadeIn();
}

function buildByNum(offset){
	var pokemon = new Pokemon({offset: offset});
	pokemon.fetch().done(function(){
		var resultsView = new ResultsView({ el: "#pokemonBody", model:pokemon });
		resultsView.render();

		$('#pokemonBody').fadeIn();
	});
}

$(document).ready(function(){
	var yC = new MyController;
	Backbone.history.start();
});

$(document).on('click', '.subtopic span', function(){
	if($(this).parent().find('.more').length > 0){
		$(this).parent().find('.more').slideToggle();
	}else if($(this).attr("data-url")){
		$('#pokemonBody').fadeOut();
		Backbone.history.navigate($(this).attr("data-url"), {trigger:true}); 
	}
});

$(document).on('click', '.subtopic .more-item', function(){
	var url = $(this).attr('data-type') + '/' + $(this).attr('data-id');
	Backbone.history.navigate(url, {trigger:true}); 
});

$(document).on('click', '.pokemon-results li, .pokemon-results .see-more', function(){
	$('#pokemonBody').fadeOut();
	Backbone.history.navigate($(this).attr("data-url"), {trigger:true}); 
});