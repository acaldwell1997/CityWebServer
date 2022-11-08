function initializePopulationChart() {
    var c = new Highcharts.Chart({
    chart: {
            renderTo: 'chart',
            defaultSeriesType: 'spline',
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


function addOrUpdateSeries(theChart, seriesName, value, valueName)
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
        //console.log("Adding series: " + seriesName);
        var seriesOptions = {
            id: seriesName,
            name: seriesName,
            data: [{ name: valueName, y: value}]
        };
        series = theChart.addSeries(seriesOptions, false);
    }
    else
    {
        var shift = series.data.length > 20;
        series.addPoint(value, true, shift);
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
	} else if(chartSeries[j]='Density'){
		seriesType = 'pie';
		seriesName = districtName + " - Density";
		value1 = district.TotalPopulationCount();
		value2 = districtName;
	}
}
        

        addOrUpdateSeries(chart, seriesName, value1, value2);
	
        updatedSeries.push(seriesName);
     }
    chart.redraw();
}
