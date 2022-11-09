function initializePopulationChart() {
    var c = new Highcharts.Chart({
    chart: {
            renderTo: 'chart',
            events: { }
        },
        title: {
            text: 'Statistics'
        },
        xAxis: {
            type: 'datetime',
            tickPixelInterval: 150
        },
        yAxis: {
            minPadding: 0.2,
            maxPadding: 0.2,
            title: {
                text: 'Value',
                margin: 80
            }
        }
    });
    return c;
}


function addOrUpdateSeries(theChart, seriesName, seriesType, value, valueName)
{
    var series;
    var matchFound = false;
    if(theChart.series.length > 0)
    {
        for(var s = 0; s < theChart.series.length; s++)
        {
            if(theChart.series[s].name == seriesName)
            {
                series = theChart.series[s];
                matchFound = true;
                s = theChart.series.length; // Stop looping
            }
        }
    }

    if(!matchFound)
    {
	if(seriesType = 'pie'){
        var seriesOptions = {
	    type: seriesType,
            name: seriesName,
            data: [{ name: valueName, y: value}],
	    center: [80, 70],
    	    size: 100,
            showInLegend: false,
    	    dataLabels: {
      		enabled: false
    	    }
        };
        series = theChart.addSeries(seriesOptions, false);
	}else{
        //console.log("Adding series: " + seriesName);
        var seriesOptions = {
	    type: seriesType,
            name: seriesName,
            data: [{ name: valueName, y: value}]
        };
        series = theChart.addSeries(seriesOptions, false);
    }if (matchFound){
        var shift = series.data.length > 20;
        series.addPoint(value, true, shift);
    }
console.log(series);
}
}

function updateChart(vm, chart)
{
    var updatedSeries = [];
    var districts = vm.Districts();
    var chartSeries = ['Population','Density'];
    var seriesName;
    var value1;
    var value2;
    var seriesType;

    for(var i = 0; i < districts.length; i++)
    {
        var district = districts[i];
        var districtName = district.DistrictName();
	for(var j=0; j < chartSeries.length; j++){
	if(chartSeries[j]='Population'){
		seriesType = 'spline';
		seriesName = districtName + " - Population";
		value1 = district.TotalPopulationCount();
		value2 = vm.Time();
	} 
if(chartSeries[j]='Density'){
		seriesType = 'pie';
		seriesName = districtName + " - Density";
		value1 = district.TotalPopulationCount();
		value2 = districtName;
	}
}
        

        addOrUpdateSeries(chart, seriesName, seriesType, value1, value2);
	
        updatedSeries.push(seriesName);
     }
    chart.redraw();
}
