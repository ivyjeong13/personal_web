/**
	FOR POKEMON POKEDEX PROJECT.
**/
function removeDuplicates(flavor_texts){
	var f_text = [];
	_.each(flavor_texts, function(text){
		if(text['language']['name'] == 'en'){
			var is_dup = false;
			var cleanup = text['flavor_text'].replace(/\W+/g, " ").toLowerCase(); // replace extra spaces
			for(f in f_text){
				if(f_text[f].replace(/\W+/g, " ").toLowerCase() == cleanup){
					is_dup = true;
					break;
				}
			}
			if(!is_dup){
				f_text.push(text['flavor_text']);
			}
		}
	});

	return f_text;
}