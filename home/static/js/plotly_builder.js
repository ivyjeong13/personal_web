$(document).ready(function(){
	buildGraph();

	$("#showPaletteOnly").spectrum({
	    showPaletteOnly: true,
	    togglePaletteOnly: true,
	    togglePaletteMoreText: 'more',
	    togglePaletteLessText: 'less',
	    color: '#b5a286',
	    palette: [
	        ["#b5a286", "#beb3b7", "#7c8c87", "#cd6966", "#6fb2c7","#c2c2c2", "#559a87"], 
	        ["#8d734a", "#72666a", "#5e6c68", "#aa3e3d", "#3d7080", "#999999", "#366b5d"],
			["#cabca6","#e1d5d9", "#bbd0c7", "#e5a89b", "#add9e7", "#d1d1d1","#0d3a70"],
			["#b22830", "#dac11f"]
	    ]
	});

	var csvParser = new SimpleExcel.Parser.CSV();
    var fileInput = document.getElementById('fileInput');
    // parse when file loaded, then print the result to console
    fileInput.addEventListener('change', function (e) {            
        var file = e.target.files[0];
        var filename = file['name'];
        var f_array = filename.split('.');

        if (f_array[f_array.length - 1] == 'csv'){
        	csvParser.loadFile(file, function () {
	        	console.log(csvParser.getSheet()); // print!
	        });
        }        
        if (f_array[f_array.length - 1] == 'xlsx'){
			var reader = new FileReader();
			var name = file.name;
			reader.onload = function(e) {
				var data = e.target.result;

				var workbook = XLSX.read(data, {type: 'binary'});

				var result = {};
				workbook.SheetNames.forEach(function(sheetName) {
					var roa = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
					if(roa.length > 0){
						result[sheetName] = roa;
					}
				});
				console.log(result);
			};
			reader.readAsBinaryString(file);
        }
    });
});

function buildGraph(){
	var trace1 = {
	  x: [-1.0, -0.857142857143, -0.714285714286, -0.571428571429, -0.428571428571, -0.285714285714, -0.142857142857, 0.0, 0.142857142857, 0.285714285714, 0.428571428571, 0.571428571429, 0.714285714286, 0.857142857143, 1.0],
	  y: [-1.0, -0.857142857143, -0.714285714286, -0.571428571429, -0.428571428571, -0.285714285714, -0.142857142857, 0.0, 0.142857142857, 0.285714285714, 0.428571428571, 0.571428571429, 0.714285714286, 0.857142857143, 1.0],
	  ncontours: 30,
	  showscale: false,
	  type: 'line'
	};

	var trace2 = {
	  x: [-0.8, -0.48, -0.288, -0.1728, -0.10368, -0.062208, -0.0373248, -0.02239488, -0.013436928, -0.0080621568, -0.00483729408, -0.002902376448, -0.0017414258688, -0.00104485552128, -0.000626913312768, -0.000376147987661],
	  y: [-0.9, -0.72, -0.576, -0.4608, -0.36864, -0.294912, -0.2359296, -0.18874368, -0.150994944, -0.1207959552, -0.09663676416, -0.077309411328, -0.0618475290624, -0.0494780232499, -0.0395824185999, -0.0316659348799],
	  mode: 'markers+lines',
	  name: 'steepest',
	  line: {color: 'black'},
	  type: 'scatter'
	};

	var data = [trace1, trace2];

	var layout = {
		margin: {
			b:120
		}
	};

	Plotly.newPlot('myDiv', data, layout);
}

/**
	Actions for the chart builder. 
**/
$(document).on('click', '.plotly-block .option .btn', function(){
	$(this).parents('.option:first').find('.pulldown').toggle();
});

$(document).on('click', '.plotly-block .hide-textarea-btn', function(){
	if($(this).hasClass('h_field'))
		$(this).text('Hide');
	else
		$(this).text('Show');
	$(this).toggleClass('h_field');
	$(this).parents('.field:first').find('textarea').slideToggle();
});

$(document).on('change', 'textarea[name="database"]', function(){
	console.log($(this).val());
});

$(document).delegate('textarea[name="database"]', 'keydown', function(e) {
  var keyCode = e.keyCode || e.which;

  if (keyCode == 9) {
    e.preventDefault();
    var start = $(this).get(0).selectionStart;
    var end = $(this).get(0).selectionEnd;

    // set textarea value to: text before caret + tab + text after caret
    $(this).val($(this).val().substring(0, start)
                + "\t"
                + $(this).val().substring(end));

    // put caret at right position again
    $(this).get(0).selectionStart =
    $(this).get(0).selectionEnd = start + 1;
  }
});

$(document).on('change', 'input[name="title"]', function(){
	var chart = getChart($(this));

	chart.layout.title = $(this).val();
	Plotly.redraw(chart);
});

$(document).on('change', 'input[name="source"]', function(){
	var chart = getChart($(this));
	var $chartblock = $(this).parents('.plotly-block:first');
	var xtitle = $chartblock.find('input[name="x-title"]').val();

	chart.layout.xaxis = {
		title: xtitle + '<br><br> <i>Source:'+$(this).val() + '</i><br> NationalJournal | Axis: Data & Charts Hub'
	};
	Plotly.redraw(chart);
});

$(document).on('change', 'input[name="x-title"], input[name="y-title"]', function(){
	var chart = getChart($(this));
	var $chartblock = $(this).parents('.plotly-block:first');
	var src = $chartblock.find('input[name="source"]').val() ? '<i>Source: '+$(this).find('input[name="source"]').val()+'</i><br>' : '';

	if($(this).attr('name').indexOf('x-')>-1){
		chart.layout.xaxis = {
			title: $(this).val() + '<br><br>'+src+'NationalJournal | Axis: Data & Charts Hub'
		};
	}else{
		chart.layout.yaxis = {
			title: $(this).val()
		};
	}

	Plotly.redraw(chart);
});

$(document).on('change', 'input[name="x-num_ticks"], input[name="y-num_ticks"]', function(){
	var chart = getChart($(this));
	if($(this).attr('name').indexOf('x-')>-1){
		chart.layout.xaxis = {
			nticks: isNaN(parseInt($(this).val())) ? 0 : parseInt($(this).val())
		}
	}else{
		chart.layout.yaxis = {
			nticks: isNaN(parseInt($(this).val())) ? 0 : parseInt($(this).val())
		}
	}

	Plotly.redraw(chart);
});

var ps_classes = ['input[name="x-prefix"]', 'input[name="x-suffix"]', 'input[name="y-prefix"]', 'input[name="y-suffix"]'];
$(document).on('change', ps_classes.join(','), function(){
	var chart = getChart($(this));
	var $chartblock = $(this).parents('.plotly-block:first');
	var show = $chartblock.find('input[name="x-prefix-first"]').prop('checked') ? 'first' : 'all';
	var val = $(this).val();
	
	var isX = $(this).attr('name').indexOf('x-') > -1 ? true : false;
	var isPrefix = $(this).attr('name').indexOf('prefix') > -1 ? true: false;
	
	chart = changeSuffixPrefix(chart, isX, isPrefix, val, show);

	Plotly.redraw(chart);
});

var ps_first_classes = ['input[name="x-prefix-first"]', 'input[name="x-suffix-first"], input[name="y-prefix-first"]', 'input[name="y-suffix-first"]']
$(document).on('change', ps_first_classes.join(','), function(){
	var chart = getChart($(this));
	var $chartblock = $(this).parents('.plotly-block:first');
	var show = $(this).prop('checked') ? 'first' : 'all';

	var isX = $(this).attr('name').indexOf('x-') > -1 ? true : false;
	var isPrefix = $(this).attr('name').indexOf('prefix') > -1 ? true: false;

	var name = '';
	if(isX)
		name += 'x-';
	else
		name += 'y-';
	if(isPrefix)
		name += 'prefix';
	else
		name += 'suffix';

	var val = $chartblock.find('input[name="'+name+'"]').val();

	chart = changeSuffixPrefix(chart, isX, isPrefix, val, show);

	Plotly.redraw(chart);
});

$(document).on('change', 'input[name="x-max"], input[name="x-min"], input[name="y-max"], input[name="y-min"]', function(){
	var chart = getChart($(this));
	var $chartblock = $(this).parents('.plotly-block:first');
	var min = null;
	var max = null;

	if($(this).attr('name').indexOf('min')>-1){
		min = isNaN(parseFloat($(this).val())) ? null : parseFloat($(this).val());
		var $max = $chartblock.find('input[name="'+$(this).attr('name').replace('min', 'max')+'"]');
		max = isNaN(parseFloat($max.val())) ? null : parseFloat($max.val());
	}
	else{
		max = isNaN(parseFloat($(this).val())) ? null : parseFloat($(this).val());
		var $min = $chartblock.find('input[name="'+$(this).attr('name').replace('max', 'min')+'"]');
		min = isNaN(parseFloat($min.val())) ? null : parseFloat($min.val());
	}
	var update = {}
	if($(this).attr('name').indexOf('x-')>-1){
		update = {xaxis: { range: [min, max]}};
	}else{
		update = {yaxis: { range: [min, max]}};
	}

	Plotly.relayout(chart, update);
});

/**
	Will change the suffix or prefix for the specified axis.
**/
function changeSuffixPrefix(chart, isX, isPrefix, val, show){
	if(isX){
		if(isPrefix){
			chart.layout.xaxis.tickprefix = val;
			chart.layout.xaxis.showtickprefix = show;
		}else{
			chart.layout.xaxis.ticksuffix = val;
			chart.layout.xaxis.showticksuffix= show;
		}
	}
	else{
		if(isPrefix){
			chart.layout.yaxis.tickprefix = val;
			chart.layout.yaxis.showtickprefix = show;
		}else{
			chart.layout.yaxis.ticksuffix = val;
			chart.layout.yaxis.showticksuffix= show;
		}
	}
	return chart;
}

function getChart($this){
	var $chartblock = $this.parents('.plotly-block:first');
	return document.getElementById($chartblock.find('.dynamic-graph').attr('id'));
}