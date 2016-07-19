var colors =[
	"#b5a286", "#beb3b7", "#7c8c87", "#cd6966", "#6fb2c7","#c2c2c2", "#559a87", 
    "#8d734a", "#72666a", "#5e6c68", "#aa3e3d", "#3d7080", "#999999", "#366b5d",
	"#cabca6","#e1d5d9", "#bbd0c7", "#e5a89b", "#add9e7", "#d1d1d1","#0d3a70",
	"#b22830", "#dac11f"
];

$(document).ready(function(){
	buildGraph();
/**
THIS IS FOR EXPORTING CSV AND XLSX FILES. PENDING.

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
**/
});

function buildGraph(){
	$('.plotly-block').each(function(){
		var id = $(this).find('.dynamic-graph').attr('id');

		var $data = $(this).find('input[name="graph_data"]');
		var $layout = $(this).find('input[name="graph_layout"]');

		var data = [];
		var layout = {
			margin: {
				b:120
			}
		};

		if($data.val() && $data.val() != ''){
			data = JSON.parse($data.val());
		}
		if($layout.val() && $layout.val() != ''){
			layout = JSON.parse($layout.val());
		}

		Plotly.newPlot(id, data, layout);
	});
}

$(document).on('click', '.example-btn', function(){
	buildExample($(this).parents('.plotly-block:first'));
});

function buildExample($chartblock){
	var data = "date\tbananas\toranges\n2011\t1\t2\n2012\t4\t1\n2013\t2\t8\n2014\t6\t5\n2015\t3\t3\n2016\t8\t6.5\n"

	$chartblock.find('textarea[name="database"]').text(data).trigger('change');
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
	var text = $(this).val();
	var lines = text.split(/\n/);
	var graph_data = [];
	var x_axis;
	for (l = 0; l < lines.length; l++){
		var cols = lines[l].split(/\t/);

		//first line, first col is names
		//first name is the y-axis
		if(l==0){
			x_axis = cols[0];
			for(c=0; c<cols.length; c++){
				graph_data.push({'name': cols[c], 'x': [], 'y': []});
			}
		}else{
			var x_val = cols[0];
			for(c=0; c<cols.length; c++){
				if(c!=0){
					graph_data[c]['x'].push(x_val);
					graph_data[c]['y'].push(cols[c]);
				}
			}
		}
	}

	var chart = getChart($(this));
	var $chartblock = $(this).parents('.plotly-block:first');

	updateGraphData(chart, $chartblock, graph_data);
	setData($(this), chart);
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

$(document).on('change', 'input[name="title_g"]', function(){
	var chart = getChart($(this));

	chart.layout.title = $(this).val();

	Plotly.redraw(chart);
	setData($(this), chart);
});

$(document).on('change', 'input[name="source"]', function(){
	var chart = getChart($(this));
	var $chartblock = $(this).parents('.plotly-block:first');
	var xtitle = $chartblock.find('input[name="x-title"]').val();

	chart.layout.xaxis = {
		title: xtitle + '<br><br> <i>Source:'+$(this).val() + '</i><br> NationalJournal | Axis: Data & Charts Hub'
	};

	Plotly.redraw(chart);
	setData($(this), chart);
});

$(document).on('change', 'input[name="x-title"], input[name="y-title"]', function(){
	var chart = getChart($(this));
	var $chartblock = $(this).parents('.plotly-block:first');
	var src = $chartblock.find('input[name="source"]').val() ? '<i>Source: '+$chartblock.find('input[name="source"]').val()+'</i><br>' : '';

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
	setData($(this), chart);
});

$(document).on('change', 'input[name="series_color"]', function(){
	var color = $(this).val();
	var chart = getChart($(this));
	var num = $(this).parent('li:first').attr('data-num');
	var $chartblock = $(this).parents('.plotly-block:first');

	chart.data[num]['marker']['color'] = color;

	Plotly.redraw(chart);
	setData($(this), chart);
});

$(document).on('change', 'select[name="series_type"]', function(){
	var val = $(this).val();
	var num = $(this).parent('li:first').attr('data-num');
	var chart = getChart($(this));
	var reversed = false;

	if(chart.data[num]['type'] == 'bar' && chart.data[num]['orientation'] == 'h')
		reversed = true;

	var x_s = chart.data[num]['x'];
	var y_s = chart.data[num]['y'];

	if(val == 'horizontal'){
		chart.data[num]['type'] = 'bar';
		chart.data[num]['orientation'] = 'h';
		chart.data[num]['x'] = y_s;
		chart.data[num]['y'] = x_s;
	}
	else{
		if(reversed){
			chart.data[num]['x'] = y_s;
			chart.data[num]['y'] = x_s;
		}
		if(val == 'column'){
			chart.data[num]['type'] = 'bar';
			chart.data[num]['orientation'] = 'v';
		}
		else if(val == 'line'){
			chart.data[num]['type'] = 'line';
			chart.data[num]['mode'] = 'lines';
		}
		else if(val == 'scatter'){
			chart.data[num]['type'] = 'line';
			chart.data[num]['mode'] = 'markers';
		}
	}
	Plotly.redraw(chart);
	setData($(this), chart);
});

$(document).on('change', 'input[name="x-num_ticks"], input[name="y-num_ticks"]', function(){
	var chart = getChart($(this));
	if($(this).attr('name').indexOf('x-')>-1){
		chart.layout.xaxis.nticks = isNaN(parseInt($(this).val())) ? 0 : parseInt($(this).val());
	}else{
		chart.layout.yaxis.nticks = isNaN(parseInt($(this).val())) ? 0 : parseInt($(this).val());
	}

	Plotly.redraw(chart);
	setData($(this), chart);
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
	setData($(this), chart);
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
	setData($(this), chart);
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
	var update = chart.layout;
	if($(this).attr('name').indexOf('x-')>-1){
		update.xaxis.range = [min, max];
	}else{
		update.yaxis.range = [min, max];
	}

	Plotly.relayout(chart, update);
	setData($(this), chart);
});

function updateGraphData(chart, $chartblock, data){
	var traces = [];
	var series = [];

	if(data.length > 1){
		for(d=1; d<data.length; d++){
			var trace = {
				x: data[d]['x'],
				y: data[d]['y'],
				type: 'line',
				mode: 'lines',
				name: data[d]['name'],
				marker: {
					color: colors[d],
					//size: 12,
				}
			}
			traces.push(trace);
			series.push({'name': data[d]['name'], 'num': d-1, 'color': colors[d]});
		}

		addSeriesOption(series, $chartblock);
	}

	chart.data=traces;
	Plotly.redraw(chart);
}

function addSeriesOption(series, $chartblock){
	$chartblock.find('.list_series').html('');

	for(s=0; s<series.length; s++){
		var html = '<li data-num="'+series[s]['num']+'">';
		html+='<span>'+series[s]['name']+'</span>';
		html+='<input name="series_color" type="text" id="series_'+series[s]['num']+'">';
		html+='<select name="series_type">';
		html+='<option value="line">Line</option>';
		html+='<option value="scatter">Scatter</option>';
		html+='<option value="horizontal">Bar</option>';
		html+='<option value="column">Column</option>';
		html+='</select>';
		html+='</li>';
		$chartblock.find('.list_series').append(html);

		$("#series_"+series[s]['num']).spectrum({
		    showPaletteOnly: true,
		    togglePaletteOnly: true,
		    togglePaletteMoreText: 'more',
		    togglePaletteLessText: 'less',
		    color: series[s]['color'],
		    palette: [
		        ["#b5a286", "#beb3b7", "#7c8c87", "#cd6966", "#6fb2c7","#c2c2c2", "#559a87"], 
		        ["#8d734a", "#72666a", "#5e6c68", "#aa3e3d", "#3d7080", "#999999", "#366b5d"],
				["#cabca6","#e1d5d9", "#bbd0c7", "#e5a89b", "#add9e7", "#d1d1d1","#0d3a70"],
				["#b22830", "#dac11f"]
		    ]
		});
	}
}

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

function setData($this, chart){
	var $chartblock = $this.parents('.plotly-block:first');
	$chartblock.find('input[name="graph_layout"]').attr('value', JSON.stringify(chart.layout));
	$chartblock.find('input[name="graph_data"]').attr('value', JSON.stringify(chart.data));
}